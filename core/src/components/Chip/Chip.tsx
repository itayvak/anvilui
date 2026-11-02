import { useRef, useState, type ComponentProps } from 'react'
import {
    Button as BaseButton,
    type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import { Toggle } from '@base-ui/react/toggle'
import type { MaterialSymbol } from 'material-symbols'
import { Icon } from '../Icon/Icon'
import { cx, mergeRefs, withClass } from '../../utils'
import './chip.css'

// Material's assist and suggestion chips: a compact button.
export type ChipProps = BaseButtonProps & {
    /** Material Symbol before the label. */
    startIcon?: MaterialSymbol
}

export function Chip({ startIcon, className, children, ...props }: ChipProps) {
    return (
        <BaseButton
            {...props}
            className={withClass(
                cx('avl-chip', startIcon && 'avl-chip-has-icon'),
                className
            )}
        >
            {startIcon && <Icon name={startIcon} />}
            {children}
        </BaseButton>
    )
}

// Toggles on and off: `pressed` / `defaultPressed` / `onPressedChange`.
// Shows a checkmark while on.
export type FilterChipProps = Toggle.Props

export function FilterChip({ className, children, ...props }: FilterChipProps) {
    return (
        <Toggle
            {...props}
            className={withClass('avl-chip avl-filter-chip', className)}
        >
            <Icon name="check" className="avl-filter-chip-check" />
            {children}
        </Toggle>
    )
}

// A value the user entered or picked, like a tag or a recipient, with a
// button to remove it. Not a button itself: the remove button is inside it.
export type InputChipProps = ComponentProps<'span'> & {
    /** Called when the remove (×) button is clicked. */
    onRemove: () => void
    /** Accessible name of the remove button, e.g. "Remove Alice". @default 'Remove' */
    removeLabel?: string
    /** Material Symbol before the label. */
    startIcon?: MaterialSymbol
    /** Disables the remove button and dims the chip. */
    disabled?: boolean
}

export function InputChip({
    onRemove,
    removeLabel = 'Remove',
    startIcon,
    disabled,
    className,
    ref,
    children,
    ...props
}: InputChipProps) {
    const local = useRef<HTMLSpanElement>(null)
    const [removing, setRemoving] = useState(false)

    // Shrinks and fades out first, and only then asks to be removed
    const remove = () => {
        const el = local.current
        if (!el || removing) return
        setRemoving(true)
        const exit = el.animate(collapse(el), {
            ...tokenTiming(el),
            fill: 'forwards',
        })
        exit.onfinish = () => {
            onRemove()
            // Still here a frame later: the parent kept it, so show it again
            requestAnimationFrame(() => {
                if (!el.isConnected) return
                exit.cancel()
                setRemoving(false)
            })
        }
    }

    return (
        <span
            {...props}
            ref={mergeRefs(local, ref)}
            className={cx(
                'avl-chip avl-input-chip',
                startIcon && 'avl-chip-has-icon',
                className
            )}
            data-disabled={disabled || undefined}
            data-removing={removing || undefined}
        >
            {startIcon && <Icon name={startIcon} />}
            {children}
            <BaseButton
                className="avl-input-chip-remove"
                aria-label={removeLabel}
                disabled={disabled || removing}
                onClick={remove}
            >
                <Icon name="close" />
            </BaseButton>
        </span>
    )
}

// Keyframes that shrink a chip away. Its width and the gap after it close
// up too, so the chips after it slide over instead of jumping.
function collapse(el: HTMLElement): Keyframe[] {
    const parent = el.parentElement
    const gap = parent ? parseFloat(getComputedStyle(parent).columnGap) || 0 : 0
    return [
        { width: `${el.offsetWidth}px`, opacity: 1, scale: 1 },
        {
            width: '0px',
            paddingInline: '0px',
            borderInlineWidth: '0px',
            marginInlineEnd: `${-gap}px`,
            opacity: 0,
            scale: 0.6,
        },
    ]
}

// The theme's normal duration and smooth ease, so reduced motion (which
// zeroes the durations) removes the chip straight away
function tokenTiming(el: HTMLElement) {
    const style = getComputedStyle(el)
    const length = style.getPropertyValue('--avl-ease-length-normal').trim()
    const duration = length.endsWith('ms')
        ? parseFloat(length)
        : parseFloat(length) * 1000
    return {
        duration: Number.isFinite(duration) ? duration : 300,
        easing: style.getPropertyValue('--avl-ease-smooth').trim() || 'ease',
    }
}
