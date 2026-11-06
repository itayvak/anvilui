# Skeleton

A pulsing placeholder while content loads. Hidden from screen readers; put `aria-busy` on the loading region.

```ts
import { Skeleton } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | |
| `animation` | `'pulse' \| 'none'` | `'pulse'` | |

Size it with `style` (`width`, `height`). No `width` / `height` props. Renders a `<span>`.

```tsx
import { Skeleton } from 'anvilui'

export function Example() {
    return (
        <div
            aria-busy="true"
            style={{ display: 'flex', gap: 12, alignItems: 'center' }}
        >
            <Skeleton variant="circular" style={{ width: 40, height: 40 }} />
            <div style={{ display: 'grid', gap: 4, flex: 1 }}>
                <Skeleton style={{ width: '40%' }} />
                <Skeleton style={{ width: '70%' }} />
            </div>
        </div>
    )
}
```
