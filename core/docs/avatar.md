# Avatar

A picture, initials or icon for a person or thing.

```ts
import { Avatar } from 'anvilui'
import type { AvatarProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | | Image URL; the fallback shows while it loads or if it fails. |
| `name` | `string` | | Read by screen readers; its initials are the fallback ("Ada Lovelace" → "AL"). |
| `icon` | `MaterialSymbol` | `'person'` | Fallback without a `name`. |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | 32, 40 or 56px. |
| `color` | `ComponentColor` | `'primary'` | Fallback background. |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `children` | `ReactNode` | | Replaces the fallback. |

No `alt` prop: use `name`. Leave `name` out when the name is shown next to it.

```tsx
import { Avatar } from 'anvilui'

export function Example() {
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <Avatar name="Ada Lovelace" src="https://example.com/ada.jpg" />
            <Avatar name="Alan Turing" color="tonal" />
            <Avatar icon="group" size="big" color="container" />
        </div>
    )
}
```
