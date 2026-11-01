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
import { withClass } from '../../utils'
import './icon-button.css'

export type IconButtonProps = Omit<BaseButtonProps, 'children'> & {
    icon: MaterialSymbol
    fillType?: ComponentFillType
    color?: ComponentColor
    // There is no visible text, so the button needs a name for screen readers.
    'aria-label': string
}

export function IconButton({
    icon,
    color,
    fillType,
    className,
    ...props
}: IconButtonProps) {
    return (
        <BaseButton
            {...props}
            className={withClass(
                `avl-icon-button ${colorClass(color, fillType)}`,
                className
            )}
        >
            <Icon name={icon} />
        </BaseButton>
    )
}
