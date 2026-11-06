# Badge

A dot or count on the corner of what it wraps, or inline on its own. Error-colored by default. Hidden from screen readers.

```ts
import { Badge } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | | Omit for a dot; `0` hides it. |
| `max` | `number` | `999` | Above shows "999+". |
| `color` | `ComponentColor` | `'error'` | |
| `children` | `ReactNode` | | What it sits on. |

No `content` / `badgeContent` / `variant`.

```tsx
import { Badge, Icon, IconButton } from 'anvilui'

export function Example() {
    return (
        <>
            <Badge count={3}>
                <IconButton
                    icon="mail"
                    aria-label="Inbox, 3 unread"
                    fillType="text"
                    color="container"
                />
            </Badge>
            <Badge>
                <Icon name="notifications" />
            </Badge>
            <Badge count={12} color="primary" />
        </>
    )
}
```

Put the count in the wrapped element's `aria-label` too. On a non-interactive icon, label the icon: `<Badge count={4}><Icon name="chat_bubble" aria-label="4 comments" /></Badge>`.
