import type { ComponentProps } from 'react'
import {
    Button as BaseButton,
    type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import { Toggle } from '@base-ui/react/toggle'
import type { MaterialSymbol } from 'material-symbols'
import { Icon } from '../Icon/Icon'
import { cx, withClass } from '../../utils'
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
    children,
    ...props
}: InputChipProps) {
    return (
        <span
            {...props}
            className={cx(
                'avl-chip avl-input-chip',
                startIcon && 'avl-chip-has-icon',
                className
            )}
            data-disabled={disabled || undefined}
        >
            {startIcon && <Icon name={startIcon} />}
            {children}
            <BaseButton
                className="avl-input-chip-remove"
                aria-label={removeLabel}
                disabled={disabled}
                onClick={onRemove}
            >
                <Icon name="close" />
            </BaseButton>
        </span>
    )
}
