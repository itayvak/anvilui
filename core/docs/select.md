# Select, SelectItem

A dropdown to pick one option (or several with `multiple`). Looks like `Input`.

```ts
import { Select, SelectItem } from 'anvilui'
import type { SelectProps, SelectItemProps } from 'anvilui'
```

## Select props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `SelectItem`s | | |
| `items` | `Record<string, ReactNode>` or `{ value, label }[]` | | **Pass it** so the field shows the label, not the raw value. |
| `value` / `defaultValue` | `Value \| null` (array with `multiple`) | | |
| `onValueChange` | `(value: Value \| null, details) => void` | | The value, not an event. |
| `label` | `ReactNode` | | Floating label. |
| `placeholder` | `ReactNode` | | Shown when nothing is selected. |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `multiple` | `boolean` | `false` | |
| `name`, `required`, `disabled`, `readOnly` | | | |
| `open` / `defaultOpen` / `onOpenChange` | | | |
| `itemToStringLabel` | `(value) => string` | | For object values. |
| `className` | `string` | | On the field wrapper. |

Other props go to Base UI `Select.Root`, which renders no element: `id`, `style` and `ref` are not applied. Base UI docs: `node_modules/@base-ui/react/docs/react/components/select.md`.

## SelectItem props

`value` (required), `children` (the label), `disabled`.

```tsx
import { useState } from 'react'
import { Select, SelectItem } from 'anvilui'

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
]

export function Example() {
    const [country, setCountry] = useState<string | null>('fr')
    return (
        <Select
            label="Country"
            items={countries}
            value={country}
            onValueChange={setCountry}
            className="country-field"
        >
            {countries.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                    {c.label}
                </SelectItem>
            ))}
        </Select>
    )
}
```

- No `SelectTrigger`, `SelectContent` or `SelectValue` parts: `Select` renders the field and the popup. Only items go inside.
- For a searchable list use [Combobox](combobox.md).
