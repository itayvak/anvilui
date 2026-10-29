import type { ReactNode } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cx } from '../../utils'
import './input.css'

export type InputProps = Omit<BaseInput.Props, 'className' | 'size'> & {
    /** Floating label. Sits inside the field and moves onto the border once it has focus or a value. */
    label?: ReactNode
    /**
     * `small` is shorter, and its label works like a placeholder: it hides
     * once there's text instead of moving onto the border. @default 'normal'
     */
    size?: 'small' | 'normal'
    /** Applied to the outer wrapper, so width and margins work as expected. */
    className?: string
}

export function Input({
    label,
    size = 'normal',
    className,
    placeholder,
    ...props
}: InputProps) {
    return (
        <label
            className={cx(
                'avl-input',
                `avl-input-size-${size}`,
                label != null && 'avl-input-labeled',
                className
            )}
        >
            {/* A placeholder is needed for :placeholder-shown, which floats the label. */}
            <BaseInput
                {...props}
                placeholder={placeholder ?? ' '}
                className="avl-input-field"
            />
            {label != null && <span className="avl-input-label">{label}</span>}
            {/* The border. Its <legend> holds a hidden copy of the label so the
                browser cuts a gap in the border exactly as wide as the label. */}
            <fieldset aria-hidden className="avl-input-outline">
                <legend>
                    {label != null && size === 'normal' && <span>{label}</span>}
                </legend>
            </fieldset>
        </label>
    )
}
