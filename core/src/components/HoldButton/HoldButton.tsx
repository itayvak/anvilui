import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Button, type ButtonProps } from '../Button/Button'
import { cx } from '../../utils'
import './hold-button.css'

export type HoldButtonProps = Omit<ButtonProps, 'loading'> & {
    /** Called once the button has been held down for `holdDuration`. */
    onConfirm: () => void
    /** How long to hold, in milliseconds. @default 1500 */
    holdDuration?: number
}

/**
 * A button for destructive actions: press and hold until the fill sweeps
 * across, instead of a confirm dialog. Letting go early cancels. Works with
 * Space and Enter too; a screen reader's click, which can't be held,
 * confirms straight away.
 */
export function HoldButton({
    onConfirm,
    holdDuration = 1500,
    className,
    style,
    disabled,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
    onKeyDown,
    onKeyUp,
    onClick,
    onContextMenu,
    ...props
}: HoldButtonProps) {
    const [state, setState] = useState<'idle' | 'holding' | 'confirmed'>('idle')
    // Bumped on each early release, to replay the "no" wobble
    const [nudges, setNudges] = useState(0)
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
    // A pointer press is followed by a click, which the hold already
    // handled; keys don't click (their default is prevented)
    const pressed = useRef(false)

    useEffect(() => () => clearTimeout(timer.current), [])

    const confirm = () => {
        setState('confirmed')
        onConfirm()
        // Long enough for the pop to play, then ready again
        timer.current = setTimeout(() => setState('idle'), 600)
    }

    const start = () => {
        if (disabled || state !== 'idle') return
        setState('holding')
        timer.current = setTimeout(confirm, holdDuration)
    }

    const cancel = () => {
        if (state !== 'holding') return
        clearTimeout(timer.current)
        setState('idle')
        setNudges((n) => n + 1)
    }

    return (
        <Button
            {...props}
            disabled={disabled}
            aria-description="Press and hold to confirm"
            data-hold={state === 'idle' ? undefined : state}
            // Restarts the wobble animation on each early release
            data-nudge={nudges % 2 === 0 ? 'even' : 'odd'}
            className={(buttonState) =>
                cx(
                    'avl-hold-button',
                    nudges > 0 && 'avl-hold-button-nudged',
                    typeof className === 'function'
                        ? className(buttonState)
                        : className
                )
            }
            style={(buttonState) =>
                ({
                    '--avl-hold-duration': `${holdDuration}ms`,
                    ...(typeof style === 'function'
                        ? style(buttonState)
                        : style),
                }) as CSSProperties
            }
            onPointerDown={(event) => {
                onPointerDown?.(event)
                if (event.button !== 0) return
                pressed.current = true
                start()
            }}
            onPointerUp={(event) => {
                onPointerUp?.(event)
                cancel()
            }}
            // Sliding off the button cancels too
            onPointerLeave={(event) => {
                onPointerLeave?.(event)
                // No click follows once the pointer is off the button
                pressed.current = false
                cancel()
            }}
            onPointerCancel={(event) => {
                onPointerCancel?.(event)
                pressed.current = false
                cancel()
            }}
            onKeyDown={(event) => {
                onKeyDown?.(event)
                if (event.key !== ' ' && event.key !== 'Enter') return
                // Stop Enter's instant click; the hold decides
                event.preventDefault()
                if (!event.repeat) start()
            }}
            onKeyUp={(event) => {
                onKeyUp?.(event)
                if (event.key !== ' ' && event.key !== 'Enter') return
                event.preventDefault()
                cancel()
            }}
            // A long press on Android opens the context menu; it's a hold here
            onContextMenu={(event) => {
                onContextMenu?.(event)
                if (state === 'holding') event.preventDefault()
            }}
            onClick={(event) => {
                onClick?.(event)
                if (pressed.current) {
                    pressed.current = false
                    return
                }
                // No press came first, so it's assistive tech, which can't
                // hold: confirm directly
                if (!disabled && state === 'idle') confirm()
            }}
        />
    )
}
