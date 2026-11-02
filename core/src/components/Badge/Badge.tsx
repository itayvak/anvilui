import type { ComponentProps } from 'react'
import { colorClass, type ComponentColor } from '../../colors/colors'
import { cx } from '../../utils'
import { AnimatedNumber } from '../AnimatedNumber/AnimatedNumber'
import './badge.css'

export type BadgeProps = ComponentProps<'span'> & {
    /** Number to show. Leave out for a small dot; `0` hides the badge. */
    count?: number
    /** Higher counts show as "999+". @default 999 */
    max?: number
    /** Color role from the theme. @default 'error' */
    color?: ComponentColor
}

/**
 * A dot or count on the corner of what it wraps (an `Icon`, `IconButton`,
 * `Avatar`, ...), or inline on its own when it wraps nothing.
 *
 * It's hidden from screen readers: put the count in the wrapped element's
 * name too, e.g. `aria-label="Inbox, 3 unread"`.
 */
export function Badge({
    count,
    max = 999,
    // Not the library's usual primary: Material badges are error-colored
    color = 'error',
    className,
    children,
    ...props
}: BadgeProps) {
    const badge =
        count === 0 ? null : (
            <span
                aria-hidden
                className={cx(
                    'avl-badge',
                    colorClass(color, 'filled'),
                    count === undefined && 'avl-badge-dot',
                    !children && className
                )}
                {...(!children && props)}
            >
                {/* Digits roll when the count changes */}
                {count !== undefined && (
                    <>
                        <AnimatedNumber value={Math.min(count, max)} />
                        {count > max && '+'}
                    </>
                )}
            </span>
        )

    if (!children) return badge

    return (
        <span {...props} className={cx('avl-badge-anchor', className)}>
            {children}
            {badge}
        </span>
    )
}
