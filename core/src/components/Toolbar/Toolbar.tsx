import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { IconButton, type IconButtonProps } from '../IconButton/IconButton'
import { cx, withClass } from '../../utils'
import '../Divider/divider.css'
import './toolbar.css'

/**
 * A floating pill of icon buttons. Arrow keys move between them; Tab enters
 * and leaves as one stop. Give it an `aria-label`, and place it yourself,
 * e.g. `position: fixed` at the bottom center.
 */
export type ToolbarProps = BaseToolbar.Root.Props & {
    /** Use the theme's inverse colors, so it stands out over busy content. @default false */
    inverseColor?: boolean
}

export function Toolbar({
    inverseColor = false,
    className,
    ...props
}: ToolbarProps) {
    return (
        <BaseToolbar.Root
            {...props}
            className={withClass(
                cx('avl-toolbar', inverseColor && 'avl-toolbar-inverse'),
                className
            )}
        />
    )
}

/**
 * An `IconButton` that joins the toolbar's arrow-key navigation. Text style
 * by default; `fillType="filled"` makes it the wider, highlighted one.
 */
export type ToolbarButtonProps = IconButtonProps

export function ToolbarButton({
    fillType = 'text',
    // Filled means highlighted: primary stands out on the toolbar's surface
    color = fillType === 'filled' ? 'primary' : 'container',
    disabled,
    ...props
}: ToolbarButtonProps) {
    return (
        <BaseToolbar.Button
            disabled={disabled}
            render={<IconButton {...props} color={color} fillType={fillType} />}
        />
    )
}

// A thin line between groups of buttons.
export type ToolbarSeparatorProps = BaseToolbar.Separator.Props

export function ToolbarSeparator({
    className,
    ...props
}: ToolbarSeparatorProps) {
    return (
        <BaseToolbar.Separator
            {...props}
            className={withClass(
                'avl-divider avl-toolbar-separator',
                className
            )}
        />
    )
}
