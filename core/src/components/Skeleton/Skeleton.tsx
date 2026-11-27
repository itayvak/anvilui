import { cx } from '../../utils'
import { checkProp } from '../../dev'
import './skeleton.css'

export type SkeletonProps = React.ComponentProps<'span'> & {
    /**
     * Shape of the placeholder: a line of text, a circle (avatars, icons) or
     * a rounded box (images, cards). Set the size with `style`.
     * @default 'text'
     */
    type?: 'text' | 'circular' | 'rectangular'
    /** Fades in and out while loading. @default 'pulse' */
    animation?: 'pulse' | 'none'
}

/**
 * A placeholder shown while content loads. It's hidden from screen readers:
 * put `aria-busy` on the region that's loading.
 *
 * @example
 * <Skeleton type="circular" style={{ width: 40, height: 40 }} />
 * <Skeleton style={{ width: '60%' }} />
 */
export function Skeleton({
    type = 'text',
    animation = 'pulse',
    className,
    ...props
}: SkeletonProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkProp(
            props,
            'variant',
            'Skeleton',
            'The shape is `type`, as on Progress and Typography.',
            '<Skeleton type="circular" style={{ width: 40, height: 40 }} />\n// type: text | circular | rectangular',
            'skeleton.md'
        )
    }
    return (
        <span
            aria-hidden
            {...props}
            className={cx(
                'avl-skeleton',
                `avl-skeleton-${type}`,
                animation === 'pulse' && 'avl-skeleton-pulse',
                className
            )}
        />
    )
}
