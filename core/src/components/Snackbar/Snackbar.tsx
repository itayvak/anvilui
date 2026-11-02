import { useEffect, useRef, useState, type ReactNode } from 'react'
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
    const viewportRef = useRef<HTMLDivElement>(null)
    // Opens on hover, and stays open after a click or tap (no hover on touch)
    const [expanded, setExpanded] = useState(false)
    const [hovered, setHovered] = useState(false)
    const visibleCount = toasts.filter(
        (toast) => toast.transitionStatus !== 'ending'
    ).length
    const collapsed = visibleCount > 1 && !expanded && !hovered

    // Start collapsed again the next time a stack builds up
    useEffect(() => {
        if (visibleCount <= 1) setExpanded(false)
    }, [visibleCount])

    // Clicking or focusing anywhere else folds the list back up
    useEffect(() => {
        if (!expanded) return
        const viewport = viewportRef.current
        const close = (event: Event) => {
            if (!viewport?.contains(event.target as Node)) setExpanded(false)
        }
        document.addEventListener('pointerdown', close)
        document.addEventListener('focusin', close)
        return () => {
            document.removeEventListener('pointerdown', close)
            document.removeEventListener('focusin', close)
        }
    }, [expanded])

    let visibleIndex = 0

    return (
        <Toast.Viewport
            ref={viewportRef}
            className="avl-snackbar-viewport"
            data-collapsed={collapsed || undefined}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={(event) => {
                // Buttons do their own thing; anywhere else opens the stack
                if (!(event.target as Element).closest('button')) {
                    setExpanded(true)
                }
            }}
            onFocus={(event) => {
                // Keyboard users can't see what's behind, so open it for them
                if (event.target.matches(':focus-visible')) setExpanded(true)
            }}
        >
            {toasts.map((toast) => {
                const behind =
                    toast.transitionStatus !== 'ending' && visibleIndex++ > 0
                return (
                    <Toast.Root
                        key={toast.id}
                        toast={toast}
                        swipeDirection={['left', 'right', 'down']}
                        className="avl-snackbar"
                        data-behind={behind || undefined}
                        // Hidden under the newest one: keep its buttons from
                        // being clicked or reached while you can't see them
                        inert={(collapsed && behind) || undefined}
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
                )
            })}
        </Toast.Viewport>
    )
}
