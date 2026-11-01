import { useEffect, type RefObject } from 'react'

// How near the cursor has to come (px from the FAB's edge) to grab it, and
// how much of the way toward the cursor the FAB moves (1 = centered on it)
const STICK_RANGE = 24
const STICK_STRENGTH = 0.35

// Once the cursor is close, the FAB sticks to it: it follows the cursor part
// of the way until the cursor moves out of range, then it springs back. Sets
// --avl-fab-pull-x/y (and data-stuck); the CSS turns them into `translate`.
export function useMagnet(
    ref: RefObject<HTMLElement | null>,
    enabled: boolean
) {
    useEffect(() => {
        const el = ref.current
        if (!el || !enabled) return
        // A mouse or trackpad only: touch has no cursor hovering near it
        if (!matchMedia('(pointer: fine)').matches) return
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let pull = { x: 0, y: 0 }
        let frame = 0

        const set = (x: number, y: number, stuck: boolean) => {
            pull = { x, y }
            el.style.setProperty('--avl-fab-pull-x', `${x}px`)
            el.style.setProperty('--avl-fab-pull-y', `${y}px`)
            el.toggleAttribute('data-stuck', stuck)
        }

        const onMove = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                // Where it sits without the pull, so moving doesn't feed back
                const rect = el.getBoundingClientRect()
                const left = rect.left - pull.x
                const top = rect.top - pull.y
                const dx = event.clientX - (left + rect.width / 2)
                const dy = event.clientY - (top + rect.height / 2)
                // Measured from its resting edge, so a wide extended FAB can
                // be grabbed anywhere along its length
                const gapX = Math.max(0, Math.abs(dx) - rect.width / 2)
                const gapY = Math.max(0, Math.abs(dy) - rect.height / 2)
                if (Math.hypot(gapX, gapY) > STICK_RANGE) {
                    if (pull.x || pull.y) set(0, 0, false)
                    return
                }
                // Follow the cursor, but only as far as a round FAB would
                // go, so an extended one doesn't slide along under its label
                const reach = rect.height / 2 + STICK_RANGE
                const clamp = (d: number) =>
                    Math.max(-reach, Math.min(reach, d))
                set(
                    clamp(dx) * STICK_STRENGTH,
                    clamp(dy) * STICK_STRENGTH,
                    true
                )
            })
        }

        const release = () => {
            cancelAnimationFrame(frame)
            set(0, 0, false)
        }

        document.addEventListener('pointermove', onMove, { passive: true })
        document.documentElement.addEventListener('pointerleave', release)
        return () => {
            cancelAnimationFrame(frame)
            document.removeEventListener('pointermove', onMove)
            document.documentElement.removeEventListener(
                'pointerleave',
                release
            )
            el.style.removeProperty('--avl-fab-pull-x')
            el.style.removeProperty('--avl-fab-pull-y')
            el.removeAttribute('data-stuck')
        }
    }, [ref, enabled])
}
