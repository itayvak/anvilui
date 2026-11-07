import type { ReactNode } from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { MaterialSymbol } from 'material-symbols'
import { colorClass, type ColorProps } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { cx } from '../../utils'
import { checkName } from '../../dev'
import '../Button/button.css'
import '../IconButton/icon-button.css'
import './toggle.css'

export type ToggleProps = Omit<BaseToggle.Props, 'children'> &
    ColorProps & {
        /**
         * Off, it's neutral in this fill type; on, it fills with `color`.
         * @default 'filled'
         */
        fillType?: ColorProps['fillType']
    } & (
        | {
              /** The visible label. */
              children: ReactNode
              /** Material Symbol before the label. */
              startIcon?: MaterialSymbol
              /** Material Symbol after the label. */
              endIcon?: MaterialSymbol
              /** Same heights as `Button`. @default 'normal' */
              size?: 'small' | 'normal' | 'big'
              icon?: never
          }
        | {
              /** Material Symbol to show: makes it an icon toggle. Filled while on. */
              icon: MaterialSymbol
              // No visible text, so it needs a name for screen readers
              'aria-label': string
              children?: never
              startIcon?: never
              endIcon?: never
              /** 32px, 40px or 48px, like `IconButton`. @default 'normal' */
              size?: 'small' | 'normal' | 'big'
          }
    )

/**
 * A button that stays on or off, like Bold or Favorite. Holds its state
 * (`pressed` / `defaultPressed` / `onPressedChange`) and sets aria-pressed.
 *
 * @example
 * <Toggle startIcon="format_bold" defaultPressed>Bold</Toggle>
 * <Toggle icon="favorite" aria-label="Favorite" pressed={fav} onPressedChange={setFav} />
 */
export function Toggle({
    icon,
    startIcon,
    endIcon,
    size = 'normal',
    color,
    fillType,
    children,
    className,
    ...props
}: ToggleProps) {
    if (process.env.NODE_ENV !== 'production' && icon) {
        checkName(
            props,
            'Toggle',
            '<Toggle icon="favorite" aria-label="Favorite" />',
            'toggle.md'
        )
    }
    return (
        <BaseToggle
            {...props}
            className={(state) =>
                cx(
                    'avl-toggle',
                    icon
                        ? `avl-icon-button avl-icon-button-size-${size}`
                        : `avl-button avl-button-size-${size}`,
                    state.pressed
                        ? colorClass(color, 'filled')
                        : colorClass('container', fillType),
                    typeof className === 'function'
                        ? className(state)
                        : className
                )
            }
        >
            {icon ? (
                <Icon name={icon} />
            ) : (
                <>
                    {startIcon && <Icon name={startIcon} />}
                    {children}
                    {endIcon && <Icon name={endIcon} />}
                </>
            )}
        </BaseToggle>
    )
}
