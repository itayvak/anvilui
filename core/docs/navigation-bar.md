# NavigationBar

Bottom navigation for small screens: 3–5 top-level destinations. You position it (e.g. `position: sticky; bottom: 0`).

```ts
import { NavigationBar, NavigationBarItem } from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `NavigationBar` | `<nav>` | Give it `aria-label`. |
| `NavigationBarItem` | `<a>` | `icon: MaterialSymbol` (required), `label: string` (required), `active?: boolean` (sets `aria-current="page"`), `href`, `render` (router link) |

Items are links, not tabs: there's no `value` / `onValueChange`. Mark the current one with `active`.

```tsx
import { NavigationBar, NavigationBarItem } from 'anvilui'

export function Example({ path }: { path: string }) {
    return (
        <NavigationBar
            aria-label="Main"
            style={{ position: 'sticky', bottom: 0 }}
        >
            <NavigationBarItem
                icon="home"
                label="Home"
                href="/"
                active={path === '/'}
            />
            <NavigationBarItem
                icon="search"
                label="Search"
                href="/search"
                active={path === '/search'}
            />
            <NavigationBarItem
                icon="person"
                label="Profile"
                href="/profile"
                active={path === '/profile'}
            />
        </NavigationBar>
    )
}
```

With React Router: `<NavigationBarItem icon="home" label="Home" render={<Link to="/" />} active={...} />`. For client-side state instead of URLs, use `render={<button type="button" onClick={...} />}`.
