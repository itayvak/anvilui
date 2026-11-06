import { cx } from '../../utils'
import './skeleton.css'

export type SkeletonProps = React.ComponentProps<'span'> & {
    /**
     * Shape of the placeholder: a line of text, a circle (avatars, icons) or
     * a rounded box (images, cards). Set the size with `style`.
     * @default 'text'
     */
    variant?: 'text' | 'circular' | 'rectangular'
    /** Fades in and out while loading. @default 'pulse' */
    animation?: 'pulse' | 'none'
}

/**
 * A placeholder shown while content loads. It's hidden from screen readers:
 * put `aria-busy` on the region that's loading.
 *
 * @example
 * <Skeleton variant="circular" style={{ width: 40, height: 40 }} />
 * <Skeleton style={{ width: '60%' }} />
 */
export function Skeleton({
    variant = 'text',
    animation = 'pulse',
    className,
    ...props
}: SkeletonProps) {
    return (
        <span
            aria-hidden
            {...props}
            className={cx(
                'avl-skeleton',
                `avl-skeleton-${variant}`,
                animation === 'pulse' && 'avl-skeleton-pulse',
                className
            )}
        />
    )
}
