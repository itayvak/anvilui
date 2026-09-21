import { createContext, useContext } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import './menu.css'

// Base UI's className is a string or a function of the state; keep both
// working and append the caller's after ours.
function withClass<State>(
    base: string,
    className: string | ((state: State) => string | undefined) | undefined
) {
    return (state: State) =>
        base +
        ' ' +
        ((typeof className === 'function' ? className(state) : className) ?? '')
}

export type MenuProps = BaseMenu.Root.Props

export function Menu(props: MenuProps) {
    return <BaseMenu.Root {...props} />
}

// Renders a bare button. Pass `render={<Button />}` to use the library button.
export type MenuTriggerProps = BaseMenu.Trigger.Props

export function MenuTrigger({ className, ...props }: MenuTriggerProps) {
    return (
        <BaseMenu.Trigger
            {...props}
            className={withClass('avl-menu-trigger', className)}
        />
    )
}

// True inside a MenuSubmenu, so its popup can space itself from the parent's
const SubmenuContext = createContext(false)

// Also renders the portal and positioner, so it takes their placement props.
export type MenuPopupProps = BaseMenu.Popup.Props &
    Pick<
        BaseMenu.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset'
    >

export function MenuPopup({
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ...props
}: MenuPopupProps) {
    const avl = useContext(AnvilContext)
    const isSubmenu = useContext(SubmenuContext)

    return (
        // Into the AnvilRoot, not `body`, so the popup sees the theme variables
        <BaseMenu.Portal container={avl?.rootRef}>
            <BaseMenu.Positioner
                className="avl-menu-positioner"
                side={side}
                align={align}
                // A submenu clears its parent's padding and lines its first
                // item up with the trigger
                sideOffset={sideOffset ?? (isSubmenu ? 8 : 4)}
                alignOffset={alignOffset ?? (isSubmenu ? -4 : undefined)}
            >
                <BaseMenu.Popup
                    {...props}
                    className={withClass('avl-menu-popup', className)}
                />
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    )
}

// A menu nested in another one: put a MenuSubmenuTrigger and a MenuPopup in it,
// and place the whole thing among the parent's items.
export type MenuSubmenuProps = BaseMenu.SubmenuRoot.Props

export function MenuSubmenu(props: MenuSubmenuProps) {
    return (
        <SubmenuContext value={true}>
            <BaseMenu.SubmenuRoot {...props} />
        </SubmenuContext>
    )
}

// Looks like a MenuItem, with an arrow at the end. Opens on hover or click.
export type MenuSubmenuTriggerProps = BaseMenu.SubmenuTrigger.Props & {
    startIcon?: MaterialSymbol
}

export function MenuSubmenuTrigger({
    startIcon,
    className,
    children,
    ...props
}: MenuSubmenuTriggerProps) {
    return (
        <BaseMenu.SubmenuTrigger
            {...props}
            className={withClass('avl-menu-item', className)}
        >
            {startIcon && <Icon name={startIcon} />}
            <span className="avl-menu-item-label">{children}</span>
            <Icon name="arrow_right" />
        </BaseMenu.SubmenuTrigger>
    )
}

// Splits the menu: each group is its own container, with a gap between them.
// Items placed straight in the popup, outside any group, share a single one.
export type MenuGroupProps = BaseMenu.Group.Props

export function MenuGroup({ className, ...props }: MenuGroupProps) {
    return (
        <BaseMenu.Group
            {...props}
            className={withClass('avl-menu-group', className)}
        />
    )
}

export type MenuItemProps = BaseMenu.Item.Props & {
    startIcon?: MaterialSymbol
    endIcon?: MaterialSymbol
}

export function MenuItem({
    startIcon,
    endIcon,
    className,
    children,
    ...props
}: MenuItemProps) {
    return (
        <BaseMenu.Item
            {...props}
            className={withClass('avl-menu-item', className)}
        >
            {startIcon && <Icon name={startIcon} />}
            <span className="avl-menu-item-label">{children}</span>
            {endIcon && <Icon name={endIcon} />}
        </BaseMenu.Item>
    )
}
