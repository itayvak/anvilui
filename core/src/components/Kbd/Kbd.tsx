import { useEffect, useState, type ComponentProps, type ReactNode } from 'react'
import { cx } from '../../utils'
import './kbd.css'

export type KbdProps = ComponentProps<'kbd'> & {
    /** Press down while the user holds the key. @default true */
    listen?: boolean
    /**
     * The key that presses this one down, as a `KeyboardEvent.key` value
     * like `'k'`, `'Meta'` or `'Enter'`.
     * @default worked out from the text: 'K', '⌘', 'Ctrl', 'Esc', '↵', ...
     */
    listenFor?: string
}

/**
 * A keyboard key, for shortcuts like ⌘ K. It presses down while the user
 * holds that key on their own keyboard. Put one per key, with a `+` or a
 * space between them for combinations.
 *
 * @example
 * <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
 */
export function Kbd({
    listen = true,
    listenFor,
    className,
    children,
    ...props
}: KbdProps) {
    const key = listen ? (listenFor ?? keyFromText(children)) : null
    const pressed = useKeyHeld(key)

    return (
        <kbd
            {...props}
            data-pressed={pressed || undefined}
            className={cx('avl-kbd', className)}
        >
            {children}
        </kbd>
    )
}

// Symbols and names people write on keys, mapped to KeyboardEvent.key
const aliases: Record<string, string> = {
    '⌘': 'meta',
    cmd: 'meta',
    command: 'meta',
    win: 'meta',
    '⌥': 'alt',
    opt: 'alt',
    option: 'alt',
    '⇧': 'shift',
    '⌃': 'control',
    ctrl: 'control',
    '↵': 'enter',
    '⏎': 'enter',
    return: 'enter',
    '⎋': 'escape',
    esc: 'escape',
    '⌫': 'backspace',
    del: 'delete',
    '⇥': 'tab',
    space: ' ',
    '␣': ' ',
    '←': 'arrowleft',
    '→': 'arrowright',
    '↑': 'arrowup',
    '↓': 'arrowdown',
}

function keyFromText(children: ReactNode) {
    if (typeof children !== 'string' && typeof children !== 'number')
        return null
    const text = String(children).trim().toLowerCase()
    return aliases[text] ?? (text || null)
}

// True while `key` is held down anywhere on the page
function useKeyHeld(key: string | null) {
    const [held, setHeld] = useState(false)

    useEffect(() => {
        if (!key) return
        const target = key.toLowerCase()
        const matches = (event: KeyboardEvent) =>
            event.key.toLowerCase() === target
        const down = (event: KeyboardEvent) => {
            if (matches(event)) setHeld(true)
        }
        const up = (event: KeyboardEvent) => {
            // macOS sends no keyup for other keys while ⌘ is held, so
            // letting go of ⌘ releases everything
            if (matches(event) || event.key === 'Meta') setHeld(false)
        }
        // Switching windows mid-press never sends the keyup
        const release = () => setHeld(false)

        document.addEventListener('keydown', down)
        document.addEventListener('keyup', up)
        window.addEventListener('blur', release)
        return () => {
            document.removeEventListener('keydown', down)
            document.removeEventListener('keyup', up)
            window.removeEventListener('blur', release)
            setHeld(false)
        }
    }, [key])

    return held
}
