import { useContext, type Ref } from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { mergeRefs, withClass } from '../../utils'
import { MorphContext, useMorphOpen } from '../../morph'
import { checkAsChild, checkRoot } from '../../dev'
import '../Menu/menu.css'
import './popover.css'

export type PopoverProps = BasePopover.Root.Props & {
    /**
     * Grow the popover out of its trigger, and shrink it back into it on
     * close, like an avatar opening into a profile card. @default false
     */
    morph?: boolean
}

/**
 * A floating panel anchored to its trigger, for content users interact with
 * (forms, details). Holds the open state: `open` / `defaultOpen` /
 * `onOpenChange`. Parts: `PopoverTrigger`, `PopoverPopup` (includes portal
 * and positioner; takes `side` / `align`), `PopoverTitle`,
 * `PopoverDescription`, `PopoverClose`.
 *
 * @example
 * <Popover>
 *     <PopoverTrigger render={<IconButton icon="info" aria-label="Details" />} />
 *     <PopoverPopup side="bottom" align="start">
 *         <PopoverTitle>Details</PopoverTitle>
 *         <PopoverDescription>Last edited today.</PopoverDescription>
 *     </PopoverPopup>
 * </Popover>
 */
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

export type PopoverTriggerProps = BasePopover.Trigger.Props

/** Opens the popover. Renders a bare `<button>`; pass `render={<Button />}` to use the library's. */
export function PopoverTrigger({
    className,
    ref,
    ...props
}: PopoverTriggerProps) {
    const morph = useContext(MorphContext)
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'PopoverTrigger', 'popover.md')
    }

    return (
        <BasePopover.Trigger
            {...props}
            ref={mergeRefs(morph?.trigger, ref as Ref<HTMLElement>)}
            className={withClass('avl-popover-trigger', className)}
        />
    )
}

/** The panel. Also renders the portal and positioner, so it takes their placement props. */
export type PopoverPopupProps = BasePopover.Popup.Props &
    Pick<
        BasePopover.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
    >

/** The panel. Takes `side`, `align`, `sideOffset`, `alignOffset` and `anchor`. */
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
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'PopoverPopup')
    }

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

export type PopoverTitleProps = BasePopover.Title.Props

/**
 * Names the popup for screen readers. Renders an `<h2>`; pass
 * `render={<h3 />}` (or another level) to fit the page's headings.
 */
export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
    return (
        <BasePopover.Title
            {...props}
            className={withClass('avl-popover-title', className)}
        />
    )
}

export type PopoverDescriptionProps = BasePopover.Description.Props

/** Supporting text in the popover. */
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

export type PopoverCloseProps = BasePopover.Close.Props

/**
 * Closes the popover. Renders a bare `<button>`; pass `render={<Button />}`
 * or `render={<IconButton ... />}` to use the library's.
 */
export function PopoverClose({ className, ...props }: PopoverCloseProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'PopoverClose', 'popover.md')
    }
    return (
        <BasePopover.Close
            {...props}
            className={withClass('avl-popover-close', className)}
        />
    )
}
