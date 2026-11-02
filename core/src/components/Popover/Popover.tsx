import { useContext, type Ref } from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { mergeRefs, withClass } from '../../utils'
import { MorphContext, useMorphOpen } from '../../morph'
import '../Menu/menu.css'
import './popover.css'

export type PopoverProps = BasePopover.Root.Props & {
    /**
     * Grow the popover out of its trigger, and shrink it back into it on
     * close, like an avatar opening into a profile card. @default false
     */
    morph?: boolean
}

export function Popover({
    morph = false,
    defaultOpen = false,
    ...props
}: PopoverProps) {
    const state = useMorphOpen({
        morph,
        open: props.open,
        defaultOpen,
        onOpenChange: props.onOpenChange,
    })

    return (
        <MorphContext value={state.refs}>
            <BasePopover.Root
                {...props}
                open={state.open}
                onOpenChange={state.onOpenChange}
            />
        </MorphContext>
    )
}

// Renders a bare button. Pass `render={<Button />}` to use the library button.
export type PopoverTriggerProps = BasePopover.Trigger.Props

export function PopoverTrigger({
    className,
    ref,
    ...props
}: PopoverTriggerProps) {
    const morph = useContext(MorphContext)

    return (
        <BasePopover.Trigger
            {...props}
            ref={mergeRefs(morph?.trigger, ref as Ref<HTMLElement>)}
            className={withClass('avl-popover-trigger', className)}
        />
    )
}

// Also renders the portal and positioner, so it takes their placement props.
export type PopoverPopupProps = BasePopover.Popup.Props &
    Pick<
        BasePopover.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
    >

export function PopoverPopup({
    anchor,
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ref,
    ...props
}: PopoverPopupProps) {
    const avl = useContext(AnvilContext)
    const morph = useContext(MorphContext)

    return (
        // Into the AnvilRoot, not body, so the popup sees the theme variables
        <BasePopover.Portal container={avl?.rootRef}>
            <BasePopover.Positioner
                className="avl-menu-positioner"
                anchor={anchor}
                side={side}
                align={align}
                sideOffset={sideOffset ?? 4}
                alignOffset={alignOffset}
            >
                {/* Menu's surface and open/close animation, with more room inside */}
                <BasePopover.Popup
                    {...props}
                    ref={mergeRefs(morph?.popup, ref as Ref<HTMLElement>)}
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
