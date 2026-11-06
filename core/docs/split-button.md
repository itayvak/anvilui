# SplitButton

Joins `Button`s and `IconButton`s into one segmented group. Renders a `<div role="group">`.

```ts
import { SplitButton } from 'anvilui'
import type { SplitButtonProps } from 'anvilui' // = React.ComponentProps<'div'>
```

No props of its own. Style each button inside yourself; give them all the same `color`, `fillType` and `size`.

```tsx
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    SplitButton,
} from 'anvilui'

export function Example() {
    return (
        <SplitButton aria-label="Save">
            <Button startIcon="save">Save</Button>
            <Menu>
                <MenuTrigger
                    render={
                        <IconButton
                            icon="arrow_drop_down"
                            aria-label="More save options"
                        />
                    }
                />
                <MenuPopup align="end">
                    <MenuItem>Save as copy</MenuItem>
                    <MenuItem>Save as template</MenuItem>
                </MenuPopup>
            </Menu>
        </SplitButton>
    )
}
```
