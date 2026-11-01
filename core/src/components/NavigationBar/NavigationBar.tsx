import type { ComponentProps } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { Icon } from '../Icon/Icon'
import { cx } from '../../utils'
import './navigation-bar.css'

/**
 * Bottom navigation between an app's top-level pages, for small screens.
 * Fill it with 3–5 `NavigationBarItem`s and give it an `aria-label` (e.g.
 * "Main"). Place it yourself, e.g. `position: sticky; bottom: 0`.
 */
export type NavigationBarProps = ComponentProps<'nav'>

export function NavigationBar({ className, ...props }: NavigationBarProps) {
    return <nav {...props} className={cx('avl-navigation-bar', className)} />
}

// A link by default. Pass `render` to use a router link instead, e.g.
// render={<Link to="/photos" />}.
export type NavigationBarItemProps = useRender.ComponentProps<'a'> & {
    /** Material Symbol to show. */
    icon: MaterialSymbol
    /** Visible text, also the link's accessible name. */
    label: string
    /** The current page. Sets aria-current="page". */
    active?: boolean
}

export function NavigationBarItem({
    icon,
    label,
    active = false,
    render,
    className,
    ...props
}: NavigationBarItemProps) {
    return useRender({
        defaultTagName: 'a',
        render,
        state: { active },
        props: mergeProps<'a'>(
            {
                className: cx('avl-navigation-bar-item', className),
                'aria-current': active ? 'page' : undefined,
                children: (
                    <>
                        <span className="avl-navigation-bar-item-indicator">
                            <Icon name={icon} />
                        </span>
                        <span className="avl-navigation-bar-item-label">
                            {label}
                        </span>
                    </>
                ),
            },
            props
        ),
    })
}
