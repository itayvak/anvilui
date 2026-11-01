import { Field as BaseField } from '@base-ui/react/field'
import { withClass } from '../../utils'
import './field.css'

/**
 * Wraps one control (`Input`, `Textarea`, `Select`, ...) to add helper text,
 * an error message and validation. Takes `name`, `validate`, `invalid`,
 * `disabled` and `validationMode`.
 *
 * Validation runs on form submit by default. Outside a `<form>`, or to check
 * earlier, set `validationMode="onBlur"` or `"onChange"`.
 */
export type FieldProps = BaseField.Root.Props

export function Field({ className, ...props }: FieldProps) {
    return (
        <BaseField.Root
            {...props}
            className={withClass('avl-field', className)}
        />
    )
}

// Helper text under the control. Hidden while a FieldError is showing.
export type FieldDescriptionProps = BaseField.Description.Props

export function FieldDescription({
    className,
    ...props
}: FieldDescriptionProps) {
    return (
        <BaseField.Description
            {...props}
            className={withClass('avl-field-description', className)}
        />
    )
}

// Shows while the field is invalid. Without children it shows the browser's
// message or the one `validate` returned. Pass `match` (e.g. "valueMissing")
// to show it only for one kind of problem.
export type FieldErrorProps = BaseField.Error.Props

export function FieldError({ className, ...props }: FieldErrorProps) {
    return (
        <BaseField.Error
            {...props}
            className={withClass('avl-field-error', className)}
        />
    )
}
