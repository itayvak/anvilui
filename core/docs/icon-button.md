# IconButton

A round button with only an icon. `aria-label` is required.

```ts
import { IconButton } from 'anvilui'
import type { IconButtonProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `MaterialSymbol` | required | Icon name, e.g. `'delete'`. |
| `aria-label` | `string` | required | What the button does. |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `color` | `ComponentColor` | `'primary'` | |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | 32, 40 or 48px, like `Button`. |
| `disabled` | `boolean` | `false` | |

Takes no `children`. Also takes Base UI Button props and `<button>` attributes.

## Example

```tsx
import { IconButton, Tooltip } from 'anvilui'

export function Example() {
    return (
        <>
            <IconButton icon="add" aria-label="Add" />
            {/* The usual "toolbar" look: no fill, neutral color */}
            <IconButton
                icon="more_vert"
                aria-label="More options"
                fillType="text"
                color="container"
            />
            <Tooltip label="Delete">
                <IconButton
                    icon="delete"
                    aria-label="Delete"
                    fillType="outlined"
                    color="error"
                />
            </Tooltip>
        </>
    )
}
```

## Notes

- Default is a filled primary circle. For plain icon buttons in bars and lists, use `fillType="text" color="container"`.
- On/off icon buttons (favorite, bold): `<Toggle icon="favorite" aria-label="Favorite" />` ([toggle.md](toggle.md)).
