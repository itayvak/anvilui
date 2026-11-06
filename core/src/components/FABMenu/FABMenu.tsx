import { createContext, useContext, useRef, useState } from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { useMagnet } from '../FAB/magnet'
import {
    colorClass,
    type ComponentColor,
    type ComponentFillType,
} from '../../colors/colors'
import { cx, withClass } from '../../utils'
import { checkRoot } from '../../dev'
import '../FAB/fab.css'
import './fab-menu.css'

// The FAB's color, so the items can take its softer container shade
const FABMenuColorContext = createContext<ComponentColor>('primary')

export type FABMenuProps = Omit<
    BaseMenu.Root.Props,
    'children' | 'orientation'
> & {
    /** Material Symbol on the closed FAB. */
    icon: MaterialSymbol
    /** Material Symbol on the open FAB. @default 'close' */
    closeIcon?: MaterialSymbol
    /** Screen reader name for the FAB, which has no visible text. */
    'aria-label': string
    /**
     * Theme color role for the FAB. Its items use the same role's container
     * shade (`primary-container` for `primary`). @default 'primary'
     */
    color?: ComponentColor
    /** How the FAB's color is applied. @default 'filled' */
    fillType?: ComponentFillType
    /** Which side of the FAB the items open on. @default 'top' */
    side?: BaseMenu.Positioner.Props['side']
    /** How the items line up with the FAB. @default 'end' */
    align?: BaseMenu.Positioner.Props['align']
    /** Stick to a mouse cursor that comes close, while closed. @default true */
    sticky?: boolean
    /** Extra classes for the FAB itself. */
    className?: string
    /** `FABMenuItem`s, listed top to bottom. */
    children: React.ReactNode
}

/**
 * A FAB that splits into a stack of labeled actions. The FAB turns into
 * a close button while open. Place it yourself, like a FAB, usually
 * `position: fixed` in the bottom-end corner.
 *
 * @example
 * <FABMenu icon="add" aria-label="Create">
 *     <FABMenuItem icon="description" onClick={newDoc}>Document</FABMenuItem>
 *     <FABMenuItem icon="folder" onClick={newFolder}>Folder</FABMenuItem>
 * </FABMenu>
 */
export function FABMenu({
    icon,
    closeIcon = 'close',
    'aria-label': ariaLabel,
    color = 'primary',
    fillType,
    side = 'top',
    align = 'end',
    sticky = true,
    className,
    children,
    ...props
}: FABMenuProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'FABMenu')
    }
    // Mirrors the open state, controlled or not, to turn the magnet off
    // while open: a FAB sliding around would drag the items along with it
    const [localOpen, setLocalOpen] = useState(props.defaultOpen ?? false)
    const open = props.open ?? localOpen
    const trigger = useRef<HTMLButtonElement>(null)
    useMagnet(trigger, sticky && !open && !props.disabled)

    return (
        <FABMenuColorContext value={color}>
            <BaseMenu.Root
                {...props}
                onOpenChange={(next, details) => {
                    setLocalOpen(next)
                    props.onOpenChange?.(next, details)
                }}
            >
                <BaseMenu.Trigger
                    ref={trigger}
                    aria-label={ariaLabel}
                    className={cx(
                        'avl-fab avl-fab-size-normal avl-fab-menu-trigger',
                        colorClass(color, fillType),
                        className
                    )}
                >
                    <Icon name={icon} className="avl-fab-menu-icon-open" />
                    <Icon
                        name={closeIcon}
                        className="avl-fab-menu-icon-close"
                    />
                </BaseMenu.Trigger>
                {/* Into the AnvilRoot, not `body`, so it sees the theme */}
                <BaseMenu.Portal container={avl?.rootRef}>
                    <BaseMenu.Positioner
                        className="avl-menu-positioner"
                        side={side}
                        align={align}
                        sideOffset={8}
                    >
                        <BaseMenu.Popup className="avl-fab-menu-popup">
                            {children}
                        </BaseMenu.Popup>
                    </BaseMenu.Positioner>
                </BaseMenu.Portal>
            </BaseMenu.Root>
        </FABMenuColorContext>
    )
}

export type FABMenuItemProps = Omit<BaseMenu.Item.Props, 'children'> & {
    /** Material Symbol before the label. */
    icon: MaterialSymbol
    /** The visible label. */
    children: React.ReactNode
    /**
     * Theme color role, shown in its softer container shade.
     * @default the FABMenu's color
     */
    color?: ComponentColor
}

/** One labeled action in a `FABMenu`. Use `onClick` to act on it. */
export function FABMenuItem({
    icon,
    color,
    className,
    children,
    ...props
}: FABMenuItemProps) {
    const menuColor = useContext(FABMenuColorContext)

    return (
        <BaseMenu.Item
            {...props}
            // fab-menu.css maps this to the role's container shade
            data-color={color ?? menuColor}
            className={withClass('avl-fab-menu-item', className)}
        >
            <Icon name={icon} />
            {children}
        </BaseMenu.Item>
    )
}
