# RadioGroup, Radio

Pick exactly one option. State lives on the group; each `Radio` has a `value`. **`Radio` has no `label` prop**: wrap it in a `<label>`.

```ts
import { RadioGroup, Radio } from 'anvilui'
import type { RadioGroupProps, RadioProps } from 'anvilui'
```

## RadioGroup props (Base UI RadioGroup)

| Prop | Type | Description |
| --- | --- | --- |
| `value` / `defaultValue` | `Value` | The picked radio's value. |
| `onValueChange` | `(value: Value, details) => void` | |
| `name`, `required`, `disabled`, `readOnly` | | |
| `aria-label` / `aria-labelledby` | `string` | Name the group. |

## Radio props (Base UI Radio.Root)

`value: Value` (required), `disabled?: boolean`.

```tsx
import { useState } from 'react'
import { Radio, RadioGroup } from 'anvilui'

export function Example() {
    const [plan, setPlan] = useState('free')
    return (
        <RadioGroup
            aria-label="Plan"
            value={plan}
            onValueChange={setPlan}
            style={{ display: 'grid', gap: 8 }}
        >
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Radio value="free" /> Free
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Radio value="pro" /> Pro
            </label>
        </RadioGroup>
    )
}
```

For a compact row of 2–5 options, [ToggleGroup](toggle-group.md) looks better.
