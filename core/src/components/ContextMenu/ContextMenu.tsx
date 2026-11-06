import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { withClass } from '../../utils'
import { checkAsChild } from '../../dev'

/**
 * A menu that opens at the pointer on right-click (or long-press on touch).
 * Put a `ContextMenuTrigger` around the area, then a `MenuPopup` with
 * `MenuItem`s, `MenuGroup`s and `MenuSubmenu`s, the same parts as `Menu`.
 * Holds the open state (`open` / `defaultOpen` / `onOpenChange`).
 */
export type ContextMenuProps = BaseContextMenu.Root.Props

/**
 * A menu that opens at the pointer on right-click or long-press. Uses
 * `Menu`'s `MenuPopup` and `MenuItem` for its content.
 *
 * @example
 * <ContextMenu>
 *     <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
 *     <MenuPopup>
 *         <MenuItem onClick={copy}>Copy</MenuItem>
 *     </MenuPopup>
 * </ContextMenu>
 */
export function ContextMenu(props: ContextMenuProps) {
    return <BaseContextMenu.Root {...props} />
}

export type ContextMenuTriggerProps = BaseContextMenu.Trigger.Props

/** The area that opens the menu. Renders a `<div>`, or pass `render`. */
export function ContextMenuTrigger({
    className,
    ...props
}: ContextMenuTriggerProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(
            props,
            'ContextMenuTrigger',
            'context-menu.md',
            '<ContextMenuTrigger render={<Card />}>...</ContextMenuTrigger>'
        )
    }
    return (
        <BaseContextMenu.Trigger
            {...props}
            className={withClass('avl-context-menu-trigger', className)}
        />
    )
}
