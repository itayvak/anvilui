# HoldButton

A button for destructive actions: press and hold until it fills, instead of a confirm dialog. Releasing early cancels.

```ts
import { HoldButton } from 'anvilui'
import type { HoldButtonProps } from 'anvilui'
```

## Props

All `Button` props except `loading`, plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onConfirm` | `() => void` | required | Called after holding for `holdDuration`. |
| `holdDuration` | `number` (ms) | `1500` | |

```tsx
import { HoldButton } from 'anvilui'

export function Example({ onDelete }: { onDelete: () => void }) {
    return (
        <HoldButton color="error" startIcon="delete" onConfirm={onDelete}>
            Hold to delete
        </HoldButton>
    )
}
```

- Use `onConfirm`, not `onClick` (`onClick` also fires on a short press).
- Works with Space/Enter held. Screen reader clicks, which can't hold, confirm immediately.
