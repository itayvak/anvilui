# anvilui

React components built on [Base UI](https://base-ui.com).

## Setup

```tsx
import { AnvilRoot, Button } from 'anvilui'
import 'anvilui/styles.css'

export function App() {
    return (
        <AnvilRoot defaultColorMode="light">
            <Button>Hello</Button>
        </AnvilRoot>
    )
}
```

- **Fonts:** the base tokens use Google Sans and Google Sans Code, which the library doesn't load. Add them yourself (e.g. a Google Fonts `<link>`), or pass your own `tokens.font` to `AnvilRoot`.
- **Icons:** components import `material-symbols/rounded.css`, so your bundler needs to handle CSS and font files from `node_modules` (Vite, Next and webpack setups do by default).
- Styles only apply inside `AnvilRoot`; nothing outside it is touched. To theme the whole page, give it a `className` that fills the viewport (`min-height: 100vh`).

## Color mode and themes

The color mode is `'light'`, `'dark'` or `'system'` (the default, which follows the OS setting live). Pass `storageKey="my-app-color-mode"` to remember the user's choice; with server rendering the saved mode is applied before the first paint, so there's no flash. Read or change the mode anywhere inside with `useAnvil()`:

```tsx
// colorMode is what's shown ('light' | 'dark'); colorModeSetting may be 'system'
const { colorMode, colorModeSetting, setColorMode } = useAnvil()
```

To switch themes at runtime, keep them in state and pass them as `lightTheme` / `darkTheme`.

## Making a theme

Generate a light and a dark theme from one color, or from the main colors of an image:

```tsx
import { createTheme, createThemeFromImage } from 'anvilui'

const theme = createTheme('#0B6E4F') // optional: { secondary: '#…' }
// or, in the browser: from an <img>, a File/Blob, or a CORS-enabled URL
const theme = await createThemeFromImage(file)

<AnvilRoot lightTheme={theme.light} darkTheme={theme.dark}>
```

Each color keeps the lightness of the base theme, so text stays readable; only the hue and colorfulness change. Error, warning and success colors stay the same. Tweak any role by spreading: `{ ...theme.light, primary: '#…' }`.
