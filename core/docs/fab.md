# FAB

The floating action button: the screen's main action. You position it (usually `position: fixed`, bottom-end).

```ts
import { FAB } from 'anvilui'
import type { FABProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `MaterialSymbol` | required | |
| `label` | `string` | | Visible text: makes it an extended FAB. |
| `aria-label` | `string` | required without `label` | |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | 40, 56 or 96px. |
| `color` | `ComponentColor` | `'primary'` | |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `sticky` | `boolean` | `true` | Drifts toward a nearby mouse cursor. |

Takes no children. Also Base UI Button props.

```tsx
import { FAB } from 'anvilui'

export function Example() {
    return (
        <>
            <FAB
                icon="edit"
                aria-label="Compose"
                style={{ position: 'fixed', insetInlineEnd: 16, bottom: 16 }}
            />
            <FAB icon="add" label="New task" color="tonal" />
        </>
    )
}
```

`sticky` only adds a small `translate` toward the cursor, so it works with any `position` you set.

For a FAB that opens several actions, use [FABMenu](fab-menu.md).
