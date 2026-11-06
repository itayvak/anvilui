# BottomSheet

A panel that slides up from the bottom; swipe down or tap outside to close.

```ts
import {
    BottomSheet,
    BottomSheetTrigger,
    BottomSheetPopup,
    BottomSheetTitle,
    BottomSheetDescription,
    BottomSheetClose,
} from 'anvilui'
```

| Part | Renders | Notes |
| --- | --- | --- |
| `BottomSheet` | nothing (state) | `open` / `defaultOpen` / `onOpenChange`, `snapPoints` (e.g. `[0.5, 1]`), plus Base UI Drawer.Root props |
| `BottomSheetTrigger` | bare `<button>` | `render={<Button />}` |
| `BottomSheetPopup` | portal + backdrop + sheet + drag handle | Already padded; children scroll. |
| `BottomSheetTitle` | `<h2>` | Names the sheet. |
| `BottomSheetDescription` | `<p>` | |
| `BottomSheetClose` | bare `<button>` | |

```tsx
import {
    BottomSheet,
    BottomSheetPopup,
    BottomSheetTitle,
    BottomSheetTrigger,
    Button,
    List,
    ListItem,
    Icon,
} from 'anvilui'

export function ShareSheet() {
    return (
        <BottomSheet>
            <BottomSheetTrigger render={<Button startIcon="share" />}>
                Share
            </BottomSheetTrigger>
            <BottomSheetPopup>
                <BottomSheetTitle>Share</BottomSheetTitle>
                <List>
                    <ListItem
                        label="Copy link"
                        start={<Icon name="link" />}
                        render={<button type="button" />}
                    />
                    <ListItem
                        label="Email"
                        start={<Icon name="mail" />}
                        render={<button type="button" />}
                    />
                </List>
            </BottomSheetPopup>
        </BottomSheet>
    )
}
```

There is no actions part: for buttons at the bottom use your own row, e.g. `<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><BottomSheetClose render={<Button fillType="text" />}>Cancel</BottomSheetClose><Button type="submit">Add</Button></div>`. To close it after a form submit, control it with `open` / `onOpenChange`.

Base UI docs: `node_modules/@base-ui/react/docs/react/components/drawer.md`.
