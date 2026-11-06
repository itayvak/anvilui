import {
    createContext,
    useContext,
    useState,
    type ComponentProps,
    type ReactNode,
} from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { Icon } from '../Icon/Icon'
import { IconButton, type IconButtonProps } from '../IconButton/IconButton'
import { cx, withClass } from '../../utils'
import { devError } from '../../dev'
import './navigation-rail.css'

const RailContext = createContext<{
    expanded: boolean
    setExpanded: (expanded: boolean) => void
} | null>(null)

/**
 * Side navigation between an app's top-level pages, for medium and large
 * screens. Collapsed, it shows icons with small labels under them; expanded,
 * labels sit next to the icons. Put a `NavigationRailToggle` first, then
 * `NavigationRailItem`s, and give it an `aria-label` (e.g. "Main").
 */
export type NavigationRailProps = ComponentProps<'nav'> & {
    /** Whether labels sit next to the icons. Pair with `onExpandedChange`. */
    expanded?: boolean
    /** Starting state when `expanded` isn't controlled. @default false */
    defaultExpanded?: boolean
    /** Called when a `NavigationRailToggle` is pressed. */
    onExpandedChange?: (expanded: boolean) => void
}

/**
 * Side navigation for medium and large screens.
 *
 * @example
 * <NavigationRail aria-label="Main">
 *     <NavigationRailToggle aria-label="Toggle navigation" />
 *     <NavigationRailItem icon="inbox" label="Inbox" href="/inbox" active end="3" />
 *     <NavigationRailItem icon="send" label="Sent" href="/sent" />
 * </NavigationRail>
 */
export function NavigationRail({
    expanded: expandedProp,
    defaultExpanded = false,
    onExpandedChange,
    className,
    ...props
}: NavigationRailProps) {
    const [internal, setInternal] = useState(defaultExpanded)
    const expanded = expandedProp ?? internal
    const setExpanded = (next: boolean) => {
        setInternal(next)
        onExpandedChange?.(next)
    }

    return (
        <RailContext.Provider value={{ expanded, setExpanded }}>
            <nav
                {...props}
                data-expanded={expanded || undefined}
                className={cx('avl-navigation-rail', className)}
            />
        </RailContext.Provider>
    )
}

export type NavigationRailToggleProps = Omit<IconButtonProps, 'icon'>

/** The menu button at the top that expands and collapses the rail. Needs an `aria-label`. */
export function NavigationRailToggle({
    className,
    onClick,
    ...props
}: NavigationRailToggleProps) {
    const rail = useContext(RailContext)
    if (process.env.NODE_ENV !== 'production' && !rail) {
        devError(
            '<NavigationRailToggle> is rendered outside a <NavigationRail>, so it has nothing to expand.',
            '<NavigationRail aria-label="Main">\n    <NavigationRailToggle aria-label="Toggle navigation" />\n    <NavigationRailItem icon="home" label="Home" href="/" />\n</NavigationRail>',
            'navigation-rail.md'
        )
    }
    const expanded = rail?.expanded ?? false

    return (
        <IconButton
            fillType="text"
            color="container"
            {...props}
            icon={expanded ? 'menu_open' : 'menu'}
            aria-expanded={expanded}
            onClick={(e) => {
                onClick?.(e)
                rail?.setExpanded(!expanded)
            }}
            className={withClass('avl-navigation-rail-toggle', className)}
        />
    )
}

// A link by default. Pass `render` to use a router link instead, e.g.
// render={<Link to="/photos" />}.
export type NavigationRailItemProps = useRender.ComponentProps<'a'> & {
    /** Material Symbol to show. */
    icon: MaterialSymbol
    /** Visible text, also the link's accessible name. */
    label: string
    /** The current page. Sets aria-current="page". */
    active?: boolean
    /**
     * Short content after the label, like an unread count. Shown as a badge
     * on the icon while the rail is collapsed, so keep it to a few characters.
     */
    end?: ReactNode
}

/** One destination: an `<a>` by default (give it `href`), or a router link via `render`. */
export function NavigationRailItem({
    icon,
    label,
    active = false,
    end,
    render,
    className,
    ...props
}: NavigationRailItemProps) {
    return useRender({
        defaultTagName: 'a',
        render,
        state: { active },
        props: mergeProps<'a'>(
            {
                className: cx('avl-navigation-rail-item', className),
                'aria-current': active ? 'page' : undefined,
                children: (
                    <>
                        <span className="avl-navigation-rail-item-indicator" />
                        <Icon name={icon} />
                        <span className="avl-navigation-rail-item-label">
                            {label}
                        </span>
                        {end != null && (
                            <span className="avl-navigation-rail-item-end">
                                {end}
                            </span>
                        )}
                    </>
                ),
            },
            props
        ),
    })
}
