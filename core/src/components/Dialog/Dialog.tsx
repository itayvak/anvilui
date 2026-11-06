import { useContext, type ComponentProps, type Ref } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { cx, mergeRefs, withClass } from '../../utils'
import { MorphContext, useMorphOpen } from '../../morph'
import { checkAsChild, checkRoot } from '../../dev'
import './dialog.css'

export type DialogProps = BaseDialog.Root.Props & {
    /**
     * Grow the dialog out of its trigger, and shrink it back into it on
     * close (Material's container transform). Works best when the trigger
     * is a surface, like a clickable `Card`. @default false
     */
    morph?: boolean
}

/**
 * A modal dialog. Holds the open state: `open` / `defaultOpen` /
 * `onOpenChange`. Parts: `DialogTrigger`, `DialogPopup` (already includes the
 * portal and backdrop; there is no DialogContent or DialogOverlay),
 * `DialogTitle`, `DialogDescription`, `DialogActions` (the footer row) and
 * `DialogClose`.
 *
 * @example
 * <Dialog>
 *     <DialogTrigger render={<Button />}>Delete</DialogTrigger>
 *     <DialogPopup>
 *         <DialogTitle>Delete file?</DialogTitle>
 *         <DialogDescription>This can't be undone.</DialogDescription>
 *         <DialogActions>
 *             <DialogClose render={<Button fillType="text" />}>Cancel</DialogClose>
 *             <Button color="error" onClick={remove}>Delete</Button>
 *         </DialogActions>
 *     </DialogPopup>
 * </Dialog>
 */
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

export type DialogTriggerProps = BaseDialog.Trigger.Props

/**
 * Opens the dialog. Renders a bare, unstyled `<button>`: pass
 * `render={<Button />}` to use the library's button (not `asChild`).
 */
export function DialogTrigger({
    className,
    ref,
    ...props
}: DialogTriggerProps) {
    const morph = useContext(MorphContext)
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'DialogTrigger', 'dialog.md')
    }

    return (
        <BaseDialog.Trigger
            {...props}
            ref={mergeRefs(morph?.trigger, ref as Ref<HTMLElement>)}
            className={withClass('avl-dialog-trigger', className)}
        />
    )
}

export type DialogPopupProps = BaseDialog.Popup.Props

/** The dialog box. Also renders the portal and the dimmed backdrop behind it. */
export function DialogPopup({ className, ref, ...props }: DialogPopupProps) {
    const avl = useContext(AnvilContext)
    const morph = useContext(MorphContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'DialogPopup')
    }

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

export type DialogTitleProps = BaseDialog.Title.Props

/** Names the dialog for screen readers. Renders an `<h2>`. */
export function DialogTitle({ className, ...props }: DialogTitleProps) {
    return (
        <BaseDialog.Title
            {...props}
            className={withClass('avl-dialog-title', className)}
        />
    )
}

export type DialogDescriptionProps = BaseDialog.Description.Props

/** Supporting text under the title; screen readers read it as the description. */
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

export type DialogActionsProps = ComponentProps<'div'>

/** The row of buttons at the bottom, aligned to the end (the "footer"). */
export function DialogActions({ className, ...props }: DialogActionsProps) {
    return <div {...props} className={cx('avl-dialog-actions', className)} />
}

export type DialogCloseProps = BaseDialog.Close.Props

/**
 * Closes the dialog. Renders a bare `<button>`; pass `render={<Button />}`
 * to use the library's.
 */
export function DialogClose({ className, ...props }: DialogCloseProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkAsChild(props, 'DialogClose', 'dialog.md')
    }
    return (
        <BaseDialog.Close
            {...props}
            className={withClass('avl-dialog-close', className)}
        />
    )
}
