# Theming and color mode

Colors come from a `Theme` (light and dark), everything else from `DesignTokens`. Both are props on `AnvilRoot`.

```ts
import {
    AnvilRoot,
    useAnvil,
    createTheme,
    createThemeFromImage,
    baseLightTheme,
    baseDarkTheme,
    monochromeLightTheme,
    monochromeDarkTheme,
    baseDesignTokens,
} from 'anvilui'
import type {
    Theme,
    ThemePair,
    DesignTokens,
    ColorModeSetting,
    ColorType,
} from 'anvilui'
```

## AnvilRoot props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | The app. |
| `className` | `string` | | Classes for the root `<div>`, e.g. to fill the viewport. |
| `colorMode` | `'light' \| 'dark' \| 'system'` | | Controlled color mode. Pair with `onColorModeChange`. |
| `defaultColorMode` | `'light' \| 'dark' \| 'system'` | `'system'` | Starting mode when uncontrolled. `'system'` follows the OS live. |
| `onColorModeChange` | `(mode: ColorModeSetting) => void` | | Called when the mode changes. |
| `storageKey` | `string` | | Saves the mode in `localStorage` under this key and restores it (no flash with SSR). |
| `lightTheme` | `Theme` | `baseLightTheme` | Colors in light mode. |
| `darkTheme` | `Theme` | `baseDarkTheme` | Colors in dark mode. |
| `tokens` | `Partial<DesignTokens>` | `baseDesignTokens` | Spacing, radius, fonts, motion, shadows. Each category you pass **replaces** the whole default category. |

AnvilRoot renders a `<div>` and takes no other props (no `style`, `id`, `theme`).

## Color mode

```tsx
import { AnvilRoot, IconButton, useAnvil } from 'anvilui'

function ModeToggle() {
    const { colorMode, setColorMode } = useAnvil()
    return (
        <IconButton
            icon={colorMode === 'dark' ? 'light_mode' : 'dark_mode'}
            aria-label="Toggle dark mode"
            fillType="text"
            color="container"
            onClick={() =>
                setColorMode(colorMode === 'dark' ? 'light' : 'dark')
            }
        />
    )
}

export function App() {
    return (
        <AnvilRoot storageKey="color-mode">
            <ModeToggle />
        </AnvilRoot>
    )
}
```

`useAnvil()` returns:

| Field | Type | Description |
| --- | --- | --- |
| `colorMode` | `'light' \| 'dark'` | What's shown now (`'system'` resolved). |
| `colorModeSetting` | `'light' \| 'dark' \| 'system'` | What was picked. |
| `setColorMode` | `Dispatch<SetStateAction<ColorModeSetting>>` | Like a `useState` setter. |
| `lightTheme`, `darkTheme` | `Theme` | The themes in use. |
| `tokens` | `DesignTokens` | The tokens in use, defaults filled in. |
| `rootRef` | `RefObject<HTMLDivElement \| null>` | The root element (the portal container). |

`useAnvil()` throws outside `AnvilRoot`.

## Custom colors

```tsx
import { AnvilRoot, Button, createTheme } from 'anvilui'

// Module scope (or useMemo): it does color math
const brand = createTheme('#0B6E4F', { tonal: '#6E4F0B' })

export function App() {
    return (
        <AnvilRoot lightTheme={brand.light} darkTheme={brand.dark}>
            <Button>Brand colored</Button>
        </AnvilRoot>
    )
}
```

- `createTheme(primaryHex, { tonal?: hex })` returns `{ light: Theme, dark: Theme }`. Hex only (`'#0B6E4F'` or `'#0B6'`); other formats throw.
- `createThemeFromImage(img | File | Blob | url)` returns `Promise<ThemePair>`, browser only. URLs must allow CORS.
- Each role keeps the lightness of the base theme, so text stays readable; only hue and colorfulness change. Error, warning and success colors stay the same.
- Tweak one role by spreading: `{ ...brand.light, primary: '#…' }`.
- To switch themes at runtime, keep them in state and pass them as `lightTheme` / `darkTheme`.
- Ready-made: `baseLightTheme` / `baseDarkTheme` (purple, the default), `monochromeLightTheme` / `monochromeDarkTheme`.

## Theme roles

`Theme` is an object of color strings. Each `x` has an `onX` for text on it.

| Role | Used for |
| --- | --- |
| `background` / `onBackground` / `onBackgroundMuted` | Page and body text; muted is secondary text |
| `container` / `onContainer` | Neutral fills: cards, chips, inputs, "secondary" buttons |
| `surface` / `onSurface` | Navigation, menus, dialogs, sheets |
| `primary` / `onPrimary`, `primaryContainer` / `onPrimaryContainer` | Brand color |
| `tonal` / `onTonal`, `tonalContainer` / `onTonalContainer` | Softer accent: selected states, tonal buttons |
| `error`, `warning`, `success` (+ `on…`, `…Container`, `on…Container`) | Status colors |
| `outline` | Borders of inputs and outlined controls |
| `divider` | Lines between content |
| `inverseSurface`, `inverseOnSurface`, `inversePrimary` (optional) | Tooltips, snackbars |
| `shadow`, `scrim` (optional) | Shadow color, dialog backdrop |

Each role is a CSS variable in kebab case: `primaryContainer` → `var(--avl-color-primary-container)`.

## Component colors (`color` prop)

Components take `color` from these roles only:

```ts
type ComponentColor =
    | 'primary'
    | 'tonal'
    | 'success'
    | 'warning'
    | 'error'
    | 'container'
    | 'surface'
type ComponentFillType = 'filled' | 'outlined' | 'text'
```

There is no `secondary`, `danger`, `destructive`, `info` or `default`. Use `tonal` or `container` for secondary actions and `error` for destructive ones.

## Tokens

```tsx
import { AnvilRoot, baseDesignTokens } from 'anvilui'

export function App() {
    return (
        <AnvilRoot
            tokens={{
                // A category replaces the whole default one, so spread it
                radius: {
                    ...baseDesignTokens.radius,
                    medium: '8px',
                    large: '12px',
                },
                font: {
                    main: 'Inter, sans-serif',
                    title: 'Inter, sans-serif',
                    mono: 'monospace',
                },
            }}
        >
            <main />
        </AnvilRoot>
    )
}
```

| Category | Keys | CSS variables |
| --- | --- | --- |
| `spacing` | a number (px), default `4` | `--avl-spacing-x1` … `--avl-spacing-x20` |
| `font` | `main`, `title`, `mono` | `--avl-font-main` … |
| `fontSize` | `body`, `caption`, `labelSmall`, `label`, `labelLarge`, `h1`–`h6` | `--avl-font-size-label-small` … |
| `fontWeight` | `regular`, `medium`, `semibold`, `bold` | `--avl-font-weight-bold` … |
| `radius` | `small`, `medium`, `large`, `button`, `full` | `--avl-radius-medium` … |
| `shadow` | `small`, `medium`, `large` | `--avl-shadow-small` … |
| `ease` | `out`, `in`, `smooth`, `bounce` | `--avl-ease-out` … |
| `easeLength` | `short`, `normal`, `slow` | `--avl-ease-length-short` … |
| `outlineSize`, `disabledOpacity` | strings | `--avl-outline-size`, `--avl-disabled-opacity` |
