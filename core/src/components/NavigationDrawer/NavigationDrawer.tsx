import { useContext, type ReactNode } from 'react'
import { Drawer } from '@base-ui/react/drawer'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import { checkAsChild, checkRoot } from '../../dev'
import './navigation-drawer.css'

/**
 * Side navigation that slides in over the page, for small screens. Swipe it
 * back or tap outside to close. Holds the open state (`open` /
 * `defaultOpen` / `onOpenChange`).
 */
export type NavigationDrawerProps = Omit<Drawer.Root.Props, 'swipeDirection'>

/**
 * Side navigation that slides in over the page, for small screens.
 *
 * @example
 * <NavigationDrawer>
 *     <NavigationDrawerTrigger render={<IconButton icon="menu" aria-label="Open navigation" />} />
 *     <NavigationDrawerPopup>
 *         <NavigationDrawerTitle>Mail</NavigationDrawerTitle>
 *         <NavigationDrawerItem icon="inbox" label="Inbox" href="/inbox" active />
 *     </NavigationDrawerPopup>
 * </NavigationDrawer>
 */
export function NavigationDrawer(props: NavigationDrawerProps) {
    return <Drawer.Root {...props} swipeDirection="left" />
}

export type NavigationDrawerTriggerProps = Drawer.Trigger.Props

/** Opens the drawer. Renders a bare `<button>`; usually `render={<IconButton icon="menu" aria-label="..." />}`. */
export function NavigationDrawerTrigger({
    className,
    ...props
}: NavigationDrawerTriggerProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(
            props,
            'NavigationDrawerTrigger',
            'navigation-drawer.md',
            '<NavigationDrawerTrigger render={<IconButton icon="menu" aria-label="Open navigation" />} />'
        )
    }
    return (
        <Drawer.Trigger
            {...props}
            className={withClass('avl-navigation-drawer-trigger', className)}
        />
    )
}

export type NavigationDrawerPopupProps = Drawer.Popup.Props

/**
 * The drawer panel. Also renders the portal and the dimmed backdrop. Put a
 * `NavigationDrawerTitle` first (it names the drawer), then the items.
 */
export function NavigationDrawerPopup({
    className,
    ...props
}: NavigationDrawerPopupProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'NavigationDrawerPopup')
    }

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

export type NavigationDrawerTitleProps = Drawer.Title.Props

/** The heading at the top, e.g. the app's name. Renders an `<h2>`. */
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

/**
 * A link that also closes the drawer. Give it `href`, or pass `render` for a
 * router link, e.g. `render={<Link to="/photos" />}`.
 */
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
