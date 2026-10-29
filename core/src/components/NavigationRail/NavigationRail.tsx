import { createContext, useContext, useState, type ComponentProps } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { Icon } from '../Icon/Icon'
import { IconButton, type IconButtonProps } from '../IconButton/IconButton'
import { cx, withClass } from '../../utils'
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

// The menu button at the top that expands and collapses the rail.
export type NavigationRailToggleProps = Omit<IconButtonProps, 'icon'>

export function NavigationRailToggle({
    className,
    onClick,
    ...props
}: NavigationRailToggleProps) {
    const rail = useContext(RailContext)
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
}

export function NavigationRailItem({
    icon,
    label,
    active = false,
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
                    </>
                ),
            },
            props
        ),
    })
}
