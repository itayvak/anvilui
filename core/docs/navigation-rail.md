# NavigationRail

Side navigation for medium and large screens. Collapsed: icons with small labels; expanded: labels beside icons.

```ts
import {
    NavigationRail,
    NavigationRailToggle,
    NavigationRailItem,
} from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `NavigationRail` | `<nav>` (96px wide, `height: 100%`) | `aria-label`; `expanded` / `defaultExpanded` (false) / `onExpandedChange(expanded)` |
| `NavigationRailToggle` | `IconButton` (menu icon) | `aria-label` required. Must be inside the rail. |
| `NavigationRailItem` | `<a>` | `icon` (required), `label: string` (required), `active`, `end` (short badge text, e.g. a count), `href`, `render` |

```tsx
import {
    NavigationRail,
    NavigationRailItem,
    NavigationRailToggle,
} from 'anvilui'

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NavigationRail aria-label="Main">
                <NavigationRailToggle aria-label="Toggle navigation" />
                <NavigationRailItem
                    icon="inbox"
                    label="Inbox"
                    href="/inbox"
                    active
                    end="12"
                />
                <NavigationRailItem icon="send" label="Sent" href="/sent" />
                <NavigationRailItem
                    icon="settings"
                    label="Settings"
                    href="/settings"
                />
            </NavigationRail>
            <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
        </div>
    )
}
```

In-page switching without URLs: `render={<button type="button" onClick={() => setView('inbox')} />}` with `active={view === 'inbox'}`. No `nativeButton` needed.

On small screens use [NavigationDrawer](navigation-drawer.md) or [NavigationBar](navigation-bar.md) instead.
