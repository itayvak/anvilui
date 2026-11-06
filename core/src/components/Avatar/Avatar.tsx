import { useContext } from 'react'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { MaterialSymbol } from 'material-symbols'
import { colorClass, type ColorProps } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { cx, withClass } from '../../utils'
import { AvatarGroupContext } from './AvatarGroupContext'
import './avatar.css'

export type AvatarProps = BaseAvatar.Root.Props &
    ColorProps & {
        /** Image URL. While it loads, or if it fails, the fallback shows. */
        src?: string
        /**
         * The person's (or thing's) name. Read by screen readers, and its
         * initials are the fallback: "Ada Lovelace" shows "AL". Leave it out
         * when the name is already shown next to the avatar.
         */
        name?: string
        /** Fallback icon when there's no `name`. @default 'person' */
        icon?: MaterialSymbol
        /** 32px, 40px or 56px. @default 'normal', or the AvatarGroup's size */
        size?: 'small' | 'normal' | 'big'
    }

// First letter of the first and last words: "Ada Lovelace" -> "AL", "Plato" -> "P".
// [...word] splits by character rather than UTF-16 unit, so emoji and
// non-Latin letters aren't cut in half.
function initials(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) return ''
    const first = [...words[0]][0]
    const last = words.length > 1 ? [...words[words.length - 1]][0] : ''
    return (first + last).toUpperCase()
}

/**
 * A picture, initials or an icon that stands for a person or thing.
 * `children` replaces the initials/icon fallback.
 *
 * @example
 * <Avatar name="Ada Lovelace" src="/ada.jpg" />
 * <Avatar name="Ada Lovelace" color="tonal" size="big" />
 */
export function Avatar({
    src,
    name,
    icon = 'person',
    size: sizeProp,
    color,
    fillType,
    className,
    children,
    ...props
}: AvatarProps) {
    const groupSize = useContext(AvatarGroupContext)
    const size = sizeProp ?? groupSize ?? 'normal'
    const letters = name ? initials(name) : ''

    return (
        <BaseAvatar.Root
            // With a name it's one image to screen readers, named by it;
            // without one it's decoration
            role={name ? 'img' : undefined}
            aria-label={name}
            aria-hidden={name ? undefined : true}
            {...props}
            className={withClass(
                cx(
                    'avl-avatar',
                    colorClass(color, fillType),
                    `avl-avatar-size-${size}`
                ),
                className
            )}
        >
            {src && (
                <BaseAvatar.Image
                    src={src}
                    alt=""
                    className="avl-avatar-image"
                />
            )}
            {/* Waiting a moment avoids flashing the fallback on fast loads */}
            <BaseAvatar.Fallback
                delay={src ? 600 : undefined}
                className="avl-avatar-fallback"
                aria-hidden
            >
                {children ?? (letters || <Icon name={icon} />)}
            </BaseAvatar.Fallback>
        </BaseAvatar.Root>
    )
}
