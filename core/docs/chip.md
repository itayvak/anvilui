# Chip, FilterChip, InputChip

Compact elements for actions, filters and entered values.

```ts
import { Chip, FilterChip, InputChip } from 'anvilui'
import type { ChipProps, FilterChipProps, InputChipProps } from 'anvilui'
```

| Component | Is | Own props |
| --- | --- | --- |
| `Chip` | a button (suggestion / quick action) | `startIcon?: MaterialSymbol`; Base UI Button props |
| `FilterChip` | an on/off toggle with a checkmark | `pressed` / `defaultPressed` / `onPressedChange(pressed, details)`; Base UI Toggle props |
| `InputChip` | a removable value (`<span>`) | `onRemove: () => void` (required), `removeLabel?: string` (default `'Remove'`), `startIcon?`, `disabled?` |

Chips have no `color`, `fillType` or `size` props.

```tsx
import { useState } from 'react'
import { Chip, FilterChip, InputChip } from 'anvilui'

export function Example() {
    const [vegan, setVegan] = useState(false)
    const [tags, setTags] = useState(['react', 'design'])
    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip startIcon="event" onClick={() => console.log('added')}>
                Add to calendar
            </Chip>
            <FilterChip pressed={vegan} onPressedChange={setVegan}>
                Vegan
            </FilterChip>
            {tags.map((tag) => (
                <InputChip
                    key={tag}
                    removeLabel={`Remove ${tag}`}
                    onRemove={() => setTags(tags.filter((t) => t !== tag))}
                >
                    {tag}
                </InputChip>
            ))}
        </div>
    )
}
```

- `InputChip` animates out, then calls `onRemove`. Remove the item from your state there; if you keep it, the chip reappears.
- Lay chips out in a flex row with `gap`.
