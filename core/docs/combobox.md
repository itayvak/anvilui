# Combobox, ComboboxItem

A text field that filters a list as you type and picks one item. **Children are a render function**, and `items` is the list to filter.

```ts
import { Combobox, ComboboxItem } from 'anvilui'
import type { ComboboxProps, ComboboxItemProps } from 'anvilui'
```

## Combobox props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly Item[]` | | The options. |
| `children` | `(item: Item, index: number) => ReactNode` | required | Renders one `ComboboxItem`. |
| `value` / `defaultValue` | `Item \| null` | | The picked item. |
| `onValueChange` | `(item: Item \| null, details) => void` | | |
| `inputValue` / `onInputValueChange` | `string` / `(text, details) => void` | | The typed text. |
| `itemToStringLabel` | `(item) => string` | | Required for object items. |
| `label` | `ReactNode` | | Floating label. |
| `placeholder` | `string` | | |
| `empty` | `ReactNode` | | Shown when nothing matches; without it the popup hides. |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `className` | `string` | | On the field wrapper. |
| `name`, `disabled`, `required`, `filter`, `limit` | | | Base UI Combobox.Root props. |

## ComboboxItem props

`value: Item` (required), `children` (label), `disabled`.

```tsx
import { useState } from 'react'
import { Combobox, ComboboxItem } from 'anvilui'

type User = { id: number; name: string }
const users: User[] = [
    { id: 1, name: 'Ada Lovelace' },
    { id: 2, name: 'Alan Turing' },
]
const fruits = ['Apple', 'Banana', 'Cherry']

export function Example() {
    const [user, setUser] = useState<User | null>(null)
    return (
        <div style={{ display: 'grid', gap: 16, width: 320 }}>
            <Combobox label="Fruit" items={fruits} empty="No fruit found">
                {(fruit: string) => (
                    <ComboboxItem key={fruit} value={fruit}>
                        {fruit}
                    </ComboboxItem>
                )}
            </Combobox>

            <Combobox
                label="Assignee"
                items={users}
                value={user}
                onValueChange={setUser}
                itemToStringLabel={(u: User) => u.name}
            >
                {(u: User) => (
                    <ComboboxItem key={u.id} value={u}>
                        {u.name}
                    </ComboboxItem>
                )}
            </Combobox>
        </div>
    )
}
```

Base UI docs: `node_modules/@base-ui/react/docs/react/components/combobox.md`.
