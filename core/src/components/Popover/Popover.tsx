import { useContext } from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { withClass } from '../../utils'
import '../Menu/menu.css'
import './popover.css'

export type PopoverProps = BasePopover.Root.Props

export function Popover(props: PopoverProps) {
    return <BasePopover.Root {...props} />
}

// Renders a bare button. Pass `render={<Button />}` to use the library button.
export type PopoverTriggerProps = BasePopover.Trigger.Props

export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
    return (
        <BasePopover.Trigger
            {...props}
            className={withClass('avl-popover-trigger', className)}
        />
    )
}

// Also renders the portal and positioner, so it takes their placement props.
export type PopoverPopupProps = BasePopover.Popup.Props &
    Pick<
        BasePopover.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset'
    >

export function PopoverPopup({
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ...props
}: PopoverPopupProps) {
    const avl = useContext(AnvilContext)

    return (
        // Into the AnvilRoot, not body, so the popup sees the theme variables
        <BasePopover.Portal container={avl?.rootRef}>
            <BasePopover.Positioner
                className="avl-menu-positioner"
                side={side}
                align={align}
                sideOffset={sideOffset ?? 4}
                alignOffset={alignOffset}
            >
                {/* Menu's surface and open/close animation, with more room inside */}
                <BasePopover.Popup
                    {...props}
                    className={withClass(
                        'avl-menu-popup avl-popover-popup',
                        className
                    )}
                />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    )
}

// Names the popup for screen readers. Renders an <h2>; pass `render={<h3 />}`
// (or another level) to fit the page's headings.
export type PopoverTitleProps = BasePopover.Title.Props

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
    return (
        <BasePopover.Title
            {...props}
            className={withClass('avl-popover-title', className)}
        />
    )
}

export type PopoverDescriptionProps = BasePopover.Description.Props

export function PopoverDescription({
    className,
    ...props
}: PopoverDescriptionProps) {
    return (
        <BasePopover.Description
            {...props}
            className={withClass('avl-popover-description', className)}
        />
    )
}

// Closes the popover. Renders a bare button; pass `render={<Button />}` or
// `render={<IconButton ... />}` to use the library's.
export type PopoverCloseProps = BasePopover.Close.Props

export function PopoverClose({ className, ...props }: PopoverCloseProps) {
    return (
        <BasePopover.Close
            {...props}
            className={withClass('avl-popover-close', className)}
        />
    )
}
