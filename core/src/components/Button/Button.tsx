import { useLayoutEffect, useRef } from 'react'
import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import type { MaterialSymbol } from 'material-symbols'
import {
    ComponentColor,
    ComponentFillType,
    colorClass,
} from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { mergeRefs, withClass } from '../../utils'
import './button.css'

export type ButtonProps = BaseButtonProps & {
    size?: 'small' | 'normal' | 'big'
    fillType?: ComponentFillType
    color?: ComponentColor
    startIcon?: MaterialSymbol
    endIcon?: MaterialSymbol
    /**
     * Shows a spinner in place of `startIcon` and ignores clicks. Pass the
     * text to show meanwhile as children (`{saving ? 'Saving' : 'Save'}`);
     * the button animates between the two widths. @default false
     */
    loading?: boolean
}

export function Button({
    size,
    fillType,
    color,
    startIcon,
    endIcon,
    loading,
    disabled,
    children,
    className,
    ref,
    ...props
}: ButtonProps) {
    const local = useRef<HTMLButtonElement>(null)
    // Only buttons that use `loading` resize smoothly; the rest skip the
    // measuring
    useAnimatedWidth(local, loading !== undefined)

    return (
        <BaseButton
            {...props}
            ref={mergeRefs(local, ref)}
            disabled={disabled || loading}
            // Keeps focus on it while loading, instead of dropping it to
            // <body>. An explicit `disabled` still wins and dims it.
            focusableWhenDisabled={
                (loading && !disabled) || props.focusableWhenDisabled
            }
            aria-busy={loading || undefined}
            className={withClass(
                `avl-button ${colorClass(color, fillType)} avl-button-size-${size || 'normal'}`,
                className
            )}
        >
            {loading ? (
                <svg
                    className="avl-button-spinner"
                    viewBox="0 0 24 24"
                    aria-hidden
                >
                    <circle cx="12" cy="12" r="8" pathLength={100} />
                </svg>
            ) : (
                startIcon && <Icon name={startIcon} />
            )}
            {children}
            {endIcon && <Icon name={endIcon} />}
        </BaseButton>
    )
}

// Width can't transition between two "as wide as the content" sizes in CSS,
// so after each render compare the new width with the old one and animate
// between them
function useAnimatedWidth(
    ref: React.RefObject<HTMLButtonElement | null>,
    enabled: boolean
) {
    const lastWidth = useRef<number | null>(null)
    const running = useRef<Animation | null>(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el || !enabled) return
        // Changed again mid-animation: carry on from where it is now
        const from =
            running.current?.playState === 'running'
                ? el.offsetWidth
                : lastWidth.current
        running.current?.cancel()
        const to = el.offsetWidth
        lastWidth.current = to
        if (from == null || Math.abs(from - to) < 1) return

        const style = getComputedStyle(el)
        const length = style.getPropertyValue('--avl-ease-length-normal').trim()
        const animation = el.animate(
            { width: [`${from}px`, `${to}px`] },
            {
                duration:
                    (parseFloat(length) || 0) *
                    (length.endsWith('ms') ? 1 : 1000),
                easing: style.getPropertyValue('--avl-ease-out'),
            }
        )
        running.current = animation
        // While it's narrower than its content: clip, rather than wrap the
        // text onto two lines
        el.style.overflow = 'hidden'
        el.style.whiteSpace = 'nowrap'
        const done = () => {
            // A newer animation owns these styles now
            if (running.current !== animation) return
            el.style.overflow = ''
            el.style.whiteSpace = ''
        }
        animation.onfinish = done
        animation.oncancel = done
    })
}
