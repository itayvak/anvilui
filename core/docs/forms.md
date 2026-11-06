# Forms

Controls are plain form elements: give them `name` and read them with `FormData`, or control them with state. `Field` adds helper text, error messages and validation to one control.

```tsx
import {
    Button,
    Checkbox,
    Field,
    FieldDescription,
    FieldError,
    Input,
    Select,
    SelectItem,
    Switch,
    Textarea,
} from 'anvilui'

const roles = { viewer: 'Viewer', editor: 'Editor', admin: 'Admin' }

export function SignupForm() {
    return (
        <form
            style={{ display: 'grid', gap: 16, maxWidth: 400 }}
            onSubmit={(event) => {
                event.preventDefault()
                const data = new FormData(event.currentTarget)
                console.log(Object.fromEntries(data))
            }}
        >
            <Field name="email">
                <Input label="Email" type="email" required />
                <FieldDescription>
                    We'll send a confirmation link.
                </FieldDescription>
                <FieldError />
            </Field>

            <Field name="role">
                <Select label="Role" items={roles} defaultValue="viewer">
                    {Object.entries(roles).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </Select>
            </Field>

            <Textarea label="About you" name="bio" rows={3} />

            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Switch name="newsletter" defaultChecked />
                Send me the newsletter
            </label>

            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Checkbox name="terms" required />I accept the terms
            </label>

            <Button type="submit">Sign up</Button>
        </form>
    )
}
```

Rules:

- **`Button` defaults to `type="button"`.** Pass `type="submit"` to submit a form.
- Text fields (`Input`, `Textarea`, `Select`, `Combobox`, `DateInput`, `TimePicker`) take their own `label`. There is no `FieldLabel` or `Label` component.
- `Checkbox`, `Switch` and `Radio` have **no `label` prop**. Wrap them in a `<label>` with the text.
- Put the `name` on `Field` (or on the control when there's no Field).
- Native rules (`required`, `type="email"`, `minLength`, `pattern`, …) block a plain `<form>`'s submit and show in `FieldError`. This includes `<Checkbox required />` and `<DateInput required />`.
- Custom rules: `validate={(value) => value ? null : 'Required'}` returns an error string or `null`. A failing `validate` blocks submit once it has run, so on a plain `<form>` use `validationMode="onBlur"` or `"onChange"` with it (the default is `"onSubmit"`). Keep a final check in `onSubmit` for anything that must hold.
- Controls that work inside `Field`: `Input`, `Textarea`, `DateInput`, `Select`, `Combobox`, `Checkbox`, `Switch`, `RadioGroup`, `Slider`.
- `Button loading` disables the button, so it also blocks repeat submits.
- `Select` with `name` submits the item's `value`, not its label.
- Server errors: `<Field invalid>` plus `<FieldError match>` with your message (`match` true shows it whenever the field is invalid).
- Values: `DateInput` and `Calendar` use `"YYYY-MM-DD"`, `TimePicker` `"HH:mm"`, `Slider` a number (or `number[]`).
- There is no form library integration and no `Form` component. A plain `<form>` works. With react-hook-form, use controlled props (`value` + `onValueChange` / `checked` + `onCheckedChange`) in `Controller`.

See [field.md](field.md), [input.md](input.md), [select.md](select.md), [checkbox.md](checkbox.md).
