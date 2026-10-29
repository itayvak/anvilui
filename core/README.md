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
- Styles only apply inside `AnvilRoot`; nothing outside it is touched.
