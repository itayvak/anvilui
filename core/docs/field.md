# Field, FieldDescription, FieldError

Wraps one control to add helper text, an error message and validation. The control keeps its own `label`. **There is no `FieldLabel`.**

```ts
import { Field, FieldDescription, FieldError } from 'anvilui'
import type {
    FieldProps,
    FieldDescriptionProps,
    FieldErrorProps,
} from 'anvilui'
```

## Field props (Base UI Field.Root)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | | Form field name (overrides the control's). |
| `validate` | `(value, formValues) => string \| string[] \| null \| Promise<…>` | | Return an error message, or `null` when valid. |
| `validationMode` | `'onSubmit' \| 'onBlur' \| 'onChange'` | `'onSubmit'` | When to validate. Outside a `<form>`, use `onBlur` or `onChange`. |
| `invalid` | `boolean` | | Force the invalid state (e.g. a server error). |
| `disabled` | `boolean` | | Disables the control. |

## FieldError props

| Prop | Type | Description |
| --- | --- | --- |
| `match` | `boolean \| keyof ValidityState` | Show only for one problem (`'valueMissing'`, `'typeMismatch'`, …), or `true` to show whenever invalid. |
| `children` | `ReactNode` | Message. Without it, shows the browser's or `validate`'s message. |

`FieldDescription` is helper text; hidden while an error shows.

```tsx
import { Button, Field, FieldDescription, FieldError, Input } from 'anvilui'

export function Example() {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gap: 16, width: 320 }}
        >
            <Field
                name="username"
                validate={(value) =>
                    String(value).length < 3 ? 'At least 3 characters' : null
                }
            >
                <Input label="Username" required />
                <FieldDescription>Shown on your profile.</FieldDescription>
                <FieldError match="valueMissing">Choose a username.</FieldError>
                <FieldError match="customError" />
            </Field>
            <Button type="submit">Save</Button>
        </form>
    )
}
```

Works with `Input`, `Textarea`, `DateInput`, `Select`, `Combobox`, `Checkbox`, `Switch`, `RadioGroup`, `Slider`. A required checkbox: `<Field name="terms"><label><Checkbox required /> I accept</label><FieldError match="valueMissing">Please accept the terms.</FieldError></Field>`. On a plain `<form>`, a custom `validate` only blocks submit after it has run: use `validationMode="onBlur"` or `"onChange"` (see [forms.md](forms.md)). Base UI docs: `node_modules/@base-ui/react/docs/react/components/field.md`.
