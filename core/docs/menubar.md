# Menubar

A row of menus, like File / Edit / View. Put one `Menu` per entry inside.

```ts
import { Menubar, Menu, MenuTrigger, MenuPopup, MenuItem } from 'anvilui'
import type { MenubarProps } from 'anvilui' // Base UI Menubar props
```

```tsx
import { Menu, Menubar, MenuItem, MenuPopup, MenuTrigger } from 'anvilui'

export function Example() {
    return (
        <Menubar>
            <Menu>
                <MenuTrigger>File</MenuTrigger>
                <MenuPopup>
                    <MenuItem>New</MenuItem>
                    <MenuItem>Save</MenuItem>
                </MenuPopup>
            </Menu>
            <Menu>
                <MenuTrigger>Edit</MenuTrigger>
                <MenuPopup>
                    <MenuItem>Undo</MenuItem>
                </MenuPopup>
            </Menu>
        </Menubar>
    )
}
```

Inside a Menubar, plain `MenuTrigger`s are styled as menubar entries; don't pass `render={<Button />}`.
