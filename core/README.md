# anvilui

React components built on [Base UI](https://base-ui.com). Requires React 19.

```sh
npm install anvilui
```

## Using with AI coding agents

AnvilUI is new, so AI models don't know its API and will guess it from other libraries. The package ships accurate, version-matched docs for agents: [`AGENTS.md`](AGENTS.md) plus one page per component in [`docs/`](docs/llms-index.md).

Tell your agent to read them. Paste this into your project's `AGENTS.md`, `CLAUDE.md`, `.cursorrules` or `.github/copilot-instructions.md`:

```md
## AnvilUI

This project uses the `anvilui` React component library. Its API differs from shadcn/ui, Radix and MUI, so don't guess it. Before writing or changing UI code that uses it, read `node_modules/anvilui/AGENTS.md`, then the page for each component you use in `node_modules/anvilui/docs/` (index: `node_modules/anvilui/docs/llms-index.md`). These docs match the installed version; prefer them over memory.
```

Or run this once in your project, which appends that note to whichever of those files exist (or creates `AGENTS.md`):

```sh
npx anvilui setup-agents
```

In development, mistakes like a missing stylesheet, `asChild`, `variant` or a missing `aria-label` log an `[anvilui]` error that shows the fix and names the doc page, so pasting the console output back to your agent is enough. These checks are removed from production builds.

## Setup

### 1. Load the fonts

AnvilUI does not load any fonts by itself. The default theme uses Google Sans and Google Sans Code - if you intend to use them, add this to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght,MONO@0,300..800,1;1,300..800,1&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
/>
```

To use different fonts, pass `tokens.font` to `AnvilRoot` and load the font yourself instead of Google Sans.

### 2. Wrap your app in `AnvilRoot`

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

const theme = createTheme('#0B6E4F') // optional: { tonal: '#…' }
// or, in the browser: from an <img>, a File/Blob, or a CORS-enabled URL
const theme = await createThemeFromImage(file)

<AnvilRoot lightTheme={theme.light} darkTheme={theme.dark}>
```

Each color keeps the lightness of the base theme, so text stays readable; only the hue and colorfulness change. Error, warning and success colors stay the same. Tweak any role by spreading: `{ ...theme.light, primary: '#…' }`.

## Morphing between views

`morph(id, update)` grows one element into another while the view changes, like a list row opening into its detail page. Give both elements the same `data-morph-id`. They can be any elements, including your own markup.

```tsx
import { morph } from 'anvilui'

function Albums() {
    const [open, setOpen] = useState<string | null>(null)

    if (open) {
        return (
            <section data-morph-id={open}>
                <button onClick={() => morph(open, () => setOpen(null))}>
                    Back
                </button>
            </section>
        )
    }
    return albums.map((a) => (
        <button
            key={a.id}
            data-morph-id={a.id}
            onClick={() => morph(a.id, () => setOpen(a.id))}
        >
            {a.title}
        </button>
    ))
}
```

- The box's size, position, background, corners and shadow animate from one element to the other. Their content crossfades.
- `update` must change the view synchronously: set React state, or call your router with its sync option (React Router: `navigate(to, { flushSync: true })`). A view that waits on data or a lazy route has nothing to morph into yet.
- It returns a promise that resolves when the morph ends, e.g. to move focus afterwards: `await morph(id, close); row.focus()`.
- Pass `{ duration, easing }` as a third argument to override the theme's `easeLength.slow` and `ease.smooth`.
- Have the elements themselves rather than an id? Use `morphBetween(fromEl, update, () => toEl, options)`. The target is a function because it usually only exists after `update` runs.
- Without View Transitions support, or with reduced motion on, `update` just runs.

`Dialog` and `Popover` take a `morph` prop that does this between the trigger and the popup.
