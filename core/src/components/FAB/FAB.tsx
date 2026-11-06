import { useRef } from 'react'
import {
    Button as BaseButton,
    type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import type { MaterialSymbol } from 'material-symbols'
import { colorClass, type ColorProps } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { useMagnet } from './magnet'
import { cx, mergeRefs, withClass } from '../../utils'
import { checkName } from '../../dev'
import './fab.css'

export type FABProps = Omit<BaseButtonProps, 'children'> &
    ColorProps & {
        /** Material Symbol to show. */
        icon: MaterialSymbol
        /** 40px, 56px or 96px tall. @default 'normal' */
        size?: 'small' | 'normal' | 'big'
        /** Stick to a mouse cursor that comes close. @default true */
        sticky?: boolean
    } & (
        | {
              /** Visible text next to the icon: makes it an extended FAB. */
              label: string
              'aria-label'?: string
          }
        | {
              label?: never
              // No visible text, so it needs a name for screen readers
              'aria-label': string
          }
    )

/**
 * The floating action button: the screen's main action. Place it yourself,
 * usually `position: fixed` in the bottom-end corner.
 *
 * @example
 * <FAB icon="edit" aria-label="Compose" style={{ position: 'fixed', insetInlineEnd: 16, bottom: 16 }} />
 * <FAB icon="edit" label="Compose" />
 */
export function FAB({
    icon,
    label,
    size = 'normal',
    sticky = true,
    color,
    fillType,
    className,
    ref,
    ...props
}: FABProps) {
    const local = useRef<HTMLButtonElement>(null)
    if (process.env.NODE_ENV !== 'production' && !label) {
        checkName(
            props,
            'FAB',
            '<FAB icon="add" aria-label="Create" />   // or <FAB icon="add" label="Create" />',
            'fab.md'
        )
    }
    useMagnet(local, sticky && !props.disabled)

    return (
        <BaseButton
            {...props}
            ref={mergeRefs(local, ref)}
            className={withClass(
                cx(
                    'avl-fab',
                    colorClass(color, fillType),
                    `avl-fab-size-${size}`,
                    label && 'avl-fab-extended'
                ),
                className
            )}
        >
            <Icon name={icon} />
            {label}
        </BaseButton>
    )
}
