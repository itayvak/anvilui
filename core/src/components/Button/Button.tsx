import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import type { MaterialSymbol } from 'material-symbols'
import {
    ComponentColor,
    ComponentFillType,
    colorClass,
} from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import './button.css'

export type ButtonProps = BaseButtonProps & {
    size?: 'small' | 'normal' | 'big'
    fillType?: ComponentFillType
    color?: ComponentColor
    startIcon?: MaterialSymbol
    endIcon?: MaterialSymbol
}

export function Button({
    size,
    fillType,
    color,
    startIcon,
    endIcon,
    children,
    ...props
}: ButtonProps) {
    const className =
        'avl-button ' +
        `${colorClass(color, fillType)} ` +
        `avl-button-size-${size || 'normal'} `

    return (
        <BaseButton {...props} className={className}>
            {startIcon && <Icon name={startIcon} />}
            {children}
            {endIcon && <Icon name={endIcon} />}
        </BaseButton>
    )
}
