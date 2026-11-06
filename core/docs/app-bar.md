# AppBar

The bar across the top of a screen: title, navigation button, actions. Renders a `<header>`. The title is the **`label` prop**, not children.

```ts
import { AppBar } from 'anvilui'
import type { AppBarProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | required | The title. |
| `labelAs` | `'p' \| 'span' \| 'div' \| 'h1' … 'h6'` | `'div'` | Tag for the title; `'h1'` when it's the page heading. |
| `start` | `ReactNode` | | Before the title (menu or back `IconButton`). |
| `end` | `ReactNode` | | After the title (action `IconButton`s, `Avatar`). |
| `size` | `'normal' \| 'big'` | `'normal'` | `big` puts a larger title on its own row. |
| `centered` | `boolean` | `false` | Center the title (normal size only). |
| `color` | `ComponentColor` | `'container'` | Matches navigation surfaces. |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | `text` makes it the page color. |

Minimum height: 64px (`size="normal"`), 152px (`size="big"`). Not sticky by default: add `style={{ position: 'sticky', top: 0, zIndex: 1 }}`.

```tsx
import { AppBar, Avatar, IconButton } from 'anvilui'

export function Example() {
    return (
        <AppBar
            label="Inbox"
            labelAs="h1"
            start={
                <IconButton
                    icon="menu"
                    aria-label="Open navigation"
                    fillType="text"
                    color="container"
                />
            }
            end={
                <>
                    <IconButton
                        icon="search"
                        aria-label="Search"
                        fillType="text"
                        color="container"
                    />
                    <Avatar name="Ada Lovelace" size="small" />
                </>
            }
        />
    )
}
```
