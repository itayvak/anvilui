# Input

A text field with a floating label inside its border.

```ts
import { Input } from 'anvilui'
import type { InputProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | | Floating label. |
| `size` | `'small' \| 'normal'` | `'normal'` | Small's label acts as a placeholder. |
| `value` / `defaultValue` | `string` | | |
| `onValueChange` | `(value: string, details) => void` | | The string. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | | The native event also works. |
| `className` | `string` | | On the **wrapper** `<label>` (width, margins). |
| `style` | `CSSProperties` | | On the wrapper too. |
| `ref` | | | On the `<input>`. |
| everything else | `<input>` attributes | | `type`, `name`, `placeholder`, `required`, `disabled`, `autoComplete`, … go on the `<input>`. |

No `startIcon` / `endIcon` / `error` / `helperText` props. For helper and error text wrap it in a [Field](field.md). For a search bar use [Search](search.md).

```tsx
import { useState } from 'react'
import { Field, FieldError, Input } from 'anvilui'

export function Example() {
    const [email, setEmail] = useState('')
    return (
        <div style={{ display: 'grid', gap: 16, width: 320 }}>
            <Input label="Name" name="name" defaultValue="Ada" />
            <Field validationMode="onBlur">
                <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onValueChange={setEmail}
                />
                <FieldError />
            </Field>
            <Input size="small" label="Filter" />
        </div>
    )
}
```

The field is `width: 100%`-friendly: give the wrapper a width with `className` or put it in a grid.
