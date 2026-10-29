import type { ComponentProps } from 'react'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { cx } from '../../utils'
import './navigation-list.css'

/**
 * A column of text-only navigation links, like a docs sidebar. Looks like an
 * expanded `NavigationRail` without icons. Fill it with
 * `NavigationListItem`s and give it an `aria-label` (e.g. "Components").
 */
export type NavigationListProps = ComponentProps<'nav'>

export function NavigationList({ className, ...props }: NavigationListProps) {
    return <nav {...props} className={cx('avl-navigation-list', className)} />
}

// A link by default. Pass `render` to use a router link instead, e.g.
// render={<Link to="/photos" />}.
export type NavigationListItemProps = useRender.ComponentProps<'a'> & {
    /** Visible text, also the link's accessible name. */
    label: string
    /** The current page. Sets aria-current="page". */
    active?: boolean
}

export function NavigationListItem({
    label,
    active = false,
    render,
    className,
    ...props
}: NavigationListItemProps) {
    return useRender({
        defaultTagName: 'a',
        render,
        state: { active },
        props: mergeProps<'a'>(
            {
                className: cx('avl-navigation-list-item', className),
                'aria-current': active ? 'page' : undefined,
                children: label,
            },
            props
        ),
    })
}
