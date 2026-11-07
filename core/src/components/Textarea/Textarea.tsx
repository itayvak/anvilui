import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cx } from '../../utils'
import '../Input/input.css'
import './textarea.css'

export type TextareaProps = Omit<
    ComponentProps<'textarea'>,
    'className' | 'style'
> & {
    /** Applied to the outer wrapper, with `className`. */
    style?: CSSProperties
} & Pick<BaseInput.Props, 'onValueChange'> & {
        /** Floating label. Sits on the first line and moves onto the border once it has focus or a value. */
        label?: ReactNode
        /**
         * `small` has less padding, and its label works like a placeholder: it
         * hides once there's text instead of moving onto the border. @default 'normal'
         */
        size?: 'small' | 'normal'
        /** Applied to the outer wrapper, so width and margins work as expected. */
        className?: string
    }

/**
 * A multi-line text field with a floating label. Same API as `Input`:
 * `onChange` (event) or `onValueChange` (string); `className` goes on the
 * wrapper, other props on the `<textarea>`.
 *
 * @example
 * <Textarea label="Bio" rows={4} defaultValue="" />
 */
export function Textarea({
    label,
    size = 'normal',
    className,
    style,
    placeholder,
    ...props
}: TextareaProps) {
    return (
        <label
            style={style}
            className={cx(
                'avl-input',
                'avl-textarea',
                `avl-input-size-${size}`,
                label != null && 'avl-input-labeled',
                className
            )}
        >
            {/* Base UI's Input is typed for <input>, but renders any element and
                keeps Field integration, so a <textarea> works at runtime. */}
            <BaseInput
                {...(props as BaseInput.Props)}
                render={<textarea />}
                placeholder={placeholder ?? ' '}
                className="avl-input-field"
            />
            {label != null && <span className="avl-input-label">{label}</span>}
            <fieldset aria-hidden className="avl-input-outline">
                <legend>
                    {label != null && size === 'normal' && <span>{label}</span>}
                </legend>
            </fieldset>
        </label>
    )
}
