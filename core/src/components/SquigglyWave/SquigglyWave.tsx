import { useEffect, useRef } from 'react'
import './squiggly-wave.css'

// Internal: the wave drawn by squiggly Progress and Slider. Not exported.

/** What to draw this frame, in px from the start of the track. */
export type WaveSpan = {
    /** Where the wave starts and ends (round caps included). */
    from: number
    to: number
    /** Flat track pieces to draw alongside it, as [start, end] pairs. */
    rest?: [number, number][]
    /** Draw the stop dot at the far end. */
    dot?: boolean
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
}

// Wave shape, in px: matches the 12px-tall squiggly track and 4px stroke
const WAVE_LENGTH = 40
const WAVE_AMPLITUDE = 3
const WAVE_MIDDLE = 6
const STROKE_CAP = 2 // round caps reach this far past each end

function wavePath(from: number, to: number, phase: number) {
    // Keep the round caps inside the drawn range
    const start = from + STROKE_CAP
    const end = to - STROKE_CAP
    if (end < start) return ''

    const y = (x: number) =>
        WAVE_MIDDLE +
        // + phase: the ripple travels from the leading end back to the start
        WAVE_AMPLITUDE * Math.sin((2 * Math.PI * x) / WAVE_LENGTH + phase)
    let d = `M${start} ${y(start)}`
    for (let x = start + 2; x < end; x += 2) d += `L${x} ${y(x)}`
    return d + `L${end} ${y(end)}`
}

// A flat line through the middle, or nothing if too short for its caps.
// Zero length still draws: round caps turn it into a dot.
function linePath(from: number, to: number) {
    const start = from + STROKE_CAP
    const end = to - STROKE_CAP
    return end < start ? '' : `M${start} ${WAVE_MIDDLE}L${end} ${WAVE_MIDDLE}`
}

/**
 * One continuous wave drawn to an exact length, so it has no seams and gets
 * round ends. Redrawn every frame to ripple and to ease toward its new span;
 * with reduced motion it holds still and jumps.
 */
export function SquigglyWave(props: SquigglyWaveProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const waveRef = useRef<SVGPathElement>(null)
    const restRef = useRef<SVGPathElement>(null)
    const dotRef = useRef<SVGPathElement>(null)
    const span = useRef(props.span)
    span.current = props.span

    useEffect(() => {
        const svg = svgRef.current
        const wave = waveRef.current
        const rest = restRef.current
        const dot = dotRef.current
        if (!svg || !wave || !rest || !dot) return

        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
        const gap =
            parseFloat(
                getComputedStyle(svg).getPropertyValue('--avl-wave-gap')
            ) || 0
        let current: { from: number; to: number } | null = null
        let frame = 0

        const draw = (now: number) => {
            const width = svg.clientWidth
            const next = span.current(width, gap, svg, now)
            if (!current || next.snap || reduced) {
                current = { from: next.from, to: next.to }
            } else {
                current.from += (next.from - current.from) * 0.15
                current.to += (next.to - current.to) * 0.15
            }
            const phase = reduced ? 0 : (now / 1000) * 2 * Math.PI

            wave.setAttribute('d', wavePath(current.from, current.to, phase))
            rest.setAttribute(
                'd',
                (next.rest ?? []).map(([a, b]) => linePath(a, b)).join('')
            )
            dot.setAttribute(
                'd',
                next.dot ? linePath(width - 2 * STROKE_CAP, width) : ''
            )
            frame = requestAnimationFrame(draw)
        }

        frame = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(frame)
    }, [])

    return (
        <svg ref={svgRef} className="avl-squiggly-wave" aria-hidden>
            <path ref={restRef} className="avl-squiggly-wave-rest" />
            <path ref={waveRef} />
            <path ref={dotRef} />
        </svg>
    )
}
