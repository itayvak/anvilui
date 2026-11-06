# Kbd

A keyboard key for shortcuts. It presses down while the user holds that key. One `Kbd` per key.

```ts
import { Kbd } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | Key text: `'K'`, `'⌘'`, `'Ctrl'`, `'Esc'`, `'↵'`, … |
| `listen` | `boolean` | `true` | Press down while held. |
| `listenFor` | `string` | from the text | A `KeyboardEvent.key` value. |

```tsx
import { Kbd } from 'anvilui'

export function Example() {
    return (
        <span>
            Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search
        </span>
    )
}
```
