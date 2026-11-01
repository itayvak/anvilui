import { cx } from '../../utils'
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
 */
export function Carousel({ className, children, ...props }: CarouselProps) {
    return (
        <div
            role="region"
            aria-roledescription="carousel"
            // Focusable, so arrow keys scroll it without a mouse
            tabIndex={0}
            {...props}
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
