import { useContext, type ReactNode } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import './navigation-drawer.css'

/**
 * Side navigation that slides in over the page, for small screens. Swipe it
 * back or tap outside to close. Holds the open state (`open` /
 * `defaultOpen` / `onOpenChange`).
 */
export type NavigationDrawerProps = Omit<Drawer.Root.Props, 'swipeDirection'>

export function NavigationDrawer(props: NavigationDrawerProps) {
    return <Drawer.Root {...props} swipeDirection="left" />
}

// Renders a bare button. Usually `render={<IconButton icon="menu" ... />}`.
export type NavigationDrawerTriggerProps = Drawer.Trigger.Props

export function NavigationDrawerTrigger({
    className,
    ...props
}: NavigationDrawerTriggerProps) {
    return (
        <Drawer.Trigger
            {...props}
            className={withClass('avl-navigation-drawer-trigger', className)}
        />
    )
}

// Also renders the portal and the dimmed backdrop. Put a NavigationDrawerTitle
// first (it names the drawer for screen readers), then the items.
export type NavigationDrawerPopupProps = Drawer.Popup.Props

export function NavigationDrawerPopup({
    className,
    ...props
}: NavigationDrawerPopupProps) {
    const avl = useContext(AnvilContext)

    return (
        // Into the AnvilRoot, not body, so the drawer sees the theme variables
        <Drawer.Portal container={avl?.rootRef}>
            <Drawer.Backdrop className="avl-navigation-drawer-backdrop" />
            <Drawer.Viewport className="avl-navigation-drawer-viewport">
                <Drawer.Popup
                    {...props}
                    className={withClass(
                        'avl-navigation-drawer-popup',
                        className
                    )}
                />
            </Drawer.Viewport>
        </Drawer.Portal>
    )
}

// The heading at the top, e.g. the app's name. Renders an <h2>.
export type NavigationDrawerTitleProps = Drawer.Title.Props

export function NavigationDrawerTitle({
    className,
    ...props
}: NavigationDrawerTitleProps) {
    return (
        <Drawer.Title
            {...props}
            className={withClass('avl-navigation-drawer-title', className)}
        />
    )
}

// A link that also closes the drawer. Pass `render` to use a router link
// instead, e.g. render={<Link to="/photos" />}.
export type NavigationDrawerItemProps = Omit<Drawer.Close.Props, 'children'> & {
    /** Material Symbol to show. */
    icon: MaterialSymbol
    /** Visible text, also the link's accessible name. */
    label: string
    /** The current page. Sets aria-current="page". */
    active?: boolean
    /** After the label, e.g. an unread count. */
    end?: ReactNode
    /** Where the default link goes. Not needed with a router `render`. */
    href?: string
}

export function NavigationDrawerItem({
    icon,
    label,
    active = false,
    end,
    href,
    render = <a href={href} />,
    className,
    ...props
}: NavigationDrawerItemProps) {
    return (
        <Drawer.Close
            {...props}
            render={render}
            nativeButton={false}
            aria-current={active ? 'page' : undefined}
            className={withClass('avl-navigation-drawer-item', className)}
        >
            <Icon name={icon} />
            <span className="avl-navigation-drawer-item-label">{label}</span>
            {end != null && (
                <span className="avl-navigation-drawer-item-end">{end}</span>
            )}
        </Drawer.Close>
    )
}
