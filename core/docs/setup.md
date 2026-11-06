# Setup

Install, import the stylesheet, wrap the app in `AnvilRoot`. All three are required.

## Install

```sh
npm install anvilui
```

| Requirement | Version | Why |
| --- | --- | --- |
| `react`, `react-dom` | **19 or newer** | Uses React 19 features (`ref` as a prop, `<Context value>`). React 18 does not work. |
| A bundler that handles CSS imports from `node_modules` | Vite, Next.js, webpack, Parcel | `anvilui` imports `material-symbols/rounded.css` (the icon font). |
| `@base-ui/react`, `material-symbols` | installed automatically | Regular dependencies; don't install them yourself. |

## 1. Import the stylesheet once

```ts
// main.tsx, app/layout.tsx, or your entry file
import 'anvilui/styles.css'
```

Without it every component renders unstyled. In development, AnvilRoot logs `[anvilui] The AnvilUI stylesheet isn't loaded` when it's missing.

## 2. Wrap the app in `AnvilRoot`

```tsx
import { AnvilRoot, Button } from 'anvilui'
import 'anvilui/styles.css'

export function App() {
    return (
        <AnvilRoot defaultColorMode="system" className="app">
            <Button>Hello</Button>
        </AnvilRoot>
    )
}
```

`AnvilRoot` is the only provider. It:

- defines the theme as CSS variables on its own `<div class="avl-root">`. Styles only apply inside it.
- is the container that menus, dialogs, popovers, selects and tooltips portal into. Outside it they render unthemed.
- provides `useSnackbar()` (it renders the snackbar viewport) and shares tooltip delays.
- holds the color mode (`useAnvil()`).

Put it once at the top, around everything (inside `<StrictMode>` is fine). Don't nest it per page, and don't call `useAnvil()` / `useSnackbar()` in the same component that renders it.

To theme the whole page, make the root fill the viewport:

```css
.app {
    min-height: 100vh;
}
```

## 3. Fonts (optional)

The default theme uses Google Sans and Google Sans Code and falls back to the system font. AnvilUI does not load fonts. To get them, add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght,MONO@0,300..800,1;1,300..800,1&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
/>
```

Other fonts: pass `tokens={{ font: { main: '...', title: '...', mono: '...' } }}` to AnvilRoot (see [theming.md](theming.md)).

## Next.js (App Router)

`AnvilRoot` uses state and effects, so render it from a client component:

```tsx
'use client'
import { AnvilRoot } from 'anvilui'
import 'anvilui/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
    return <AnvilRoot storageKey="color-mode">{children}</AnvilRoot>
}
```

Then use `<Providers>` in `app/layout.tsx` inside `<body>`. Every AnvilUI component is interactive; use them from client components (`'use client'`). With `storageKey`, the saved color mode is applied before the first paint, with no flash.

## Without a bundler

Not supported. The package imports CSS and relies on the bundler to replace `process.env.NODE_ENV`.

## Styling your own elements

Inside AnvilRoot, theme values are CSS variables you can use in your own CSS:

| Need | Variable |
| --- | --- |
| page background / text | `var(--avl-color-background)`, `var(--avl-color-on-background)` |
| secondary text | `var(--avl-color-on-background-muted)` |
| any theme color | `var(--avl-color-<role>)`, e.g. `--avl-color-primary`, `--avl-color-on-primary`, `--avl-color-surface` |
| spacing | `var(--avl-spacing-x1)` … `var(--avl-spacing-x20)` (4px steps by default) |
| radius | `var(--avl-radius-small \| medium \| large \| full)` |
| font size | `var(--avl-font-size-body \| caption \| label \| h1 … h6)` |

There is no `Box`, `Stack`, `Grid` or `Container` component, and no `sx` prop. Use plain elements with `style` or your own CSS for layout.
