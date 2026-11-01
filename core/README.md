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
