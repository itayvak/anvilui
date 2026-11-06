import type { ComponentProps, ReactNode } from 'react'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { cx } from '../../utils'
import './list.css'

export type ListProps = ComponentProps<'ul'> & {
    /** Thin lines between the items. @default false */
    divided?: boolean
}

/**
 * A column of `ListItem`s. Renders a `<ul>`.
 *
 * @example
 * <List divided>
 *     <ListItem label="Wi-Fi" description="Connected" start={<Icon name="wifi" />} end={<Switch defaultChecked />} render={<label />} />
 *     <ListItem label="Account" end={<Icon name="chevron_right" />} render={<a href="/account" />} />
 * </List>
 */
export function List({ divided = false, className, ...props }: ListProps) {
    return (
        <ul
            {...props}
            className={cx('avl-list', divided && 'avl-list-divided', className)}
        />
    )
}

/**
 * One row. Static by default; pass `render` to make the whole row
 * interactive: `render={<a href="/settings" />}` for a link, or
 * `render={<label />}` so clicking anywhere toggles a Switch or Checkbox
 * in `start` or `end`.
 */
export type ListItemProps = Omit<
    useRender.ComponentProps<'div'>,
    'children'
> & {
    /** The main text. */
    label: ReactNode
    /** Supporting text under the label, up to two lines. */
    description?: ReactNode
    /** Before the text: an `Icon`, `Avatar`, `Checkbox`, ... */
    start?: ReactNode
    /** After the text: a `Switch`, `Badge`, short text, an `Icon`, ... */
    end?: ReactNode
}

/** One row: `label`, optional `description`, and `start` / `end` slots. Takes no children. */
export function ListItem({
    label,
    description,
    start,
    end,
    render,
    className,
    ...props
}: ListItemProps) {
    const row = useRender({
        defaultTagName: 'div',
        render,
        props: mergeProps<'div'>(
            {
                className: cx(
                    'avl-list-item',
                    description != null && 'avl-list-item-two-line',
                    className
                ),
                children: (
                    <>
                        {start != null && (
                            <span className="avl-list-item-start">{start}</span>
                        )}
                        <span className="avl-list-item-text">
                            <span className="avl-list-item-label">{label}</span>
                            {description != null && (
                                <span className="avl-list-item-description">
                                    {description}
                                </span>
                            )}
                        </span>
                        {end != null && (
                            <span className="avl-list-item-end">{end}</span>
                        )}
                    </>
                ),
            },
            props
        ),
    })

    // The <li> stays, so it's still a list to screen readers when the row
    // itself is a link or label
    return <li className="avl-list-item-wrapper">{row}</li>
}
