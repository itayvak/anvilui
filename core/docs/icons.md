# Icons

AnvilUI uses **Material Symbols (Rounded)**, an icon font that ships with the package. Icons are **name strings**, not components.

```tsx
import { Button, Icon, IconButton } from 'anvilui'

export function Example() {
    return (
        <>
            <Button startIcon="add">New</Button>
            <IconButton icon="delete" aria-label="Delete" />
            <Icon
                name="favorite"
                style={{ fontSize: 32, color: 'var(--avl-color-error)' }}
            />
        </>
    )
}
```

- Names are snake_case Material Symbols names: `home`, `settings`, `arrow_back`, `more_vert`, `delete`, `edit`, `search`, `close`, `check`, `add`, `menu`, `person`, `mail`, `notifications`, `favorite`, `share`, `download`, `upload`, `visibility`, `logout`, `dark_mode`, `light_mode`. Browse: https://fonts.google.com/icons
- The prop type is `MaterialSymbol` (a union of every valid name), so a typo is a type error. To type your own data: `import type { MaterialSymbol } from 'anvilui'`, e.g. `const nav: { icon: MaterialSymbol; label: string }[] = [...]`. A plain `string` won't type-check.
- To check a name offline, search the list in `node_modules/material-symbols/index.d.ts` (the `MaterialSymbols` tuple).
- Don't import icon components from `lucide-react`, `@mui/icons-material` or `react-icons` into `startIcon` / `icon` props. Those props take strings.
- Props that take icons: `startIcon`, `endIcon` (Button, Toggle, Chip, MenuItem, …), `icon` (IconButton, FAB, Tabs tab, nav items, …), `name` (Icon).

## Icon

```ts
type IconProps = Omit<React.ComponentProps<'span'>, 'children'> & {
    name: MaterialSymbol // required
}
```

- Renders a `<span>`. Size follows `font-size`; color follows `color`.
- Decorative by default (`aria-hidden`). Give it `aria-label` to make it a labeled image.
- Takes no children: `<Icon name="home" />`, not `<Icon>home</Icon>`.
