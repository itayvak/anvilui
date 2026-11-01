import { useContext, type ComponentProps, type Ref } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { cx, mergeRefs, withClass } from '../../utils'
import { MorphContext, useMorphOpen } from '../../morph'
import './dialog.css'

export type DialogProps = BaseDialog.Root.Props & {
    /**
     * Grow the dialog out of its trigger, and shrink it back into it on
     * close (Material's container transform). Works best when the trigger
     * is a surface, like a clickable `Card`. @default false
     */
    morph?: boolean
}

export function Dialog({
    morph = false,
    defaultOpen = false,
    ...props
}: DialogProps) {
    const state = useMorphOpen({
        morph,
        open: props.open,
        defaultOpen,
        onOpenChange: props.onOpenChange,
    })

    return (
        <MorphContext value={state.refs}>
            <BaseDialog.Root
                {...props}
                open={state.open}
                onOpenChange={state.onOpenChange}
            />
        </MorphContext>
    )
}

// Renders a bare button. Pass `render={<Button />}` to use the library button.
export type DialogTriggerProps = BaseDialog.Trigger.Props

export function DialogTrigger({
    className,
    ref,
    ...props
}: DialogTriggerProps) {
    const morph = useContext(MorphContext)

    return (
        <BaseDialog.Trigger
            {...props}
            ref={mergeRefs(morph?.trigger, ref as Ref<HTMLElement>)}
            className={withClass('avl-dialog-trigger', className)}
        />
    )
}

// Also renders the portal and the dimmed backdrop behind the dialog.
export type DialogPopupProps = BaseDialog.Popup.Props

export function DialogPopup({ className, ref, ...props }: DialogPopupProps) {
    const avl = useContext(AnvilContext)
    const morph = useContext(MorphContext)

    return (
        // Into the AnvilRoot, not body, so the popup sees the theme variables
        <BaseDialog.Portal container={avl?.rootRef}>
            <BaseDialog.Backdrop className="avl-dialog-backdrop" />
            <BaseDialog.Popup
                {...props}
                ref={mergeRefs(morph?.popup, ref as Ref<HTMLElement>)}
                className={withClass('avl-dialog-popup', className)}
            />
        </BaseDialog.Portal>
    )
}

// Names the dialog for screen readers. Renders an <h2>.
export type DialogTitleProps = BaseDialog.Title.Props

export function DialogTitle({ className, ...props }: DialogTitleProps) {
    return (
        <BaseDialog.Title
            {...props}
            className={withClass('avl-dialog-title', className)}
        />
    )
}

export type DialogDescriptionProps = BaseDialog.Description.Props

export function DialogDescription({
    className,
    ...props
}: DialogDescriptionProps) {
    return (
        <BaseDialog.Description
            {...props}
            className={withClass('avl-dialog-description', className)}
        />
    )
}

// The row of buttons at the bottom, aligned to the end.
export type DialogActionsProps = ComponentProps<'div'>

export function DialogActions({ className, ...props }: DialogActionsProps) {
    return <div {...props} className={cx('avl-dialog-actions', className)} />
}

// Closes the dialog. Renders a bare button; pass `render={<Button />}` to use
// the library's.
export type DialogCloseProps = BaseDialog.Close.Props

export function DialogClose({ className, ...props }: DialogCloseProps) {
    return (
        <BaseDialog.Close
            {...props}
            className={withClass('avl-dialog-close', className)}
        />
    )
}
