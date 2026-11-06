# NavigationDrawer

Side navigation that slides in over the page, for small screens.

```ts
import {
    NavigationDrawer,
    NavigationDrawerTrigger,
    NavigationDrawerPopup,
    NavigationDrawerTitle,
    NavigationDrawerItem,
} from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `NavigationDrawer` | nothing (state) | `open` / `defaultOpen` / `onOpenChange` |
| `NavigationDrawerTrigger` | bare `<button>` | `render={<IconButton icon="menu" aria-label="Open navigation" />}` |
| `NavigationDrawerPopup` | portal + backdrop + panel | Put the title first, then items. |
| `NavigationDrawerTitle` | `<h2>` | Names the drawer. |
| `NavigationDrawerItem` | `<a>` that closes the drawer | `icon` (required), `label: string` (required), `active`, `end: ReactNode` (e.g. a count), `href`, `render` |

For in-page switching: `render={<button type="button" onClick={() => setView('trash')} />}`; it still closes the drawer.

```tsx
import {
    AppBar,
    IconButton,
    NavigationDrawer,
    NavigationDrawerItem,
    NavigationDrawerPopup,
    NavigationDrawerTitle,
    NavigationDrawerTrigger,
} from 'anvilui'

export function Example() {
    return (
        <AppBar
            label="Mail"
            start={
                <NavigationDrawer>
                    <NavigationDrawerTrigger
                        render={
                            <IconButton
                                icon="menu"
                                aria-label="Open navigation"
                                fillType="text"
                                color="container"
                            />
                        }
                    />
                    <NavigationDrawerPopup>
                        <NavigationDrawerTitle>Mail</NavigationDrawerTitle>
                        <NavigationDrawerItem
                            icon="inbox"
                            label="Inbox"
                            href="/inbox"
                            active
                            end="12"
                        />
                        <NavigationDrawerItem
                            icon="send"
                            label="Sent"
                            href="/sent"
                        />
                    </NavigationDrawerPopup>
                </NavigationDrawer>
            }
        />
    )
}
```
