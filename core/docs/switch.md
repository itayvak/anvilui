# Switch

An on/off switch. **No `label` prop**: wrap it in a `<label>`.

```ts
import { Switch } from 'anvilui'
import type { SwitchProps } from 'anvilui' // = Base UI Switch.Root props
```

## Props (Base UI Switch.Root)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` / `defaultChecked` | `boolean` | `false` | |
| `onCheckedChange` | `(checked: boolean, details) => void` | | Not `onChange`. |
| `name`, `value` | `string` | | For forms. |
| `required`, `disabled`, `readOnly` | `boolean` | `false` | |

```tsx
import { useState } from 'react'
import { List, ListItem, Switch } from 'anvilui'

export function Example() {
    const [wifi, setWifi] = useState(true)
    return (
        <>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Switch checked={wifi} onCheckedChange={setWifi} />
                Wi-Fi
            </label>

            {/* Settings row: clicking anywhere on the row toggles it */}
            <List>
                <ListItem
                    label="Notifications"
                    description="Push and email"
                    end={<Switch defaultChecked />}
                    render={<label />}
                />
            </List>
        </>
    )
}
```
