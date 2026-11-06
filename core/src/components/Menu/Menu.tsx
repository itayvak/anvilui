import { createContext, useContext } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import { checkAsChild, checkRoot } from '../../dev'
import './menu.css'

export type MenuProps = BaseMenu.Root.Props

/**
 * A dropdown menu of actions. Holds the open state (`open` / `defaultOpen` /
 * `onOpenChange`). Parts: `MenuTrigger`, `MenuPopup` (includes portal and
 * positioner), `MenuItem`, `MenuGroup` (there is no MenuSeparator: groups
 * are split visually), `MenuSubmenu` + `MenuSubmenuTrigger`.
 *
 * @example
 * <Menu>
 *     <MenuTrigger render={<IconButton icon="more_vert" aria-label="More" fillType="text" color="container" />} />
 *     <MenuPopup align="end">
 *         <MenuItem startIcon="edit" onClick={rename}>Rename</MenuItem>
 *         <MenuItem startIcon="delete" onClick={remove}>Delete</MenuItem>
 *     </MenuPopup>
 * </Menu>
 */
export function Menu(props: MenuProps) {
    return <BaseMenu.Root {...props} />
}

export type MenuTriggerProps = BaseMenu.Trigger.Props

/** Opens the menu. Renders a bare `<button>`; pass `render={<Button />}` to use the library's. */
export function MenuTrigger({ className, ...props }: MenuTriggerProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'MenuTrigger', 'menu.md')
    }
    return (
        <BaseMenu.Trigger
            {...props}
            className={withClass('avl-menu-trigger', className)}
        />
    )
}

// True inside a MenuSubmenu, so its popup can space itself from the parent's
const SubmenuContext = createContext(false)

/** The menu panel. Also renders the portal and positioner, so it takes their placement props. */
export type MenuPopupProps = BaseMenu.Popup.Props &
    Pick<
        BaseMenu.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset'
    >

/** The menu panel, holding the items. Takes `side`, `align`, `sideOffset`, `alignOffset`. */
export function MenuPopup({
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ...props
}: MenuPopupProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'MenuPopup')
    }
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

export type MenuSubmenuProps = BaseMenu.SubmenuRoot.Props

/**
 * A menu nested in another one: put a `MenuSubmenuTrigger` and a
 * `MenuPopup` in it, and place the whole thing among the parent's items.
 */
export function MenuSubmenu(props: MenuSubmenuProps) {
    return (
        <SubmenuContext value={true}>
            <BaseMenu.SubmenuRoot {...props} />
        </SubmenuContext>
    )
}

export type MenuSubmenuTriggerProps = BaseMenu.SubmenuTrigger.Props & {
    /** Material Symbol before the label. */
    startIcon?: MaterialSymbol
}

/** Looks like a `MenuItem`, with an arrow at the end. Opens its submenu on hover or click. */
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

export type MenuGroupProps = BaseMenu.Group.Props

/**
 * Splits the menu: each group is its own container, with a gap between
 * them. Use it where other libraries use a separator. Items placed straight
 * in the popup, outside any group, share a single container.
 */
export function MenuGroup({ className, ...props }: MenuGroupProps) {
    return (
        <BaseMenu.Group
            {...props}
            className={withClass('avl-menu-group', className)}
        />
    )
}

export type MenuItemProps = BaseMenu.Item.Props & {
    /** Material Symbol before the label. */
    startIcon?: MaterialSymbol
    /** Material Symbol after the label. */
    endIcon?: MaterialSymbol
}

/** One action. Use `onClick` (there is no onSelect); the menu closes after it. */
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
