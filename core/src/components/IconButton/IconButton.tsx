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
import { useContext } from 'react'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import {
    checkAsChild,
    checkName,
    checkProp,
    checkRoot,
    OUTSIDE_ROOT,
} from '../../dev'
import './icon-button.css'

export type IconButtonProps = Omit<BaseButtonProps, 'children'> & {
    /** Material Symbol name to show, e.g. `'delete'`. Takes no children. */
    icon: MaterialSymbol
    /** How the color is applied. @default 'filled' */
    fillType?: ComponentFillType
    /** Color role from the theme. @default 'primary' */
    color?: ComponentColor
    /** 32px, 40px or 48px, the same heights as `Button`. @default 'normal' */
    size?: 'small' | 'normal' | 'big'
    /** Required: there is no visible text, so screen readers read this. */
    'aria-label': string
}

/**
 * A round button that shows only an icon.
 *
 * @example
 * <IconButton icon="delete" aria-label="Delete" fillType="text" color="container" />
 * <IconButton icon="add" aria-label="Add" size="big" />
 */
export function IconButton({
    icon,
    color,
    fillType,
    size = 'normal',
    className,
    ...props
}: IconButtonProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'IconButton', OUTSIDE_ROOT)
        checkName(
            props,
            'IconButton',
            '<IconButton icon="delete" aria-label="Delete" />',
            'icon-button.md'
        )
        checkProp(
            props,
            'variant',
            'IconButton',
            'Use `fillType` (filled | outlined | text) and `color`.',
            '<IconButton icon="close" aria-label="Close" fillType="text" color="container" />',
            'icon-button.md'
        )
        checkAsChild(
            props,
            'IconButton',
            'icon-button.md',
            '<IconButton icon="home" aria-label="Home" render={<a href="/" />} nativeButton={false} />'
        )
    }
    return (
        <BaseButton
            {...props}
            className={withClass(
                `avl-icon-button ${colorClass(color, fillType)} avl-icon-button-size-${size}`,
                className
            )}
        >
            <Icon name={icon} />
        </BaseButton>
    )
}
