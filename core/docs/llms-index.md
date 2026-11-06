# AnvilUI docs index

One line per page. Start with [../AGENTS.md](../AGENTS.md). Paths are relative to `node_modules/anvilui/docs/`.

## Guides

- [setup.md](setup.md): install, `anvilui/styles.css`, `AnvilRoot`, fonts, Next.js, theme CSS variables
- [theming.md](theming.md): AnvilRoot props, color mode, `useAnvil`, `createTheme`, theme roles, design tokens
- [composition.md](composition.md): `render` instead of `asChild`, refs, className, controlled/uncontrolled props
- [forms.md](forms.md): building forms, `Field` validation, `FormData`, submit buttons
- [icons.md](icons.md): Material Symbols names, `Icon`, which props take icon names
- [morph.md](morph.md): `morph()` / `morphBetween()` container transforms

## Buttons and actions

- [button.md](button.md): Button with `fillType`, `color`, `size`, icons, `loading`, links
- [icon-button.md](icon-button.md): IconButton, icon-only round button (`aria-label` required)
- [split-button.md](split-button.md): SplitButton, a segmented group of buttons
- [hold-button.md](hold-button.md): HoldButton, press-and-hold to confirm destructive actions
- [toggle.md](toggle.md): Toggle, an on/off button (text or icon)
- [toggle-group.md](toggle-group.md): ToggleGroup, a segmented control, single or multiple
- [fab.md](fab.md): FAB, the floating action button
- [fab-menu.md](fab-menu.md): FABMenu, a FAB that opens a stack of actions
- [chip.md](chip.md): Chip, FilterChip, InputChip

## Form controls

- [input.md](input.md): Input, text field with floating label
- [textarea.md](textarea.md): Textarea, multi-line text field
- [field.md](field.md): Field, FieldDescription, FieldError for helper text and validation
- [select.md](select.md): Select, SelectItem dropdown (`items` for labels)
- [combobox.md](combobox.md): Combobox, ComboboxItem, a filterable picker (render-function children)
- [search.md](search.md): Search, SearchItem, a search bar with suggestions
- [checkbox.md](checkbox.md): Checkbox (wrap in `<label>`)
- [switch.md](switch.md): Switch (wrap in `<label>`)
- [radio-group.md](radio-group.md): RadioGroup, Radio
- [slider.md](slider.md): Slider, single value or range
- [date-input.md](date-input.md): DateInput, typed or picked date (`"YYYY-MM-DD"`)
- [time-picker.md](time-picker.md): TimePicker, dial or typed time (`"HH:mm"`)
- [calendar.md](calendar.md): Calendar, a month grid
- [pin-input.md](pin-input.md): PinInput, one box per character for codes

## Overlays and menus

- [dialog.md](dialog.md): Dialog and parts (Trigger, Popup, Title, Description, Actions, Close)
- [bottom-sheet.md](bottom-sheet.md): BottomSheet, a sheet that slides up from the bottom
- [popover.md](popover.md): Popover, an anchored interactive panel
- [preview-card.md](preview-card.md): PreviewCard, a hover preview for links
- [tooltip.md](tooltip.md): Tooltip (`label` + one child element)
- [menu.md](menu.md): Menu, MenuTrigger, MenuPopup, MenuItem, MenuGroup, submenus
- [context-menu.md](context-menu.md): ContextMenu, a right-click menu
- [menubar.md](menubar.md): Menubar, a File/Edit/View row of menus
- [snackbar.md](snackbar.md): `useSnackbar()` toasts
- [confetti.md](confetti.md): `useConfetti()` bursts

## Navigation and layout

- [app-bar.md](app-bar.md): AppBar, the top bar (`label`, `start`, `end`)
- [navigation-bar.md](navigation-bar.md): NavigationBar, bottom navigation for mobile
- [navigation-rail.md](navigation-rail.md): NavigationRail, collapsible side navigation
- [navigation-list.md](navigation-list.md): NavigationList, a text-only sidebar of links
- [navigation-drawer.md](navigation-drawer.md): NavigationDrawer, a slide-in side navigation
- [tabs.md](tabs.md): Tabs, TabsList, TabsTab, TabsPanel
- [floating-toolbar.md](floating-toolbar.md): FloatingToolbar, a floating pill of icon buttons
- [card.md](card.md): Card, CardTitle, CardContent, CardActions; clickable cards
- [list.md](list.md): List, ListItem rows with start/end slots
- [table.md](table.md): Table and its native-element parts
- [accordion.md](accordion.md): Accordion, expandable sections
- [carousel.md](carousel.md): Carousel, a horizontal scroller
- [divider.md](divider.md): Divider, horizontal, vertical or labeled
- [typography.md](typography.md): Typography `type` and `as`

## Display

- [avatar.md](avatar.md): Avatar, image, initials or icon
- [avatar-group.md](avatar-group.md): AvatarGroup, overlapping avatars with "+N"
- [badge.md](badge.md): Badge, a dot or count
- [progress.md](progress.md): Progress, linear, circular or inline; indeterminate with `value={null}`
- [skeleton.md](skeleton.md): Skeleton loading placeholders
- [sticker.md](sticker.md): Sticker, a tilted decorative label
- [animated-number.md](animated-number.md): AnimatedNumber, a rolling-digit number
- [kbd.md](kbd.md): Kbd, a keyboard key
