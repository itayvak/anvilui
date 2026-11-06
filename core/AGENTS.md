# AnvilUI: reference for AI coding agents

`anvilui` is a React 19 component library implementing Material 3 Expressive (with extra motion beyond the spec), built on [Base UI](https://base-ui.com) (`@base-ui/react`). It has ~50 accessible components (buttons, inputs, selects, dialogs, menus, navigation, …), a theme system driven by CSS variables, and Material Symbols icons referenced by name. It is **not** shadcn/ui, Radix or MUI: names and props differ. This file matches the installed version. Read it before writing code; per-component pages are in [`docs/`](docs/llms-index.md) (`node_modules/anvilui/docs/<name>.md`).

## Rules that prevent most errors

1. `import 'anvilui/styles.css'` once, and wrap the whole app in `<AnvilRoot>`. Nothing is themed outside it.
2. Everything imports from `'anvilui'`. No subpaths (`anvilui/button` doesn't exist) except `'anvilui/styles.css'`.
3. **No `asChild`.** Use `render`: `<DialogTrigger render={<Button />}>Open</DialogTrigger>`. Trigger and Close parts render bare, unstyled buttons without it.
4. **No `variant`.** Style is `fillType: 'filled' | 'outlined' | 'text'`; color is `color: 'primary' | 'tonal' | 'success' | 'warning' | 'error' | 'container' | 'surface'`. No `secondary` / `destructive` / `ghost`.
5. **Icons are strings** (Material Symbols names): `startIcon="add"`, `<IconButton icon="delete" aria-label="Delete" />`, `<Icon name="home" />`. Don't pass icon components.
6. Callbacks get **values, not events**: `onValueChange(value)`, `onCheckedChange(checked)`, `onOpenChange(open)`, `onPressedChange(pressed)`. No `onChange` except on `Input`/`Textarea` (native).
7. `Checkbox`, `Switch`, `Radio` have **no `label` prop**: wrap them in `<label>`. Most other controls take `label`.
8. Titles and text often go in **`label`, not children**: `AppBar`, `ListItem`, `Tooltip`, nav items, `Input`, `Select`, `Slider`, `Progress`.
9. Icon-only controls require `aria-label` (`IconButton`, `FAB` without `label`, icon `Toggle`, `Slider`/`Progress` without `label`, `Search`, `Carousel`).
10. `Button` defaults to `type="button"`. Use `type="submit"` in forms.
11. Dates are `"YYYY-MM-DD"` strings, times `"HH:mm"` strings. Not `Date` objects.
12. No layout components (`Box`, `Stack`, `Grid`, `Container`, `Flex`) and no `sx`. Use plain elements with `style` / CSS and theme variables like `var(--avl-spacing-x4)`.

## Setup

Requires `react` and `react-dom` 19+, and a bundler that handles CSS from `node_modules` (Vite, Next.js, webpack).

```tsx
// main.tsx
import { createRoot } from 'react-dom/client'
import { AnvilRoot } from 'anvilui'
import 'anvilui/styles.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
    <AnvilRoot
        defaultColorMode="system"
        storageKey="color-mode"
        className="app-root"
    >
        <App />
    </AnvilRoot>
)
```

- `AnvilRoot` is the only provider (theme, color mode, tooltips, snackbars, portal container). Don't add `ThemeProvider`, `Toaster` or `TooltipProvider`.
- Give it a class with `min-height: 100vh` so the background covers the page.
- Hooks `useAnvil()` and `useSnackbar()` work only in components **inside** it.
- Next.js App Router: render `AnvilRoot` in a `'use client'` component and use AnvilUI from client components. Details: [docs/setup.md](docs/setup.md).
- Fonts: Google Sans is not loaded for you (falls back to the system font). See setup.md.

## Exports

| Area | Exports | Doc |
| --- | --- | --- |
| Root & theme | `AnvilRoot`, `useAnvil`, `AnvilContext`, `createTheme`, `createThemeFromImage`, `baseLightTheme`, `baseDarkTheme`, `monochromeLightTheme`, `monochromeDarkTheme`, `baseDesignTokens` | [theming.md](docs/theming.md) |
| Buttons | `Button`, `IconButton`, `SplitButton`, `HoldButton`, `Toggle`, `ToggleGroup`, `ToggleGroupItem`, `FAB`, `FABMenu`, `FABMenuItem` | [button](docs/button.md), [icon-button](docs/icon-button.md), [split-button](docs/split-button.md), [hold-button](docs/hold-button.md), [toggle](docs/toggle.md), [toggle-group](docs/toggle-group.md), [fab](docs/fab.md), [fab-menu](docs/fab-menu.md) |
| Chips | `Chip`, `FilterChip`, `InputChip` | [chip.md](docs/chip.md) |
| Form controls | `Input`, `Textarea`, `Select`, `SelectItem`, `Combobox`, `ComboboxItem`, `Search`, `SearchItem`, `Checkbox`, `Switch`, `RadioGroup`, `Radio`, `Slider`, `DateInput`, `TimePicker`, `Calendar`, `PinInput`, `Field`, `FieldDescription`, `FieldError` | [forms.md](docs/forms.md) + one page each |
| Overlays | `Dialog`(+`Trigger`, `Popup`, `Title`, `Description`, `Actions`, `Close`), `BottomSheet`(+`Trigger`, `Popup`, `Title`, `Description`, `Close`), `Popover`(+`Trigger`, `Popup`, `Title`, `Description`, `Close`), `PreviewCard`(+`Trigger`, `Popup`), `Tooltip` | [dialog](docs/dialog.md), [bottom-sheet](docs/bottom-sheet.md), [popover](docs/popover.md), [preview-card](docs/preview-card.md), [tooltip](docs/tooltip.md) |
| Menus | `Menu`, `MenuTrigger`, `MenuPopup`, `MenuItem`, `MenuGroup`, `MenuSubmenu`, `MenuSubmenuTrigger`, `ContextMenu`, `ContextMenuTrigger`, `Menubar` | [menu](docs/menu.md), [context-menu](docs/context-menu.md), [menubar](docs/menubar.md) |
| Navigation | `AppBar`, `NavigationBar`(+`Item`), `NavigationRail`(+`Toggle`, `Item`), `NavigationList`(+`Item`), `NavigationDrawer`(+`Trigger`, `Popup`, `Title`, `Item`), `Tabs`, `TabsList`, `TabsTab`, `TabsPanel`, `FloatingToolbar`(+`Button`, `Separator`) | [app-bar](docs/app-bar.md), [navigation-bar](docs/navigation-bar.md), [navigation-rail](docs/navigation-rail.md), [navigation-list](docs/navigation-list.md), [navigation-drawer](docs/navigation-drawer.md), [tabs](docs/tabs.md), [floating-toolbar](docs/floating-toolbar.md) |
| Content | `Card`, `CardTitle`, `CardContent`, `CardActions`, `List`, `ListItem`, `Table`, `TableCaption`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`, `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionPanel`, `Carousel`, `CarouselItem`, `Divider`, `Typography` | [card](docs/card.md), [list](docs/list.md), [table](docs/table.md), [accordion](docs/accordion.md), [carousel](docs/carousel.md), [divider](docs/divider.md), [typography](docs/typography.md) |
| Display | `Avatar`, `AvatarGroup`, `Badge`, `Icon`, `Progress`, `Skeleton`, `Sticker`, `AnimatedNumber`, `Kbd` | [avatar](docs/avatar.md), [avatar-group](docs/avatar-group.md), [badge](docs/badge.md), [icons](docs/icons.md), [progress](docs/progress.md), [skeleton](docs/skeleton.md), [sticker](docs/sticker.md), [animated-number](docs/animated-number.md), [kbd](docs/kbd.md) |
| Hooks | `useSnackbar` (toasts), `useConfetti`, `useAnvil` | [snackbar](docs/snackbar.md), [confetti](docs/confetti.md), [theming](docs/theming.md) |
| Motion | `morph`, `morphBetween` | [morph.md](docs/morph.md) |
| Types | `<Name>Props` for every component; `MaterialSymbol` (icon names), `ComponentColor`, `ComponentFillType`, `ColorProps`, `Theme`, `ThemePair`, `CreateThemeOptions`, `DesignTokens`, `Font`, `FontSize`, `Ease`, `EaseLength`, `ColorType`, `ColorModeSetting`, `TypographyType`, `TypographyTag`, `SnackbarOptions`, `ConfettiOptions`, `ConfettiOrigin`, `MorphOptions` | |

Nothing else is exported. Not in the library: `Box`, `Stack`, `Grid`, `Container`, `Label`, `FieldLabel`, `Form`, `Spinner`, `Toast`/`Toaster`, `Alert`, `Banner`, `Breadcrumbs`, `Pagination`, `Stepper`, `DataGrid`, `DatePicker` (use `DateInput`), `Drawer` (use `NavigationDrawer` / `BottomSheet`), `DropdownMenu` (use `Menu`), `Separator` (use `Divider`), `Sheet` (use `BottomSheet`).

## Component reference

Props marked * are required. All components also take `className`, `style`, `ref` and the props of their underlying element / Base UI part. Full tables: `docs/<name>.md`.

### Buttons

| Component | Key props | Usage |
| --- | --- | --- |
| `Button` | `fillType`, `color`, `size: 'small'\|'normal'\|'big'`, `startIcon`, `endIcon`, `loading`, `disabled`, `type`, `render` | `<Button startIcon="add" onClick={create}>New</Button>` |
| `IconButton` | `icon`_, `aria-label`_, `fillType`, `color`. No size, no children | `<IconButton icon="close" aria-label="Close" fillType="text" color="container" />` |
| `SplitButton` | `<div>` props | `<SplitButton><Button>Save</Button><IconButton icon="arrow_drop_down" aria-label="More" /></SplitButton>` |
| `HoldButton` | `onConfirm`*, `holdDuration` (1500), Button props | `<HoldButton color="error" onConfirm={del}>Hold to delete</HoldButton>` |
| `Toggle` | `pressed`/`defaultPressed`/`onPressedChange`, `color`, `fillType`; text: `children`, `startIcon`, `size`; icon: `icon` + `aria-label` | `<Toggle icon="favorite" aria-label="Favorite" />` |
| `ToggleGroup` | `value`/`defaultValue`/`onValueChange` (single value; array with `multiple`), `multiple`, `color`, `fillType`, `size` | `<ToggleGroup aria-label="View" defaultValue="list">…</ToggleGroup>` |
| `ToggleGroupItem` | `value`*, `startIcon`, `endIcon`, `children` | `<ToggleGroupItem value="list">List</ToggleGroupItem>` |
| `FAB` | `icon`_, `label` or `aria-label`_, `size`, `color`, `fillType`, `sticky` | `<FAB icon="add" aria-label="New" style={{ position: 'fixed', right: 16, bottom: 16 }} />` |
| `FABMenu` | `icon`_, `aria-label`_, `children`* (`FABMenuItem`s), `side`, `align`, `color` | `<FABMenu icon="add" aria-label="Create"><FABMenuItem icon="folder">Folder</FABMenuItem></FABMenu>` |
| `Chip` / `FilterChip` / `InputChip` | `startIcon`; FilterChip `pressed`/`onPressedChange`; InputChip `onRemove`*, `removeLabel` | `<FilterChip pressed={on} onPressedChange={setOn}>Vegan</FilterChip>` |

### Form controls

| Component | Key props | Usage |
| --- | --- | --- |
| `Input` | `label`, `size: 'small'\|'normal'`, `value`/`defaultValue`, `onValueChange(string)` or `onChange(event)`, input attrs | `<Input label="Email" type="email" value={v} onValueChange={setV} />` |
| `Textarea` | same as Input + `rows` | `<Textarea label="Bio" rows={4} />` |
| `Select` | `items` (map or `{value,label}[]`), `value`/`defaultValue`/`onValueChange(value)`, `label`, `placeholder`, `multiple`, `name` | `<Select label="Fruit" items={fruits} defaultValue="apple">{…SelectItem}</Select>` |
| `SelectItem` | `value`*, children = label | `<SelectItem value="apple">Apple</SelectItem>` |
| `Combobox` | `items`, `children`* = `(item) => <ComboboxItem/>`, `value`/`onValueChange(item)`, `itemToStringLabel`, `label`, `empty` | `<Combobox label="Fruit" items={list}>{(f: string) => <ComboboxItem key={f} value={f}>{f}</ComboboxItem>}</Combobox>` |
| `Search` | `aria-label`_, `items`, `children`_ = `(item) => <SearchItem/>`, `value`/`onValueChange(text)`, `placeholder`, `empty` | `<Search aria-label="Search" items={[]} onValueChange={setQ}>{(i: string) => <SearchItem key={i} value={i}>{i}</SearchItem>}</Search>` |
| `Checkbox` | `checked`/`defaultChecked`/`onCheckedChange(boolean)`, `indeterminate`, `name` | `<label><Checkbox checked={c} onCheckedChange={setC} /> Remember me</label>` |
| `Switch` | `checked`/`defaultChecked`/`onCheckedChange(boolean)`, `name` | `<label><Switch defaultChecked /> Wi-Fi</label>` |
| `RadioGroup` / `Radio` | group: `value`/`defaultValue`/`onValueChange(value)`, `name`; radio: `value`* | `<RadioGroup defaultValue="a"><label><Radio value="a" /> A</label></RadioGroup>` |
| `Slider` | `label` or `aria-label`*, `value`/`defaultValue` (number or number[]), `onValueChange(number)`, `min`, `max`, `step`, `showValue`, `format` | `<Slider label="Volume" defaultValue={50} />` |
| `DateInput` | `value`/`defaultValue` `"YYYY-MM-DD" \| null`, `onValueChange`, `label` or `aria-label`* | `<DateInput label="Due" value={d} onValueChange={setD} />` |
| `TimePicker` | `value`/`defaultValue` `"HH:mm" \| null`, `onValueChange`, `type: 'dial'\|'input'`, `hourCycle: 12\|24`, `label` or `aria-label`*, `name` | `<TimePicker label="Start" defaultValue="09:00" />` |
| `Calendar` | `value`/`defaultValue` `"YYYY-MM-DD" \| null`, `onValueChange` | `<Calendar value={d} onValueChange={setD} />` |
| `PinInput` | `length`_, `label` or `aria-label`_, `value`/`onValueChange`, `onValueComplete`, `mask`, `validationType` | `<PinInput label="Code" length={6} />` |
| `Field` | `name`, `validate`, `validationMode: 'onSubmit'\|'onBlur'\|'onChange'`, `invalid`, `disabled` | `<Field name="email"><Input label="Email" required /><FieldError /></Field>` |
| `FieldDescription` / `FieldError` | FieldError `match` | `<FieldError match="valueMissing">Required</FieldError>` |

### Overlays and menus

| Component | Parts and key props | Usage |
| --- | --- | --- |
| `Dialog` | `open`/`defaultOpen`/`onOpenChange`; `DialogTrigger`, `DialogPopup` (includes portal + backdrop), `DialogTitle`, `DialogDescription`, `DialogActions`, `DialogClose` | see Patterns |
| `BottomSheet` | same shape: `BottomSheetTrigger`, `BottomSheetPopup`, `BottomSheetTitle`, `BottomSheetDescription`, `BottomSheetClose`; `snapPoints` | |
| `Popover` | `PopoverTrigger`, `PopoverPopup` (`side`, `align`, `sideOffset`), `PopoverTitle`, `PopoverDescription`, `PopoverClose` | |
| `PreviewCard` | `PreviewCardTrigger` (an `<a href>`), `PreviewCardPopup` | |
| `Tooltip` | `label`_, one element child_, `side`, `align`, `delay` | `<Tooltip label="Delete"><IconButton icon="delete" aria-label="Delete" /></Tooltip>` |
| `Menu` | `MenuTrigger`, `MenuPopup` (`side`, `align`), `MenuItem` (`onClick`, `startIcon`, `endIcon`, `disabled`), `MenuGroup`, `MenuSubmenu` + `MenuSubmenuTrigger` | see Patterns |
| `ContextMenu` | `ContextMenuTrigger` (area) + `MenuPopup` / `MenuItem` | |
| `Menubar` | contains `Menu`s | |
| `useSnackbar()` | `.show({ message*, action?: { label, onClick }, closeButton, timeout (5000), priority })`, `.close(id?)` | `snackbar.show({ message: 'Saved' })` |

### Navigation and layout

| Component | Key props | Usage |
| --- | --- | --- |
| `AppBar` | `label`*, `labelAs`, `start`, `end`, `size: 'normal'\|'big'`, `centered`, `color` ('container') | `<AppBar label="Inbox" start={…} end={…} />` |
| `NavigationBar` / `NavigationBarItem` | item: `icon`_, `label`_, `active`, `href` or `render={<Link/>}` | `<NavigationBarItem icon="home" label="Home" href="/" active />` |
| `NavigationRail` / `NavigationRailToggle` / `NavigationRailItem` | rail: `expanded`/`defaultExpanded`/`onExpandedChange`; toggle: `aria-label`_; item: `icon`_, `label`*, `active`, `end`, `href` | |
| `NavigationList` / `NavigationListItem` | item: `label`*, `active`, `href`, `render` | |
| `NavigationDrawer` | `NavigationDrawerTrigger`, `NavigationDrawerPopup`, `NavigationDrawerTitle`, `NavigationDrawerItem` (`icon`_, `label`_, `active`, `href`) | |
| `Tabs` | `value`/`defaultValue`/`onValueChange`; `TabsList`, `TabsTab` (`value`_, `icon`), `TabsPanel` (`value`_). Always set `defaultValue` | see Patterns |
| `FloatingToolbar` | `inverseColor`; `FloatingToolbarButton` (IconButton props), `FloatingToolbarSeparator` | |
| `Card` | `color` ('container'), `fillType`, `clickable`; `CardTitle` (`as`), `CardContent`, `CardActions` | |
| `List` / `ListItem` | list: `divided`; item: `label`*, `description`, `start`, `end`, `render`. No children | `<ListItem label="Wi-Fi" end={<Switch />} render={<label />} />` |
| `Table` | `TableCaption`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell` (native elements) | |
| `Accordion` | `value`/`defaultValue` (array), `multiple`; `AccordionItem` (`value`), `AccordionTrigger` (`as`), `AccordionPanel` | |
| `Carousel` / `CarouselItem` | `aria-label`* | |
| `Divider` | `orientation`, `label`, `squiggly` | `<Divider label="or" />` |
| `Typography` | `type: 'body'\|'caption'\|'h1'…'h6'` (not `variant`), `as` | `<Typography type="h5" as="h1">Settings</Typography>` |

### Display

| Component | Key props | Usage |
| --- | --- | --- |
| `Avatar` | `name`, `src`, `icon`, `size` (32/40/56px), `color` | `<Avatar name="Ada Lovelace" src={url} />` |
| `AvatarGroup` | `max`, `size`, `fan`, `aria-label` | `<AvatarGroup max={3} aria-label="Team">{avatars}</AvatarGroup>` |
| `Badge` | `count` (omit for dot, 0 hides), `max`, `color` ('error'), wraps children | `<Badge count={3}><IconButton icon="mail" aria-label="Mail, 3 new" /></Badge>` |
| `Icon` | `name`* | `<Icon name="star" />` |
| `Progress` | `value`* (`number \| null`), `type: 'linear'\|'circular'\|'inline'`, `label` or `aria-label`*, `squiggly` | `<Progress type="circular" value={null} aria-label="Loading" />` |
| `Skeleton` | `variant: 'text'\|'circular'\|'rectangular'`, `animation`; size via `style` | `<Skeleton style={{ width: 120 }} />` |
| `Sticker` | `color`, `startIcon`, `tilt` | `<Sticker>NEW</Sticker>` |
| `AnimatedNumber` | `value`*, `format`, `locales` | `<AnimatedNumber value={n} />` |
| `Kbd` | `children`, `listen`, `listenFor` | `<Kbd>⌘</Kbd><Kbd>K</Kbd>` |

## Patterns

### App shell: app bar, side navigation, content

```tsx
import {
    AppBar,
    Avatar,
    IconButton,
    NavigationRail,
    NavigationRailItem,
    NavigationRailToggle,
} from 'anvilui'

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NavigationRail aria-label="Main">
                <NavigationRailToggle aria-label="Toggle navigation" />
                <NavigationRailItem
                    icon="dashboard"
                    label="Dashboard"
                    href="/"
                    active
                />
                <NavigationRailItem
                    icon="settings"
                    label="Settings"
                    href="/settings"
                />
            </NavigationRail>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                }}
            >
                <AppBar
                    label="Dashboard"
                    labelAs="h1"
                    end={
                        <>
                            <IconButton
                                icon="notifications"
                                aria-label="Notifications"
                                fillType="text"
                                color="container"
                            />
                            <Avatar name="Ada Lovelace" size="small" />
                        </>
                    }
                />
                <main
                    style={{
                        flex: 1,
                        overflow: 'auto',
                        padding: 'var(--avl-spacing-x6)',
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    )
}
```

### Settings page: tabs, form fields, switches

```tsx
import { useState } from 'react'
import {
    Button,
    Field,
    FieldError,
    Input,
    List,
    ListItem,
    Select,
    SelectItem,
    Switch,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    useSnackbar,
} from 'anvilui'

const languages = { en: 'English', fr: 'Français', ja: '日本語' }

export function Settings() {
    const snackbar = useSnackbar()
    const [name, setName] = useState('Ada')
    const [language, setLanguage] = useState<string | null>('en')
    return (
        <Tabs defaultValue="profile">
            <TabsList>
                <TabsTab value="profile" icon="person">
                    Profile
                </TabsTab>
                <TabsTab value="notifications" icon="notifications">
                    Notifications
                </TabsTab>
            </TabsList>
            <TabsPanel value="profile">
                <form
                    style={{
                        display: 'grid',
                        gap: 16,
                        maxWidth: 400,
                        paddingBlock: 16,
                    }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        snackbar.show({ message: 'Profile saved' })
                    }}
                >
                    <Field name="name">
                        <Input
                            label="Display name"
                            required
                            value={name}
                            onValueChange={setName}
                        />
                        <FieldError />
                    </Field>
                    <Select
                        label="Language"
                        items={languages}
                        value={language}
                        onValueChange={setLanguage}
                    >
                        {Object.entries(languages).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button type="submit" style={{ justifySelf: 'start' }}>
                        Save
                    </Button>
                </form>
            </TabsPanel>
            <TabsPanel value="notifications">
                <List divided>
                    <ListItem
                        label="Email"
                        description="Weekly summary"
                        end={<Switch defaultChecked />}
                        render={<label />}
                    />
                    <ListItem
                        label="Push"
                        end={<Switch />}
                        render={<label />}
                    />
                </List>
            </TabsPanel>
        </Tabs>
    )
}
```

### Confirm dialog opened from a row menu

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
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
} from 'anvilui'

export function Files() {
    const [files, setFiles] = useState(['report.pdf', 'notes.txt'])
    // Separate from `open`, so the title still reads right while it animates closed
    const [toDelete, setToDelete] = useState('')
    const [open, setOpen] = useState(false)
    return (
        <>
            <List divided>
                {files.map((file) => (
                    <ListItem
                        key={file}
                        label={file}
                        end={
                            <Menu>
                                <MenuTrigger
                                    render={
                                        <IconButton
                                            icon="more_vert"
                                            aria-label={`Actions for ${file}`}
                                            fillType="text"
                                            color="container"
                                        />
                                    }
                                />
                                <MenuPopup align="end">
                                    <MenuItem
                                        startIcon="delete"
                                        onClick={() => {
                                            setToDelete(file)
                                            setOpen(true)
                                        }}
                                    >
                                        Delete
                                    </MenuItem>
                                </MenuPopup>
                            </Menu>
                        }
                    />
                ))}
            </List>
            {/* Controlled, outside the menu, so closing the menu doesn't unmount it */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogPopup>
                    <DialogTitle>Delete {toDelete}?</DialogTitle>
                    <DialogDescription>This can't be undone.</DialogDescription>
                    <DialogActions>
                        <DialogClose render={<Button fillType="text" />}>
                            Cancel
                        </DialogClose>
                        <Button
                            color="error"
                            onClick={() => {
                                setFiles(files.filter((f) => f !== toDelete))
                                setOpen(false)
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </DialogPopup>
            </Dialog>
        </>
    )
}
```

### Router links

Nav items, `ListItem`, `MenuItem`, `PreviewCardTrigger` and `Card clickable` take `render`: `<NavigationRailItem icon="home" label="Home" render={<Link to="/" />} active={pathname === '/'} />`. On `Button` also pass `nativeButton={false}`: `<Button render={<Link to="/new" />} nativeButton={false}>New</Button>`.

### Switching views without URLs

Nav items render `<a>` by default. For in-page state, pass a plain button: `<NavigationRailItem icon="home" label="Home" active={view === 'home'} render={<button type="button" onClick={() => setView('home')} />} />` (no `nativeButton` needed). Same for `NavigationBarItem`, `NavigationListItem`, `NavigationDrawerItem` (still closes the drawer) and `ListItem`.

### Inline success / error messages

There is no `Alert` or `Banner`. For a message after an action, use a snackbar (`useSnackbar().show(...)`). For a message that stays on the page, use a colored card: `<Card color="success" role="status"><CardContent>Account created</CardContent></Card>` (`color="error"` with `role="alert"` for errors). For a field's error, use `Field` + `FieldError`.

### Typing state for value callbacks

`Value` is inferred from your `value` / `defaultValue`, so union-typed state works directly: `const [plan, setPlan] = useState<'free' | 'pro'>('free')` then `<ToggleGroup value={plan} onValueChange={setPlan}>` (also `RadioGroup`, `Tabs`, `Select`). `Slider` too: a number `value` gives a `(value: number)` callback, an array a `number[]` one, so `onValueChange={setVolume}` works. To type an icon field yourself: `import type { MaterialSymbol } from 'anvilui'`.

### Theme colors in your own CSS

Inside AnvilRoot: `var(--avl-color-background)`, `var(--avl-color-on-background)`, `var(--avl-color-on-background-muted)`, `var(--avl-color-primary)`, `var(--avl-color-surface)`, `var(--avl-color-divider)`, spacing `var(--avl-spacing-x1…x20)` (4px steps), radius `var(--avl-radius-medium)`. Custom brand: `createTheme('#0B6E4F')` → `<AnvilRoot lightTheme={t.light} darkTheme={t.dark}>` ([theming.md](docs/theming.md)).

## Common mistakes

| Wrong (other libraries) | Right (AnvilUI) |
| --- | --- |
| `<Button variant="outline">` | `<Button fillType="outlined">` |
| `<Button variant="ghost">` / `variant="link"` | `<Button fillType="text">` |
| `<Button variant="destructive">` / `color="danger"` | `<Button color="error">` |
| `<Button variant="secondary">` / `color="secondary"` | `<Button color="container">` or `color="tonal"` |
| `<Button size="lg">` / `size="sm"` | `size="big"` / `size="small"` |
| `<Button><Plus /> Add</Button>` | `<Button startIcon="add">Add</Button>` |
| `<IconButton><DeleteIcon /></IconButton>` | `<IconButton icon="delete" aria-label="Delete" />` |
| `<IconButton icon="x" size="small" />` | IconButton has no `size`; it's always 40px |
| `<DialogTrigger asChild><Button>Open</Button></DialogTrigger>` | `<DialogTrigger render={<Button />}>Open</DialogTrigger>` |
| `<DialogTrigger>Open</DialogTrigger>` expecting a styled button | It's a bare `<button>`; add `render={<Button />}` |
| `<DialogContent>`, `<DialogHeader>`, `<DialogFooter>` | `<DialogPopup>`, (nothing), `<DialogActions>` |
| `<Dialog><DialogPortal><DialogOverlay/>…` | `DialogPopup` already includes portal and backdrop |
| `<Tooltip content="Hi">` / `<TooltipTrigger>` | `<Tooltip label="Hi"><IconButton … /></Tooltip>` |
| `<Tooltip label="Hi">text</Tooltip>` | One element child: `<Tooltip label="Hi"><span tabIndex={0}>text</span></Tooltip>` |
| `<Checkbox label="Accept" />` | `<label><Checkbox /> Accept</label>` |
| `<Switch onChange={(e) => set(e.target.checked)} />` | `<Switch onCheckedChange={set} />` |
| `<Select onChange={(e) => set(e.target.value)}>` | `<Select onValueChange={set}>` |
| `<Select><SelectTrigger/><SelectContent>…` | `<Select label="…" items={items}><SelectItem value="a">A</SelectItem></Select>` |
| `<Select>` without `items` showing `"us"` instead of "United States" | pass `items={{ us: 'United States' }}` (or `[{ value, label }]`) |
| `<Combobox><ComboboxItem/>…</Combobox>` | `<Combobox items={list}>{(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</Combobox>` |
| `<Tabs><TabsTrigger/><TabsContent/>` | `<Tabs defaultValue="a"><TabsList><TabsTab value="a">A</TabsTab></TabsList><TabsPanel value="a">…</TabsPanel></Tabs>` |
| `<Tabs>` with string values and no `defaultValue` (nothing selected) | always pass `defaultValue` / `value` |
| `<Accordion type="single" collapsible defaultValue="a">` | `<Accordion defaultValue={['a']}>` (array; `multiple` for several) |
| `<DropdownMenu>`, `<DropdownMenuItem onSelect>` | `<Menu>`, `<MenuItem onClick>` |
| `<MenuSeparator />` | split items into `<MenuGroup>`s |
| `toast('Saved')`, `<Toaster />`, `<Snackbar open>` | `const snackbar = useSnackbar(); snackbar.show({ message: 'Saved' })` |
| `snackbar.show({ message, severity: 'success' })` | no severity; put it in the message |
| `<Typography variant="h4">` | `<Typography type="h4">` |
| `<AppBar title="Inbox">` / `<AppBar>Inbox</AppBar>` | `<AppBar label="Inbox" />` |
| `<ListItem>Text</ListItem>` / `primary=` / `secondary=` | `<ListItem label="Text" description="More" />` |
| `<ListItem onClick={…} />` expecting a button | `<ListItem label="…" render={<button type="button" onClick={…} />} />` |
| `<CardHeader>`, `<CardFooter>`, `<CardDescription>` | `<CardTitle>`, `<CardActions>`, `<CardContent>` |
| `<Badge badgeContent={3}>` | `<Badge count={3}>` |
| `<Progress value={undefined} />` for loading / `<Spinner />` | `<Progress value={null} aria-label="Loading" />` (`type="circular"` for a ring) |
| `<DateInput value={new Date()} />` | `value="2026-11-06"` (`"YYYY-MM-DD"` string) |
| `<TimePicker value="7:30 PM" />` | `value="19:30"` |
| `<Slider onValueChange={(e) => …e.target.value} />` | `onValueChange={(value) => …}` gets the number |
| `<Input error helperText="…" />` | `<Field><Input … /><FieldDescription>…</FieldDescription><FieldError /></Field>` |
| `<Button>` inside `<form>` not submitting | `<Button type="submit">` (default is `type="button"`) |
| `<ThemeProvider theme={…}>` | `<AnvilRoot lightTheme={…} darkTheme={…}>` |
| `useSnackbar()` / `useAnvil()` in the component that renders `<AnvilRoot>` | call them in a child component |
| `import { Button } from 'anvilui/button'` | `import { Button } from 'anvilui'` |
| Forgetting `import 'anvilui/styles.css'` | import it once in the entry file |
| `<Stack gap={2}>`, `<Box sx={…}>` | `<div style={{ display: 'flex', gap: 'var(--avl-spacing-x2)' }}>` |

## Errors you may see

In development, AnvilUI logs `[anvilui] …` errors with a fix and a doc path for: a missing stylesheet, components outside `AnvilRoot`, `asChild`, `variant` on Button/IconButton/Typography, `label` on Checkbox/Switch/Radio, missing `aria-label`, non-function Combobox/Search children, a Tooltip without one element child, and parts outside their parent. Base UI's own errors look like `Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>`. `<Menu.Root>` there means AnvilUI's `<Menu>` (likewise `<Tabs.Root>` → `<Tabs>`, `<Dialog.Root>` → `<Dialog>`).

## More

- Routing index of all pages: [docs/llms-index.md](docs/llms-index.md)
- Inherited Base UI props for any part: `node_modules/@base-ui/react/docs/react/components/<name>.md`
- Types with JSDoc on every prop: `node_modules/anvilui/dist/index.d.ts`
