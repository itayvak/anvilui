import { useEffect, useRef, type RefObject } from 'react'
import { cx, mergeRefs } from '../../utils'
import './carousel.css'

export type CarouselProps = React.ComponentProps<'div'> & {
    /** What the carousel shows, for screen readers ("Featured albums"). */
    'aria-label': string
}

/**
 * A horizontally scrolling row of `CarouselItem`s.
 * Items running off an edge are masked with rounded corners instead of being
 * cut off flat, and their content slides to stay centered in what's visible
 * (in browsers with scroll-driven animations; Firefox cuts them off flat).
 * With a mouse, it can be dragged and thrown like on a touch screen.
 *
 * @example
 * <Carousel aria-label="Featured albums">
 *     {albums.map((a) => <CarouselItem key={a.id}><img src={a.cover} alt={a.title} /></CarouselItem>)}
 * </Carousel>
 */
export function Carousel({
    className,
    ref,
    children,
    ...props
}: CarouselProps) {
    const local = useRef<HTMLDivElement>(null)
    useDragScroll(local)

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            // Focusable, so arrow keys scroll it without a mouse
            tabIndex={0}
            {...props}
            ref={mergeRefs(local, ref)}
            className={cx('avl-carousel', className)}
        >
            {children}
        </div>
    )
}

export type CarouselItemProps = React.ComponentProps<'div'>

/** One item in a `Carousel`. Set its width with CSS; 240px by default. */
export function CarouselItem({
    className,
    children,
    ...props
}: CarouselItemProps) {
    return (
        <div
            role="group"
            aria-roledescription="slide"
            {...props}
            className={cx('avl-carousel-item', className)}
        >
            <div className="avl-carousel-item-content">{children}</div>
        </div>
    )
}

// How far the mouse moves before a press becomes a drag, so clicks on
// links and buttons inside items still work
const DRAG_THRESHOLD = 5
// Share of the glide speed kept every 16ms after a throw
const FRICTION = 0.95

// Mouse drag-to-scroll with momentum. Touch and trackpads already scroll
// natively, so this only handles the mouse.
function useDragScroll(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current
        if (!el) return

        let startX = 0
        let startScroll = 0
        let pointer: number | null = null
        let dragging = false
        // Recent positions, to measure the throw speed on release
        let samples: { x: number; t: number }[] = []
        let glide = 0

        const stopGlide = () => cancelAnimationFrame(glide)

        const onDown = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) return
            stopGlide()
            // A press on the scrollbar belongs to the scrollbar
            const top = el.getBoundingClientRect().top + el.clientTop
            if (event.clientY > top + el.clientHeight) return
            pointer = event.pointerId
            startX = event.clientX
            startScroll = el.scrollLeft
            dragging = false
            samples = [{ x: event.clientX, t: event.timeStamp }]
        }

        const onMove = (event: PointerEvent) => {
            if (event.pointerId !== pointer) return
            const dx = event.clientX - startX
            if (!dragging) {
                if (Math.abs(dx) < DRAG_THRESHOLD) return
                dragging = true
                el.setPointerCapture(event.pointerId)
                el.toggleAttribute('data-dragging', true)
                // Text selected in the first few pixels would stay selected
                window.getSelection()?.removeAllRanges()
            }
            el.scrollLeft = startScroll - dx
            samples.push({ x: event.clientX, t: event.timeStamp })
            // Only the last 100ms count toward the throw
            while (samples.length > 2 && event.timeStamp - samples[0].t > 100)
                samples.shift()
        }

        const onUp = (event: PointerEvent) => {
            if (event.pointerId !== pointer) return
            pointer = null
            if (!dragging) return
            el.removeAttribute('data-dragging')
            // The click after a drag would land on whatever is under the
            // mouse; swallow it
            el.addEventListener('click', swallowClick, {
                capture: true,
                once: true,
            })
            setTimeout(
                () => el.removeEventListener('click', swallowClick, true),
                0
            )
            const first = samples[0]
            const last = samples[samples.length - 1]
            const elapsed = last.t - first.t
            if (
                event.type === 'pointerup' &&
                elapsed > 0 &&
                !matchMedia('(prefers-reduced-motion: reduce)').matches
            )
                startGlide((last.x - first.x) / elapsed)
        }

        // Keeps scrolling after a throw, slowing down until it stops
        const startGlide = (speed: number) => {
            let previous = performance.now()
            const step = (now: number) => {
                const dt = now - previous
                previous = now
                speed *= FRICTION ** (dt / 16)
                const before = el.scrollLeft
                el.scrollLeft -= speed * dt
                // Stop when it's nearly still or has hit an end
                if (Math.abs(speed) > 0.02 && el.scrollLeft !== before)
                    glide = requestAnimationFrame(step)
            }
            glide = requestAnimationFrame(step)
        }

        // Images and links would start a native drag instead
        const onDragStart = (event: DragEvent) => event.preventDefault()

        el.addEventListener('pointerdown', onDown)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerup', onUp)
        el.addEventListener('pointercancel', onUp)
        el.addEventListener('dragstart', onDragStart)
        // Any other scrolling takes over from a glide
        el.addEventListener('wheel', stopGlide, { passive: true })
        el.addEventListener('keydown', stopGlide)

        return () => {
            stopGlide()
            el.removeEventListener('pointerdown', onDown)
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerup', onUp)
            el.removeEventListener('pointercancel', onUp)
            el.removeEventListener('dragstart', onDragStart)
            el.removeEventListener('wheel', stopGlide)
            el.removeEventListener('keydown', stopGlide)
        }
    }, [ref])
}

function swallowClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
}
