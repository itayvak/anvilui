import { useContext, type ComponentProps } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { cx, withClass } from '../../utils'
import './dialog.css'

export type DialogProps = BaseDialog.Root.Props

export function Dialog(props: DialogProps) {
    return <BaseDialog.Root {...props} />
}

// Renders a bare button. Pass `render={<Button />}` to use the library button.
export type DialogTriggerProps = BaseDialog.Trigger.Props

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
    return (
        <BaseDialog.Trigger
            {...props}
            className={withClass('avl-dialog-trigger', className)}
        />
    )
}

// Also renders the portal and the dimmed backdrop behind the dialog.
export type DialogPopupProps = BaseDialog.Popup.Props

export function DialogPopup({ className, ...props }: DialogPopupProps) {
    const avl = useContext(AnvilContext)

    return (
        // Into the AnvilRoot, not body, so the popup sees the theme variables
        <BaseDialog.Portal container={avl?.rootRef}>
            <BaseDialog.Backdrop className="avl-dialog-backdrop" />
            <BaseDialog.Popup
                {...props}
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
