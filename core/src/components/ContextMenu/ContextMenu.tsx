import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { withClass } from '../../utils'

/**
 * A menu that opens at the pointer on right-click (or long-press on touch).
 * Put a `ContextMenuTrigger` around the area, then a `MenuPopup` with
 * `MenuItem`s, `MenuGroup`s and `MenuSubmenu`s, the same parts as `Menu`.
 * Holds the open state (`open` / `defaultOpen` / `onOpenChange`).
 */
export type ContextMenuProps = BaseContextMenu.Root.Props

export function ContextMenu(props: ContextMenuProps) {
    return <BaseContextMenu.Root {...props} />
}

// The area that opens the menu. Renders a <div>, or pass `render`.
export type ContextMenuTriggerProps = BaseContextMenu.Trigger.Props

export function ContextMenuTrigger({
    className,
    ...props
}: ContextMenuTriggerProps) {
    return (
        <BaseContextMenu.Trigger
            {...props}
            className={withClass('avl-context-menu-trigger', className)}
        />
    )
}
