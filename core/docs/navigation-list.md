# NavigationList

A column of text-only navigation links, like a docs or settings sidebar.

```ts
import { NavigationList, NavigationListItem } from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `NavigationList` | `<nav>` | `aria-label` |
| `NavigationListItem` | `<a>` | `label: string` (required; not children), `active`, `href`, `render` |

```tsx
import { NavigationList, NavigationListItem } from 'anvilui'

export function SettingsNav({ section }: { section: string }) {
    return (
        <NavigationList aria-label="Settings">
            <NavigationListItem
                label="Profile"
                href="#profile"
                active={section === 'profile'}
            />
            <NavigationListItem
                label="Notifications"
                href="#notifications"
                active={section === 'notifications'}
            />
            <NavigationListItem
                label="Billing"
                href="#billing"
                active={section === 'billing'}
            />
        </NavigationList>
    )
}
```

For in-page switching without URLs: `render={<button type="button" onClick={() => setSection('billing')} />}`.
