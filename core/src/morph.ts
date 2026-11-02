import {
    createContext,
    useLayoutEffect,
    useRef,
    useState,
    type RefObject,
} from 'react'
import { flushSync } from 'react-dom'

/** The trigger and popup a morphing Dialog or Popover animates between. */
export type MorphRefs = {
    trigger: RefObject<HTMLElement | null>
    popup: RefObject<HTMLElement | null>
}

/**
 * Set by a Dialog or Popover root with `morph`, `null` without, so a nested
 * root's trigger or popup never picks up an outer one's refs.
 */
export const MorphContext = createContext<MorphRefs | null>(null)

/**
 * Open state for a Base UI root that can morph between its trigger and its
 * popup. Held here, not in Base UI, so the change can happen inside the view
 * transition. `open` / `defaultOpen` / `onOpenChange` keep working,
 * including cancelling from `onOpenChange`.
 */
export function useMorphOpen<Details extends { isCanceled: boolean }>({
    morph,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
}: {
    morph: boolean
    open: boolean | undefined
    defaultOpen: boolean
    onOpenChange: ((open: boolean, details: Details) => void) | undefined
}) {
    const trigger = useRef<HTMLElement>(null)
    const popup = useRef<HTMLElement>(null)
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const open = controlledOpen ?? uncontrolledOpen

    // The trigger became the popup, so it's hidden until the popup shrinks
    // back into it. Set by hand, right as the browser takes its snapshot:
    // Base UI's data-popup-open lands a moment later, which showed up as a
    // flash at the end of the morph.
    const hideTrigger = (hidden: boolean) =>
        trigger.current?.toggleAttribute('data-morph-hidden', hidden)

    // Closed some other way (like `open` set to false from outside): show
    // the trigger again
    useLayoutEffect(() => {
        if (!open) hideTrigger(false)
    }, [open])

    const handleOpenChange = (next: boolean, details: Details) => {
        const update = () => {
            onOpenChange?.(next, details)
            if (details.isCanceled) return
            setUncontrolledOpen(next)
            if (morph) hideTrigger(next)
        }
        const from = next ? trigger.current : popup.current
        if (!morph || !from) {
            update()
            return
        }
        morphBetween(from, update, () =>
            next ? popup.current : trigger.current
        )
    }

    return {
        open,
        onOpenChange: handleOpenChange,
        refs: morph ? { trigger, popup } : null,
    }
}

export type MorphOptions = {
    /** Length of the morph in milliseconds. @default the theme's `easeLength.slow` */
    duration?: number
    /** CSS easing for the box's size, position, corners and color. @default the theme's `ease.smooth` */
    easing?: string
}

/**
 * Morphs one element into another while the view changes: the element with
 * `data-morph-id={id}` grows (or shrinks) into the element that has the same
 * id after `update` runs, like a list row opening into its detail page.
 * Call it again with the same id to morph back.
 *
 * `update` must change the view synchronously: set React state, or call a
 * router with its sync option (React Router: `navigate(to, { flushSync:
 * true })`). Falls back to a plain `update()` without View Transitions
 * support or with reduced motion.
 *
 * Resolves once the morph has finished (right away when it falls back), so
 * you can move focus or start something else afterwards.
 */
export function morph(id: string, update: () => void, options?: MorphOptions) {
    const from = findMorphTarget(id)
    if (!from) {
        update()
        return Promise.resolve()
    }
    return morphBetween(from, update, () => findMorphTarget(id, from), options)
}

// The first visible element with this id, other than `except`
function findMorphTarget(id: string, except?: Element) {
    const all = document.querySelectorAll<HTMLElement>(
        `[data-morph-id="${CSS.escape(id)}"]`
    )
    return (
        Array.from(all).find(
            (el) => el !== except && el.getClientRects().length > 0
        ) ?? null
    )
}

let count = 0

/**
 * Like `morph`, but takes the elements instead of a `data-morph-id`. `from`
 * grows into whatever `getTo` returns after `update` runs; it's a function
 * because the target usually doesn't exist until then.
 *
 * The browser snapshots `from`, runs `update`, snapshots `to`, and animates
 * one box into the other. Everything else on the page just crossfades.
 * Both elements get `data-morphing` meanwhile, so they can switch off their
 * own enter and exit animations.
 */
export function morphBetween(
    from: HTMLElement,
    update: () => void,
    getTo: () => HTMLElement | null,
    options: MorphOptions = {}
): Promise<void> {
    if (
        !document.startViewTransition ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        update()
        return Promise.resolve()
    }

    const name = `avl-morph-${++count}`
    const html = document.documentElement
    const fromStyle = getComputedStyle(from)
    // The transition is drawn on <html>, outside AnvilRoot, so read the
    // theme's motion tokens here
    const length =
        fromStyle.getPropertyValue('--avl-ease-length-slow').trim() || '300ms'
    const duration =
        options.duration ??
        (parseFloat(length) || 300) * (length.endsWith('ms') ? 1 : 1000)
    // No overshoot by default: the box travels a long way, and a spring
    // would also flash odd shades as the colors blend
    const easing =
        options.easing ??
        (fromStyle.getPropertyValue('--avl-ease-smooth').trim() || 'ease')
    // Captured now: by the time the animation starts, `from` has changed
    const fromSurface = surfaceOf(from, fromStyle)

    // Per-name rules, injected for this one transition. A shared
    // view-transition-class would do, but not every browser supports it.
    const style = document.createElement('style')
    style.textContent = morphStyles(name, duration, easing)
    document.head.append(style)

    from.setAttribute('data-morphing', '')
    from.style.setProperty('view-transition-name', name)
    let to: HTMLElement | null = null

    const transition = document.startViewTransition(async () => {
        // React has to render now, before the browser takes the "after" shot
        flushSync(update)
        // Popups anchored to a trigger (Popover) get their position a moment
        // after they mount; wait for it so the morph heads to the right spot
        await new Promise((resolve) => setTimeout(resolve))
        from.style.removeProperty('view-transition-name')
        to = getTo()
        if (!to) return
        to.style.setProperty('view-transition-name', name)
        to.setAttribute('data-morphing', '')
    })

    // The snapshots are flat pictures that fade out and in. The box under
    // them is what morphs: it grows, recolors and rounds from one element's
    // look into the other's, so there's always one continuous surface.
    transition.ready
        .then(() => {
            if (!to) return
            const toSurface = surfaceOf(to, getComputedStyle(to))
            const group = `::view-transition-group(${name})`
            // A see-through end has no shape of its own (a plain list row),
            // so the box keeps the other end's corners
            html.animate(
                {
                    borderRadius: [
                        fromSurface.color
                            ? fromSurface.radius
                            : toSurface.radius,
                        toSurface.color ? toSurface.radius : fromSurface.radius,
                    ],
                },
                { duration, easing, fill: 'both', pseudoElement: group }
            )
            // Starting see-through, the box takes the other end's color, so it
            // doesn't fade in from nothing. Ending see-through, it holds its
            // color, then fades out as the new content fades in.
            const color = toSurface.color
                ? [
                      { backgroundColor: fromSurface.color ?? toSurface.color },
                      { backgroundColor: toSurface.color },
                  ]
                : [
                      { backgroundColor: fromSurface.color ?? 'transparent' },
                      {
                          backgroundColor: fromSurface.color ?? 'transparent',
                          offset: 0.4,
                      },
                      { backgroundColor: 'transparent' },
                  ]
            html.animate(
                color.map((frame, i) => ({
                    ...frame,
                    ...(i === 0 && { boxShadow: fromSurface.shadow }),
                    ...(i === color.length - 1 && {
                        boxShadow: toSurface.shadow,
                    }),
                })),
                {
                    duration,
                    easing,
                    fill: 'both',
                    pseudoElement: group,
                }
            )
        })
        .catch(() => {})

    return transition.finished.finally(() => {
        for (const el of [from, to]) {
            el?.style.removeProperty('view-transition-name')
            el?.removeAttribute('data-morphing')
        }
        style.remove()
    })
}

function surfaceOf(el: HTMLElement, style: CSSStyleDeclaration) {
    const color = style.backgroundColor
    const clear = color === 'transparent' || color === 'rgba(0, 0, 0, 0)'
    // A "fully round" radius is a huge number (1000px). Cap it at what
    // actually shows, half the shorter side, or the corners would stay
    // round for most of the animation and then snap square at the end.
    const { width, height } = el.getBoundingClientRect()
    const radius = Math.min(
        parseFloat(style.borderRadius) || 0,
        Math.min(width, height) / 2
    )
    return {
        color: clear ? null : color,
        radius: `${radius}px`,
        shadow:
            style.boxShadow === 'none' ? '0 0 0 transparent' : style.boxShadow,
    }
}

// Crop the snapshots instead of stretching them to the changing box, so text
// never squashes. The old content clears out early and the new fades in
// late, so mid-way it's just the surface changing shape. The keyframes are
// in AnvilRoot's global.css.
function morphStyles(name: string, duration: number, easing: string) {
    return `
::view-transition-group(${name}) {
    overflow: clip;
    animation-duration: ${duration}ms;
    animation-timing-function: ${easing};
}
::view-transition-image-pair(${name}),
::view-transition-old(${name}),
::view-transition-new(${name}) {
    animation-duration: ${duration}ms;
}
::view-transition-old(${name}),
::view-transition-new(${name}) {
    width: 100%;
    height: 100%;
    object-fit: none;
    object-position: 50% 0;
    mix-blend-mode: normal;
    animation-timing-function: linear;
}
::view-transition-old(${name}) { animation-name: avl-morph-out; }
::view-transition-new(${name}) { animation-name: avl-morph-in; }
`
}
