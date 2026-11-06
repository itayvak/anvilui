# AvatarGroup

A row of overlapping `Avatar`s that fans out on hover. Renders a `<div role="group">` and takes `<div>` props; give it an `aria-label`. Set `size` on the group, not on each Avatar.

```ts
import { AvatarGroup, Avatar } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `max` | `number` | no limit | Past it, the last spot becomes "+N". |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | Applies to every avatar inside. |
| `fan` | `boolean` | `true` | Spread on hover/focus. |

```tsx
import { Avatar, AvatarGroup } from 'anvilui'

const people = [
    'Ada Lovelace',
    'Alan Turing',
    'Grace Hopper',
    'Linus Torvalds',
    'Margaret Hamilton',
]

export function Example() {
    return (
        <AvatarGroup max={4} aria-label="Project members">
            {people.map((name) => (
                <Avatar key={name} name={name} />
            ))}
        </AvatarGroup>
    )
}
```
