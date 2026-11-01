import { Children, type ComponentProps } from 'react'
import { Avatar, type AvatarProps } from '../Avatar/Avatar'
import { AvatarGroupContext } from '../Avatar/AvatarGroupContext'
import { AnimatedNumber } from '../AnimatedNumber/AnimatedNumber'
import { cx } from '../../utils'
import './avatar-group.css'

export type AvatarGroupProps = ComponentProps<'div'> & {
    /**
     * Most avatars to show. Past it, the last spot becomes a "+N" counter,
     * so the group never takes more than `max` spots. @default no limit
     */
    max?: number
    /** Size of every avatar inside, unless one sets its own. @default 'normal' */
    size?: AvatarProps['size']
    /** Spread the avatars apart on hover and keyboard focus. @default true */
    fan?: boolean
}

/**
 * A row of overlapping `Avatar`s that fans out on hover. Give it an
 * `aria-label` ("Project members") so screen readers know what the
 * avatars are.
 */
export function AvatarGroup({
    max,
    size = 'normal',
    fan = true,
    className,
    children,
    ...props
}: AvatarGroupProps) {
    const avatars = Children.toArray(children)
    const overflow = max !== undefined && avatars.length > max
    // The counter takes the last spot
    const shown = overflow ? avatars.slice(0, Math.max(0, max - 1)) : avatars
    const hidden = avatars.length - shown.length

    return (
        <AvatarGroupContext value={size}>
            <div
                role="group"
                {...props}
                className={cx(
                    'avl-avatar-group',
                    fan && 'avl-avatar-group-fan',
                    className
                )}
            >
                {shown}
                {overflow && (
                    <Avatar name={`${hidden} more`} color="container">
                        +<AnimatedNumber value={hidden} />
                    </Avatar>
                )}
            </div>
        </AvatarGroupContext>
    )
}
