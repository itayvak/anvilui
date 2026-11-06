# Dialog

A modal dialog.

```ts
import {
    Dialog,
    DialogTrigger,
    DialogPopup,
    DialogTitle,
    DialogDescription,
    DialogActions,
    DialogClose,
} from 'anvilui'
import type {
    DialogProps,
    DialogTriggerProps,
    DialogPopupProps,
    DialogTitleProps,
    DialogDescriptionProps,
    DialogActionsProps,
    DialogCloseProps,
} from 'anvilui'
```

## Parts

| Part | Renders | Notes |
| --- | --- | --- |
| `Dialog` | nothing (state) | `open` / `defaultOpen` / `onOpenChange(open, details)`, `modal` (default `true`), `disablePointerDismissal`, `morph` |
| `DialogTrigger` | bare `<button>` | `render={<Button />}` to style it. Optional when controlled. |
| `DialogPopup` | portal + backdrop + the dialog box | Put everything else inside. |
| `DialogTitle` | `<h2>` | Required for accessibility. |
| `DialogDescription` | `<p>` | |
| `DialogActions` | `<div>` | The button row at the bottom (the "footer"). |
| `DialogClose` | bare `<button>` | `render={<Button fillType="text" />}`. |

There is **no** `DialogContent`, `DialogOverlay`, `DialogPortal`, `DialogHeader` or `DialogFooter`.

`morph` (boolean, default `false`): the dialog grows out of its trigger, best when the trigger is a surface like a clickable `Card`.

## Example

```tsx
import { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    Input,
} from 'anvilui'

export function DeleteDialog({ onDelete }: { onDelete: () => void }) {
    return (
        <Dialog>
            <DialogTrigger render={<Button color="error" startIcon="delete" />}>
                Delete
            </DialogTrigger>
            <DialogPopup>
                <DialogTitle>Delete project?</DialogTitle>
                <DialogDescription>This can't be undone.</DialogDescription>
                <DialogActions>
                    <DialogClose render={<Button fillType="text" />}>
                        Cancel
                    </DialogClose>
                    <DialogClose
                        render={<Button color="error" />}
                        onClick={onDelete}
                    >
                        Delete
                    </DialogClose>
                </DialogActions>
            </DialogPopup>
        </Dialog>
    )
}

// Controlled: open it from anywhere, close it after an async action
export function RenameDialog() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)}>Rename</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogPopup>
                    <DialogTitle>Rename</DialogTitle>
                    <Input label="Name" autoFocus />
                    <DialogActions>
                        <DialogClose render={<Button fillType="text" />}>
                            Cancel
                        </DialogClose>
                        <Button onClick={() => setOpen(false)}>Save</Button>
                    </DialogActions>
                </DialogPopup>
            </Dialog>
        </>
    )
}
```

Opening from a `MenuItem`: control the dialog (`open` state) and set it in the item's `onClick`; don't nest the Dialog inside the menu popup. Base UI docs: `node_modules/@base-ui/react/docs/react/components/dialog.md`.
