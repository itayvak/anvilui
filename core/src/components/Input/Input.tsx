import type { CSSProperties, ReactNode } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cx } from '../../utils'
import { useContext } from 'react'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { checkRoot, OUTSIDE_ROOT } from '../../dev'
import './input.css'

export type InputProps = Omit<
    BaseInput.Props,
    'className' | 'style' | 'size'
> & {
    /** Applied to the outer wrapper, with `className`. */
    style?: CSSProperties
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

/**
 * A text field with a floating label. `value` / `defaultValue` with either
 * `onChange` (event) or `onValueChange` (string). `className` goes on the
 * wrapper; `ref` and other props go on the `<input>`. Wrap it in a `Field`
 * for helper text and validation.
 *
 * @example
 * <Input label="Email" type="email" value={email} onValueChange={setEmail} />
 */
export function Input({
    label,
    size = 'normal',
    className,
    style,
    placeholder,
    ...props
}: InputProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Input', OUTSIDE_ROOT)
    }
    return (
        <label
            style={style}
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
