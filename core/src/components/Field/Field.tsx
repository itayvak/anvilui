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

/**
 * Wraps one control to add helper text, an error message and validation.
 * The control keeps its own `label`; there is no FieldLabel.
 *
 * @example
 * <Field name="email" validationMode="onBlur">
 *     <Input label="Email" type="email" required />
 *     <FieldDescription>We never share it.</FieldDescription>
 *     <FieldError />
 * </Field>
 */
export function Field({ className, ...props }: FieldProps) {
    return (
        <BaseField.Root
            {...props}
            className={withClass('avl-field', className)}
        />
    )
}

export type FieldDescriptionProps = BaseField.Description.Props

/** Helper text under the control. Hidden while a FieldError is showing. */
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

export type FieldErrorProps = BaseField.Error.Props

/**
 * Shows while the field is invalid. Without children it shows the browser's
 * message or the one `validate` returned. Pass `match` (e.g. "valueMissing")
 * to show it only for one kind of problem.
 *
 * @example
 * <FieldError match="valueMissing">Enter your email.</FieldError>
 */
export function FieldError({ className, ...props }: FieldErrorProps) {
    return (
        <BaseField.Error
            {...props}
            className={withClass('avl-field-error', className)}
        />
    )
}
