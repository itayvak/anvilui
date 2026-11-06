# ContextMenu

A menu that opens at the pointer on right-click (long-press on touch). Content uses `Menu`'s parts.

```ts
import { ContextMenu, ContextMenuTrigger, MenuPopup, MenuItem } from 'anvilui'
```

| Part | Renders | Notes |
| --- | --- | --- |
| `ContextMenu` | nothing (state) | `open` / `defaultOpen` / `onOpenChange` |
| `ContextMenuTrigger` | `<div>` | The area that responds to right-click; `render` to change the element. |
| `MenuPopup`, `MenuItem`, `MenuGroup`, `MenuSubmenu` | | Same as [Menu](menu.md). |

Right-click and long-press only: it can't be opened from the keyboard. Give keyboard users the same actions another way, e.g. a ⋮ [Menu](menu.md) button on each item.

Any content works inside the trigger, including `CardTitle` / `CardContent` when it renders a `Card`.

```tsx
import {
    Card,
    CardContent,
    ContextMenu,
    ContextMenuTrigger,
    MenuItem,
    MenuPopup,
} from 'anvilui'

export function Example() {
    return (
        <ContextMenu>
            <ContextMenuTrigger render={<Card />}>
                <CardContent>Right-click this card</CardContent>
            </ContextMenuTrigger>
            <MenuPopup>
                <MenuItem startIcon="content_copy">Copy</MenuItem>
                <MenuItem startIcon="delete">Delete</MenuItem>
            </MenuPopup>
        </ContextMenu>
    )
}
```
