import { useEffect, useRef, useState } from 'react'
import './squiggly-wave.css'

// Internal: the wave drawn by squiggly Progress and Slider. Not exported.

/** What to draw this frame, in px from the start of the track. */
export type WaveSpan = {
    /** Where the wave starts and ends (round caps included). */
    from: number
    to: number
    /** Flat track pieces to draw alongside it, as [start, end] pairs. */
    rest?: [number, number][]
    /** Draw the `rest` pieces as waves in step with the main one, not flat. */
    restWave?: boolean
    /** Jump straight to `from`/`to` instead of easing toward them. */
    snap?: boolean
}

export type SquigglyWaveProps = {
    /**
     * Called every frame with the track width, `--avl-wave-gap` in px, the
     * SVG and the frame time. Reads its inputs fresh each time, so it can
     * follow things that move between renders, like a dragged handle.
     */
    span: (
        width: number,
        gap: number,
        svg: SVGSVGElement,
        now: number
    ) => WaveSpan
    /**
     * Hold the wave still and only redraw when the size changes, for spans
     * that never move. @default false
     */
    still?: boolean
    /** Run top to bottom instead of left to right. @default false */
    vertical?: boolean
    /**
     * Ease into a straight line as thick as `--avl-wave-flat-stroke`, ready
     * to be swapped for the plain track. Needs `still` off. @default false
     */
    flat?: boolean
    /** Start out flat, to ease into a wave from the plain track. */
    startFlat?: boolean
    /** Called once the wave has gone fully flat. */
    onFlat?: () => void
}

// Wave shape, in px: matches the 12px-tall squiggly track and 4px stroke
const WAVE_LENGTH = 40
const WAVE_AMPLITUDE = 3
const WAVE_STROKE = 4
const WAVE_PERIOD = 1500 // ms for the ripple to travel one wavelength

/** Where and how to draw this frame. `cap` is how far round caps reach. */
type Shape = { middle: number; amplitude: number; cap: number }

const K = (2 * Math.PI) / WAVE_LENGTH

// Height of the wave at x, and its slope there
const waveY = (x: number, phase: number, shape: Shape) =>
    // + phase: the ripple travels from the leading end back to the start
    shape.middle + shape.amplitude * Math.sin(K * x + phase)
const waveSlope = (x: number, phase: number, shape: Shape) =>
    shape.amplitude * K * Math.cos(K * x + phase)

function wavePath(from: number, to: number, phase: number, shape: Shape) {
    // Keep the caps inside the drawn range
    const start = from + shape.cap
    const end = to - shape.cap
    if (end < start) return ''

    const y = (x: number) => waveY(x, phase, shape)
    let d = `M${start} ${y(start)}`
    for (let x = start + 2; x < end; x += 2) d += `L${x} ${y(x)}`
    return d + `L${end} ${y(end)}`
}

// A flat line through the middle, or nothing if too short for its caps.
// Zero length still draws: round caps turn it into a dot.
function linePath(from: number, to: number, shape: Shape) {
    const start = from + shape.cap
    const end = to - shape.cap
    return end < start ? '' : `M${start} ${shape.middle}L${end} ${shape.middle}`
}

/**
 * The theme's `--avl-ease-smooth` as a function, so the wave flattens in
 * step with the CSS transitions that resize the track around it. Falls back
 * to Material's standard curve for anything but cubic-bezier().
 */
function smoothEasing(style: CSSStyleDeclaration) {
    const match = style
        .getPropertyValue('--avl-ease-smooth')
        .match(/cubic-bezier\(([^)]+)\)/)
    const parts = match?.[1].split(',').map(Number)
    const [x1, y1, x2, y2] =
        parts?.length === 4 && parts.every((n) => !Number.isNaN(n))
            ? parts
            : [0.2, 0, 0, 1]
    const bezier = (a: number, b: number, t: number) =>
        3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3
    return (x: number) => {
        if (x <= 0 || x >= 1) return x
        // Find t where the curve's x matches, by bisection: x(t) only grows
        let lo = 0
        let hi = 1
        for (let i = 0; i < 20; i++) {
            const mid = (lo + hi) / 2
            if (bezier(x1, x2, mid) < x) lo = mid
            else hi = mid
        }
        return bezier(y1, y2, (lo + hi) / 2)
    }
}

// A plain number, or a time in ms, from a custom property
function cssNumber(style: CSSStyleDeclaration, name: string, fallback: number) {
    const raw = style.getPropertyValue(name).trim()
    const n = parseFloat(raw)
    if (Number.isNaN(n)) return fallback
    return raw.endsWith('ms') ? n : raw.endsWith('s') ? n * 1000 : n
}

// A length custom property in px. Measured, not parsed: custom properties
// keep calc() unresolved, so parsing "calc(4px * 1.5)" would fail.
function cssLength(el: Element, name: string, fallback: number) {
    const host = el.parentElement
    if (!host || !getComputedStyle(el).getPropertyValue(name).trim())
        return fallback
    const probe = document.createElement('div')
    probe.style.cssText = `position:absolute;visibility:hidden;width:var(${name})`
    host.append(probe)
    const px = probe.getBoundingClientRect().width
    probe.remove()
    return px
}

/**
 * One end of a piece, drawn as a shape rather than a round line cap, so its
 * corners can ease from fully round (`radius` = half the thickness) to the
 * plain track's nearly square ones. Sits at (x, y), pointing along the
 * piece's slope, outward (`dir` 1) or backward (`dir` -1).
 */
function capPath(
    x: number,
    y: number,
    slope: number,
    dir: 1 | -1,
    half: number,
    length: number,
    radius: number
) {
    const norm = Math.hypot(1, slope)
    const tx = dir / norm
    const ty = (dir * slope) / norm
    // A rotation of the page's axes, so the arcs always bend the same way
    const p = (u: number, v: number) =>
        `${x + u * tx - v * ty} ${y + u * ty + v * tx}`
    const r = Math.max(0, Math.min(radius, length, half))
    // Starts slightly inside the piece's body, so no seam shows between them
    return (
        `M${p(-0.5, -half)}L${p(length - r, -half)}` +
        `A${r} ${r} 0 0 1 ${p(length, r - half)}L${p(length, half - r)}` +
        `A${r} ${r} 0 0 1 ${p(length - r, half)}L${p(-0.5, half)}Z`
    )
}

/**
 * Keeps a squiggly part's wave mounted while it flattens out, so turning
 * `squiggly` off eases into the plain track instead of jumping, and turning
 * it on eases out of it. Spread `wave` onto SquigglyWave, and draw the plain
 * track when `show` is false.
 */
export function useWaveMorph(squiggly: boolean) {
    const [previous, setPrevious] = useState(squiggly)
    const [leaving, setLeaving] = useState(false)
    // A wave that's there from the first render just appears
    const [changed, setChanged] = useState(false)
    if (squiggly !== previous) {
        setPrevious(squiggly)
        setLeaving(!squiggly)
        setChanged(true)
    }
    return {
        show: squiggly || leaving,
        wave: {
            flat: !squiggly,
            startFlat: changed,
            onFlat: () => setLeaving(false),
        },
    }
}

/**
 * One continuous wave drawn to an exact length, so it has no seams and gets
 * round ends. Redrawn every frame to ripple, to ease toward its new span and
 * to flatten out or back (`flat`); with reduced motion it holds still and
 * jumps.
 */
export function SquigglyWave(props: SquigglyWaveProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const waveRef = useRef<SVGPathElement>(null)
    const restRef = useRef<SVGPathElement>(null)
    const waveCapsRef = useRef<SVGPathElement>(null)
    const restCapsRef = useRef<SVGPathElement>(null)
    const span = useRef(props.span)
    span.current = props.span
    const flat = useRef(props.flat ?? false)
    flat.current = props.flat ?? false
    const onFlat = useRef(props.onFlat)
    onFlat.current = props.onFlat
    // Read once, on mount
    const startFlat = useRef(props.startFlat ?? false)
    const still = props.still ?? false
    const vertical = props.vertical ?? false

    useEffect(() => {
        const svg = svgRef.current
        const wave = waveRef.current
        const rest = restRef.current
        const waveCaps = waveCapsRef.current
        const restCaps = restCapsRef.current
        if (!svg || !wave || !rest || !waveCaps || !restCaps) return

        const reduced =
            still || matchMedia('(prefers-reduced-motion: reduce)').matches
        const style = getComputedStyle(svg)
        const gap = cssLength(svg, '--avl-wave-gap', 0)
        // The plain track that flattening heads toward
        const flatStroke = cssLength(svg, '--avl-wave-flat-stroke', WAVE_STROKE)
        // The plain track's inside corners, where a piece stops short of a
        // handle. Unset means round, which plain line caps already draw.
        const flatRadius = cssLength(svg, '--avl-wave-flat-radius', -1)
        const flatRestRadius = cssLength(svg, '--avl-wave-flat-rest-radius', -1)
        const shapedCaps = flatRadius >= 0 || flatRestRadius >= 0
        const linecap = shapedCaps ? 'butt' : ''
        wave.style.strokeLinecap = linecap
        rest.style.strokeLinecap = linecap
        const duration = cssNumber(style, '--avl-ease-length-slow', 300)
        const ease = smoothEasing(style)

        let current: { from: number; to: number } | null = null
        let frame = 0
        // 0 is a full wave, 1 a straight line
        let flatness = startFlat.current ? 1 : 0
        let notified = false
        let last: number | null = null

        const draw = (now: number) => {
            const target = flat.current ? 1 : 0
            const step =
                reduced || last === null || duration <= 0
                    ? 1
                    : (now - last) / duration
            // The first frame only sets the clock, so the morph starts at 0
            if (last === null && !reduced) {
                last = now
            } else {
                last = now
                flatness =
                    target > flatness
                        ? Math.min(target, flatness + step)
                        : Math.max(target, flatness - step)
            }
            if (flatness < 1) notified = false
            // Eased from wherever this direction started, like the CSS
            // transitions that resize the track
            const eased = target === 1 ? ease(flatness) : 1 - ease(1 - flatness)
            const stroke = WAVE_STROKE + (flatStroke - WAVE_STROKE) * eased
            svg.style.setProperty('--avl-wave-stroke', `${stroke}px`)

            // The wave math is all horizontal; vertical swaps the axes below
            const width = vertical ? svg.clientHeight : svg.clientWidth
            const shape: Shape = {
                middle: (vertical ? svg.clientWidth : svg.clientHeight) / 2,
                amplitude: WAVE_AMPLITUDE * (1 - eased),
                cap: stroke / 2,
            }
            const next = span.current(width, gap, svg, now)
            if (!current || next.snap || reduced) {
                current = { from: next.from, to: next.to }
            } else {
                current.from += (next.from - current.from) * 0.15
                current.to += (next.to - current.to) * 0.15
            }
            const phase = reduced ? 0 : (now / WAVE_PERIOD) * 2 * Math.PI

            wave.setAttribute(
                'd',
                wavePath(current.from, current.to, phase, shape)
            )
            rest.setAttribute(
                'd',
                (next.rest ?? [])
                    .map(([a, b]) =>
                        next.restWave
                            ? wavePath(a, b, phase, shape)
                            : linePath(a, b, shape)
                    )
                    .join('')
            )
            if (shapedCaps) {
                const half = stroke / 2
                // Both ends of a piece. Ends at the track's own ends stay
                // round; inside ends ease toward `insideRadius`.
                const caps = (
                    a: number,
                    b: number,
                    wavy: boolean,
                    insideRadius: number
                ) => {
                    if (b - a <= 0) return ''
                    const length = Math.min(half, (b - a) / 2)
                    const radius = (inside: boolean) =>
                        inside && insideRadius >= 0
                            ? half + (insideRadius - half) * eased
                            : half
                    const at = (x: number) =>
                        wavy
                            ? [
                                  waveY(x, phase, shape),
                                  waveSlope(x, phase, shape),
                              ]
                            : [shape.middle, 0]
                    const [y0, s0] = at(a + length)
                    const [y1, s1] = at(b - length)
                    return (
                        capPath(
                            a + length,
                            y0,
                            s0,
                            -1,
                            half,
                            length,
                            radius(a > 0.5)
                        ) +
                        capPath(
                            b - length,
                            y1,
                            s1,
                            1,
                            half,
                            length,
                            radius(b < width - 0.5)
                        )
                    )
                }
                waveCaps.setAttribute(
                    'd',
                    caps(current.from, current.to, true, flatRadius)
                )
                restCaps.setAttribute(
                    'd',
                    (next.rest ?? [])
                        .map(([a, b]) =>
                            caps(a, b, next.restWave ?? false, flatRestRadius)
                        )
                        .join('')
                )
            }

            if (flatness === 1 && target === 1 && !notified) {
                notified = true
                onFlat.current?.()
            }
            if (!still) frame = requestAnimationFrame(draw)
        }

        if (still) {
            // Fires once on observe too, for the first draw
            const observer = new ResizeObserver(() => draw(0))
            observer.observe(svg)
            return () => observer.disconnect()
        }
        frame = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(frame)
    }, [still, vertical])

    return (
        <svg ref={svgRef} className="avl-squiggly-wave" aria-hidden>
            <g transform={vertical ? 'matrix(0 1 1 0 0 0)' : undefined}>
                <path ref={restRef} className="avl-squiggly-wave-rest" />
                <path
                    ref={restCapsRef}
                    className="avl-squiggly-wave-cap avl-squiggly-wave-rest"
                />
                <path ref={waveRef} />
                <path ref={waveCapsRef} className="avl-squiggly-wave-cap" />
            </g>
        </svg>
    )
}
