# Composition: `render`, refs, className

AnvilUI is built on [Base UI](https://base-ui.com). Base UI patterns apply everywhere.

## `render` instead of `asChild`

There is **no `asChild`** prop. To render a part as another element or component, pass `render`:

```tsx
import {
    Button,
    Dialog,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    IconButton,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
} from 'anvilui'

export function Example() {
    return (
        <>
            <Dialog>
                <DialogTrigger render={<Button />}>Open</DialogTrigger>
                <DialogPopup>
                    <DialogTitle>Hi</DialogTitle>
                </DialogPopup>
            </Dialog>

            <Menu>
                <MenuTrigger
                    render={<IconButton icon="more_vert" aria-label="More" />}
                />
                <MenuPopup>
                    <MenuItem>Rename</MenuItem>
                </MenuPopup>
            </Menu>

            {/* A button that's a link: not a <button>, so nativeButton={false} */}
            <Button render={<a href="/settings" />} nativeButton={false}>
                Settings
            </Button>
        </>
    )
}
```

- `render` merges props, `className` and `ref` into the element you pass.
- All Trigger and Close parts (`DialogTrigger`, `DialogClose`, `PopoverTrigger`, `PopoverClose`, `MenuTrigger`, `BottomSheetTrigger`, `BottomSheetClose`, `NavigationDrawerTrigger`) render a **bare, unstyled `<button>`** unless you pass `render`.
- When `render` swaps a button for a non-button element (`<a>`, `<div>`), add `nativeButton={false}`.
- Router links: `render={<Link to="/x" />}` (React Router) or `render={<Link href="/x" />}` (Next.js) on nav items, `ListItem`, `PreviewCardTrigger`, `Button` (+ `nativeButton={false}`).

## Refs and props

- Every component takes `ref` (React 19 `ref` prop) and passes unknown props to its main element.
- `className` is merged with the library's classes, never replaced. On Base UI-based parts it can also be a function of state: `className={(state) => state.open ? 'open' : ''}`.
- **Field-like components put `className` on the outer wrapper** (so width and margins work) and `ref` on the input: `Input`, `Textarea`, `DateInput`. `Select`, `Combobox`, `Search` put `className` on the field wrapper; their other props go to the Base UI Root, which renders no element.
- `Tooltip` puts `className` on the bubble. `FABMenu` puts it on the FAB.

## State props

Stateful components work controlled or uncontrolled, with Base UI's names:

| State | Props | Callback signature |
| --- | --- | --- |
| value | `value` / `defaultValue` / `onValueChange` | `(value, eventDetails) => void`. The **value**, not an event. |
| checked | `checked` / `defaultChecked` / `onCheckedChange` | `(checked: boolean, eventDetails) => void` (Checkbox, Switch) |
| pressed | `pressed` / `defaultPressed` / `onPressedChange` | `(pressed: boolean, eventDetails) => void` (Toggle, FilterChip) |
| open | `open` / `defaultOpen` / `onOpenChange` | `(open: boolean, eventDetails) => void` (Dialog, Popover, Menu, Select, …) |

Because the value comes first, a `useState` setter can be passed directly: `onValueChange={setTab}`, `onCheckedChange={setEnabled}`.

There is no `onChange` on Checkbox, Switch, Select, Slider, Tabs, RadioGroup or ToggleGroup. `Input` and `Textarea` take both native `onChange` (an event) and `onValueChange` (a string).

## Base UI docs for inherited props

Each page lists AnvilUI's own props. Parts also take every prop of the Base UI part they wrap. Those are documented in the installed Base UI package: `node_modules/@base-ui/react/docs/react/components/<name>.md`.
