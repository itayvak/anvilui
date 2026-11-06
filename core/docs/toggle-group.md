# ToggleGroup

A segmented control: a row of options with a sliding selection pill. One selected by default; `multiple` for several.

```ts
import { ToggleGroup, ToggleGroupItem } from 'anvilui'
import type { ToggleGroupProps, ToggleGroupItemProps } from 'anvilui'
```

## ToggleGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | single: `Value`; multiple: `string[]` | | **Single mode takes one value, not an array.** |
| `onValueChange` | single: `(value: Value, details) => void`; multiple: `(value: string[], details) => void` | | |
| `multiple` | `boolean` | `false` | Allow several on at once. |
| `color` | `ComponentColor` | `'primary'` | |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | |
| `disabled` | `boolean` | | |
| `aria-label` / `aria-labelledby` | `string` | | Name the group (both are passed through). |

Single mode is a Base UI RadioGroup; multiple mode is a Base UI ToggleGroup. `Value` is inferred from `value`, so a union-typed `useState<'list' | 'grid'>` setter can be passed straight to `onValueChange`.

## ToggleGroupItem props

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `Value` (string in `multiple`) | Required. |
| `children` | `ReactNode` | Label. |
| `startIcon`, `endIcon` | `MaterialSymbol` | |
| `disabled` | `boolean` | |

## Example

```tsx
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from 'anvilui'

export function Example() {
    const [view, setView] = useState('list')
    const [days, setDays] = useState<string[]>(['mon'])
    return (
        <>
            <ToggleGroup aria-label="View" value={view} onValueChange={setView}>
                <ToggleGroupItem value="list" startIcon="list">
                    List
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" startIcon="grid_view">
                    Grid
                </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
                multiple
                aria-label="Days"
                value={days}
                onValueChange={setDays}
                fillType="outlined"
            >
                <ToggleGroupItem value="mon">Mon</ToggleGroupItem>
                <ToggleGroupItem value="tue">Tue</ToggleGroupItem>
                <ToggleGroupItem value="wed">Wed</ToggleGroupItem>
            </ToggleGroup>
        </>
    )
}
```

Use it for 2–5 short options. For longer lists use [RadioGroup](radio-group.md) or [Select](select.md).
