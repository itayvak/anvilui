import { useId, type ReactNode } from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cx } from '../../utils'
import './pin-input.css'

export type PinInputProps = Omit<
    BaseOTPField.Root.Props,
    'className' | 'children' | 'size'
> & {
    /** `filled` gives each box a tinted background and a bottom line instead of a full border. @default 'outlined' */
    fillType?: 'filled' | 'outlined'
    /** Boxes are 40px tall instead of 56px. @default 'normal' */
    size?: 'small' | 'normal'
    /** Screen reader name of each box after the first. @default (index, length) => `Character ${index + 1} of ${length}` */
    slotLabel?: (index: number, length: number) => string
    /** Applied to the outer wrapper, so width and margins work as expected. */
    className?: string
} & (
        | {
              /** Visible label above the boxes. */
              label: ReactNode
              'aria-label'?: never
          }
        | {
              label?: undefined
              /** Without a visible `label`, the field needs a name for screen readers. */
              'aria-label': string
          }
    )

const defaultSlotLabel = (index: number, length: number) =>
    `Character ${index + 1} of ${length}`

/**
 * One box per character, for verification codes and PINs. Typing, paste,
 * backspace and arrow keys move between boxes. Digits only by default; set
 * `validationType` for letters. `mask` hides what's typed.
 */
export function PinInput({
    label,
    'aria-label': ariaLabel,
    fillType = 'outlined',
    size = 'normal',
    slotLabel = defaultSlotLabel,
    className,
    id,
    length,
    ...props
}: PinInputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const labelId = `${inputId}-label`

    return (
        <div
            className={cx(
                'avl-pin-input',
                `avl-pin-input-size-${size}`,
                `avl-pin-input-fill-${fillType}`,
                className
            )}
        >
            {label != null ? (
                <label
                    id={labelId}
                    htmlFor={inputId}
                    className="avl-pin-input-label"
                >
                    {label}
                </label>
            ) : (
                // Base UI ignores aria-label on the first box, but aria-labelledby
                // still reads hidden elements
                <span id={labelId} hidden>
                    {ariaLabel}
                </span>
            )}
            <BaseOTPField.Root
                {...props}
                id={inputId}
                length={length}
                aria-labelledby={labelId}
                className="avl-pin-input-slots"
            >
                {Array.from({ length }, (_, i) => (
                    <BaseOTPField.Input
                        key={i}
                        className="avl-pin-input-slot"
                        aria-label={i > 0 ? slotLabel(i, length) : undefined}
                        aria-labelledby={
                            i === 0 && label == null ? labelId : undefined
                        }
                    />
                ))}
            </BaseOTPField.Root>
        </div>
    )
}
