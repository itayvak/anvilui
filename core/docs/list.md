# List, ListItem

A column of rows with a label, description and start/end slots. `ListItem` takes **no children**.

```ts
import { List, ListItem } from 'anvilui'
import type { ListProps, ListItemProps } from 'anvilui'
```

## List props

`<ul>` props, plus `divided?: boolean` (lines between items, default `false`).

## ListItem props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `ReactNode` | Required. Main text. |
| `description` | `ReactNode` | Second line(s). |
| `start` | `ReactNode` | Before: `Icon`, `Avatar`, `Checkbox`. |
| `end` | `ReactNode` | After: `Switch`, `Badge`, text, `Icon`. |
| `render` | `ReactElement` | Make the row interactive: `<a href>`, `<button type="button" />`, `<label />` (toggles a control in start/end), a router `Link`. |

`end` can hold any control, including a `Toggle` (`<Toggle icon="star" aria-label="Favorite" />`) or `IconButton`; don't combine those with a row `render`, since a button inside a button or label is invalid.

Static by default (a `<div>` inside an `<li>`), with no `onClick` behavior of its own: pass `render={<button type="button" />}` for a clickable row.

```tsx
import { Avatar, Checkbox, Icon, List, ListItem, Switch } from 'anvilui'

export function Example() {
    return (
        <List divided>
            <ListItem
                label="Ada Lovelace"
                description="ada@example.com"
                start={<Avatar name="Ada Lovelace" />}
            />
            <ListItem
                label="Dark theme"
                start={<Icon name="dark_mode" />}
                end={<Switch />}
                render={<label />}
            />
            <ListItem
                label="Remember me"
                start={<Checkbox defaultChecked />}
                render={<label />}
            />
            <ListItem
                label="Account"
                end={<Icon name="chevron_right" />}
                render={<a href="/account" />}
            />
            <ListItem
                label="Sign out"
                start={<Icon name="logout" />}
                render={
                    <button type="button" onClick={() => console.log('bye')} />
                }
            />
        </List>
    )
}
```
