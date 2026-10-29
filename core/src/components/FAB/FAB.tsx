import {
    Button as BaseButton,
    type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import type { MaterialSymbol } from 'material-symbols'
import { colorClass, type ColorProps } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { cx, withClass } from '../../utils'
import './fab.css'

export type FABProps = Omit<BaseButtonProps, 'children'> &
    ColorProps & {
        /** Material Symbol to show. */
        icon: MaterialSymbol
        /** 40px, 56px or 96px tall. @default 'normal' */
        size?: 'small' | 'normal' | 'big'
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
 */
export function FAB({
    icon,
    label,
    size = 'normal',
    color,
    fillType,
    className,
    ...props
}: FABProps) {
    return (
        <BaseButton
            {...props}
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
