import type { CSSProperties, ComponentProps } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { colorClass, type ComponentColor } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { cx } from '../../utils'
import './sticker.css'

export type StickerProps = ComponentProps<'span'> & {
    /** Color role from the theme. @default 'primary' */
    color?: ComponentColor
    /** Material Symbol before the text. */
    startIcon?: MaterialSymbol
    /** How far it's tilted, in degrees. Negative leans left. @default -4 */
    tilt?: number
}

/**
 * A small tilted label that looks like a die-cut sticker ("NEW", "BETA",
 * "50% off"). Straightens up on hover. Purely visual: its text is read
 * like any other text.
 *
 * @example
 * <Sticker color="warning" startIcon="bolt">NEW</Sticker>
 */
export function Sticker({
    color = 'primary',
    startIcon,
    tilt = -4,
    className,
    style,
    children,
    ...props
}: StickerProps) {
    return (
        <span
            {...props}
            className={cx(
                'avl-sticker',
                colorClass(color, 'filled'),
                className
            )}
            style={
                {
                    '--avl-sticker-tilt': `${tilt}deg`,
                    ...style,
                } as CSSProperties
            }
        >
            {startIcon && <Icon name={startIcon} />}
            {children}
        </span>
    )
}
