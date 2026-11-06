# Sticker

A small tilted label like a die-cut sticker ("NEW", "BETA"). Straightens on hover. Renders a `<span>`.

```ts
import { Sticker } from 'anvilui'
```

| Prop | Type | Default |
| --- | --- | --- |
| `color` | `ComponentColor` | `'primary'` |
| `startIcon` | `MaterialSymbol` | |
| `tilt` | `number` (degrees) | `-4` |

```tsx
import { Sticker } from 'anvilui'

export function Example() {
    return (
        <Sticker color="warning" startIcon="bolt">
            NEW
        </Sticker>
    )
}
```

For status labels in tables or lists, a `Chip` or plain text fits better; Sticker is decorative.
