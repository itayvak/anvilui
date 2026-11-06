# Checkbox

A checkbox. **No `label` prop**: wrap it in a `<label>`.

```ts
import { Checkbox } from 'anvilui'
import type { CheckboxProps } from 'anvilui' // = Base UI Checkbox.Root props
```

## Props (Base UI Checkbox.Root)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` / `defaultChecked` | `boolean` | `false` | |
| `onCheckedChange` | `(checked: boolean, details) => void` | | Not `onChange`. |
| `indeterminate` | `boolean` | `false` | Shows a dash. |
| `name`, `value` | `string` | | For forms. |
| `required`, `disabled`, `readOnly` | `boolean` | `false` | |

Base UI docs: `node_modules/@base-ui/react/docs/react/components/checkbox.md`.

```tsx
import { useState } from 'react'
import { Checkbox } from 'anvilui'

export function Example() {
    const [agreed, setAgreed] = useState(false)
    return (
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Checkbox checked={agreed} onCheckedChange={setAgreed} />I agree to
            the terms
        </label>
    )
}
```

In a list row, put it in `ListItem`'s `start` with `render={<label />}` so the whole row toggles it ([list.md](list.md)).
