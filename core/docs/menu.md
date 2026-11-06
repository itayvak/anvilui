# Menu

A dropdown menu of actions.

```ts
import {
    Menu,
    MenuTrigger,
    MenuPopup,
    MenuItem,
    MenuGroup,
    MenuSubmenu,
    MenuSubmenuTrigger,
} from 'anvilui'
```

## Parts

| Part | Renders | Props |
| --- | --- | --- |
| `Menu` | nothing (state) | `open` / `defaultOpen` / `onOpenChange`, `modal`, `openOnHover` |
| `MenuTrigger` | bare `<button>` | `render={<Button />}` or `render={<IconButton icon="more_vert" aria-label="More" />}` |
| `MenuPopup` | portal + positioner + panel | `side` (default `'bottom'`), `align` (`'start' \| 'center' \| 'end'`), `sideOffset`, `alignOffset` |
| `MenuItem` | menu item | `onClick`, `startIcon`, `endIcon`, `disabled`, `closeOnClick` (default `true`), `render` |
| `MenuGroup` | group | Separates items into blocks (use it instead of a separator). |
| `MenuSubmenu` | nothing (state) | Contains a `MenuSubmenuTrigger` and a `MenuPopup`. |
| `MenuSubmenuTrigger` | item with an arrow | `startIcon`, children |

There is **no** `MenuContent`, `MenuSeparator`, `MenuLabel`, `MenuCheckboxItem` or `DropdownMenu`. Use `onClick` on `MenuItem` (there is no `onSelect`).

## Example

```tsx
import {
    IconButton,
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuTrigger,
} from 'anvilui'

export function FileMenu({ onDelete }: { onDelete: () => void }) {
    return (
        <Menu>
            <MenuTrigger
                render={
                    <IconButton
                        icon="more_vert"
                        aria-label="More actions"
                        fillType="text"
                        color="container"
                    />
                }
            />
            <MenuPopup align="end">
                <MenuGroup>
                    <MenuItem
                        startIcon="edit"
                        onClick={() => console.log('rename')}
                    >
                        Rename
                    </MenuItem>
                    <MenuItem startIcon="content_copy">Duplicate</MenuItem>
                    <MenuSubmenu>
                        <MenuSubmenuTrigger startIcon="drive_file_move">
                            Move to
                        </MenuSubmenuTrigger>
                        <MenuPopup>
                            <MenuItem>Archive</MenuItem>
                            <MenuItem>Trash</MenuItem>
                        </MenuPopup>
                    </MenuSubmenu>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem startIcon="delete" onClick={onDelete}>
                        Delete
                    </MenuItem>
                </MenuGroup>
            </MenuPopup>
        </Menu>
    )
}
```

Links in a menu: `<MenuItem render={<a href="/settings" />}>Settings</MenuItem>`. Right-click menus: [context-menu.md](context-menu.md). A row of menus: [menubar.md](menubar.md). Base UI docs: `node_modules/@base-ui/react/docs/react/components/menu.md`.
