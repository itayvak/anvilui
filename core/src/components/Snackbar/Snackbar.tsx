import type { ReactNode } from 'react'
import { Toast } from '@base-ui/react/toast'
import { Icon } from '../Icon/Icon'
import './snackbar.css'

export type SnackbarOptions = {
    /** The text shown. Keep it to a line or two. */
    message: ReactNode
    /** One text button, like "Undo". Clicking it also closes the snackbar. */
    action?: { label: ReactNode; onClick: () => void }
    /** Show a close (×) button. @default false */
    closeButton?: boolean
    /** Milliseconds before it closes on its own; `0` keeps it open. @default 5000 */
    timeout?: number
    /** `high` makes screen readers announce it right away. @default 'low' */
    priority?: 'low' | 'high'
    /** Called once it has closed, however that happened. */
    onClose?: () => void
}

type SnackbarData = { closeButton?: boolean }

/**
 * Shows snackbars: `const snackbar = useSnackbar()`, then
 * `snackbar.show({ message: 'Saved' })`. Works anywhere inside `AnvilRoot`.
 */
export function useSnackbar() {
    const manager = Toast.useToastManager<SnackbarData>()

    return {
        /** Shows a snackbar at the bottom; open ones move up. Returns its id. */
        show: ({ message, action, closeButton, ...options }: SnackbarOptions) =>
            manager.add({
                ...options,
                description: message,
                actionProps: action && {
                    children: action.label,
                    onClick: action.onClick,
                },
                data: { closeButton },
            }),
        /** Closes one snackbar by id, or all of them. */
        close: manager.close,
    }
}

// Rendered once by AnvilRoot, inside its Toast.Provider.
export function SnackbarViewport() {
    const { toasts } = Toast.useToastManager<SnackbarData>()

    return (
        <Toast.Viewport className="avl-snackbar-viewport">
            {toasts.map((toast) => (
                <Toast.Root
                    key={toast.id}
                    toast={toast}
                    swipeDirection={['left', 'right', 'down']}
                    className="avl-snackbar"
                >
                    <Toast.Description className="avl-snackbar-message" />
                    {toast.actionProps && (
                        <Toast.Action className="avl-snackbar-action" />
                    )}
                    {toast.data?.closeButton && (
                        <Toast.Close
                            className="avl-snackbar-close"
                            aria-label="Close"
                        >
                            <Icon name="close" />
                        </Toast.Close>
                    )}
                </Toast.Root>
            ))}
        </Toast.Viewport>
    )
}
