# useSnackbar

Snackbars (toasts) at the bottom of the screen. **A hook, not a component.** AnvilRoot already renders the viewport: don't add a `<Snackbar>`, `<Toaster>` or provider.

```ts
import { useSnackbar } from 'anvilui'
import type { SnackbarOptions } from 'anvilui'

const snackbar = useSnackbar()
snackbar.show(options: SnackbarOptions): string // returns the id
snackbar.close(id?: string): void               // no id closes all
```

## SnackbarOptions

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `ReactNode` | required | One or two lines. |
| `action` | `{ label: ReactNode; onClick: () => void }` | | One text button, e.g. Undo. Closes the snackbar. |
| `closeButton` | `boolean` | `false` | Show ×. |
| `timeout` | `number` (ms) | `5000` | `0` stays open. |
| `priority` | `'low' \| 'high'` | `'low'` | `high` is announced immediately. |
| `onClose` | `() => void` | | |

There is no `type` / `variant` / `severity` (success, error). Put the meaning in the message.

```tsx
import { Button, useSnackbar } from 'anvilui'

export function SaveButton() {
    const snackbar = useSnackbar()
    return (
        <Button
            onClick={() =>
                snackbar.show({
                    message: 'Draft saved',
                    action: {
                        label: 'Undo',
                        onClick: () => console.log('undo'),
                    },
                })
            }
        >
            Save
        </Button>
    )
}
```

Call `useSnackbar()` in a component **inside** `<AnvilRoot>`, not in the component that renders it. Up to 3 stack; a 4th pushes out the oldest.
