import { useCallback, useContext } from 'react'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import type { ComponentColor } from '../../colors/colors'
import { checkRoot } from '../../dev'
import './confetti.css'

export type ConfettiOptions = {
    /** How many pieces to throw. @default 80 */
    count?: number
    /** Direction of the burst in degrees, 0 is straight up. @default 0 */
    angle?: number
    /** How wide the burst fans out, in degrees. @default 70 */
    spread?: number
    /** How hard the pieces are thrown. @default 1 */
    power?: number
    /** Theme color roles the pieces are picked from. @default ['primary', 'tonal', 'success', 'warning', 'error'] */
    colors?: ComponentColor[]
}

/** Where the burst starts: an element's center, or a point in the viewport. */
export type ConfettiOrigin = Element | { x: number; y: number }

const defaultColors: ComponentColor[] = [
    'primary',
    'tonal',
    'success',
    'warning',
    'error',
]
const shapes = ['rect', 'circle', 'strip'] as const

// Pieces fall against air drag, so they slow to a flutter instead of
// dropping like stones. Units are px and seconds.
const gravity = 900
const drag = 2.6

const random = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * Returns a function that fires a burst of confetti in the theme's colors.
 * Pass the element that triggered it (a button, say) to burst from there.
 * The pieces are decorative: hidden from screen readers, they don't catch
 * the pointer, and nothing fires when the user prefers reduced motion.
 *
 * ```tsx
 * const fire = useConfetti()
 * <Button onClick={(e) => fire(e.currentTarget)}>Celebrate</Button>
 * ```
 */
export function useConfetti() {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(
            avl !== null,
            'useConfetti',
            'It draws into the AnvilRoot element, so without one nothing fires.'
        )
    }

    return useCallback(
        (origin?: ConfettiOrigin, options: ConfettiOptions = {}) => {
            const root = avl?.rootRef.current
            if (!root) return
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
                return

            const {
                count = 80,
                angle = 0,
                spread = 70,
                power = 1,
                colors = defaultColors,
            } = options
            const { x, y } = originPoint(origin)

            const layer = document.createElement('div')
            layer.className = 'avl-confetti'
            layer.setAttribute('aria-hidden', 'true')
            root.append(layer)

            const animations = Array.from({ length: count }, (_, i) => {
                const piece = document.createElement('span')
                piece.className = 'avl-confetti-piece'
                piece.dataset.shape = shapes[i % shapes.length]
                const color = colors[Math.floor(Math.random() * colors.length)]
                piece.style.backgroundColor = `var(--avl-color-${color})`
                piece.style.left = `${x}px`
                piece.style.top = `${y}px`
                layer.append(piece)

                const direction =
                    ((angle + random(-spread, spread) / 2) * Math.PI) / 180
                const speed = random(700, 1800) * power
                return piece.animate(
                    flight(
                        Math.sin(direction) * speed,
                        -Math.cos(direction) * speed
                    ),
                    { duration: random(1800, 2800), fill: 'forwards' }
                )
            })

            Promise.all(animations.map((a) => a.finished))
                .catch(() => {})
                .finally(() => layer.remove())
        },
        [avl]
    )
}

function originPoint(origin?: ConfettiOrigin) {
    if (!origin)
        return { x: window.innerWidth / 2, y: window.innerHeight * 0.6 }
    if (!(origin instanceof Element)) return origin
    const rect = origin.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

// Keyframes for one piece. Position comes from projectile motion with
// linear drag; the sideways sway and the 3D tumble make it look like paper.
function flight(vx: number, vy: number): Keyframe[] {
    const seconds = 2.5
    const steps = 30
    const spin = random(-720, 720)
    const tumble = random(360, 1080)
    const sway = random(10, 30)
    const swayRate = random(4, 8)
    const frames: Keyframe[] = []

    for (let i = 0; i <= steps; i++) {
        const progress = i / steps
        const t = progress * seconds
        const slowdown = (1 - Math.exp(-drag * t)) / drag
        const px =
            vx * slowdown + Math.sin(t * swayRate) * sway * Math.min(t, 1)
        const py = (vy - gravity / drag) * slowdown + (gravity / drag) * t
        frames.push({
            offset: progress,
            transform: `translate(${px}px, ${py}px) rotate(${spin * progress}deg) rotateX(${tumble * progress}deg)`,
            opacity: progress < 0.75 ? 1 : 1 - (progress - 0.75) / 0.25,
        })
    }
    return frames
}
