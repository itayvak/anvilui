# Toggle

A button that stays on or off (Bold, Favorite). Sets `aria-pressed`. Off it's neutral; on it fills with `color`.

```ts
import { Toggle } from 'anvilui'
import type { ToggleProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed` / `defaultPressed` | `boolean` | `false` | On state. |
| `onPressedChange` | `(pressed: boolean, details) => void` | | |
| `color` | `ComponentColor` | `'primary'` | Color while on. |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | Look while off. |
| `children` | `ReactNode` | | Label (text toggle). |
| `startIcon`, `endIcon` | `MaterialSymbol` | | Text toggle only. |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | Text toggle only. |
| `icon` | `MaterialSymbol` | | Makes it a round icon toggle. Requires `aria-label`; no children or size. |
| `value` | `string` | | Identifies it in a Base UI ToggleGroup. |

Either `children` or `icon` + `aria-label`, not both.

```tsx
import { useState } from 'react'
import { Toggle } from 'anvilui'

export function Example() {
    const [favorite, setFavorite] = useState(false)
    return (
        <>
            <Toggle startIcon="format_bold" defaultPressed>
                Bold
            </Toggle>
            <Toggle
                icon="favorite"
                aria-label="Favorite"
                color="error"
                pressed={favorite}
                onPressedChange={setFavorite}
            />
        </>
    )
}
```

For a row of exclusive options use [ToggleGroup](toggle-group.md). For filter chips use `FilterChip` ([chip.md](chip.md)).
