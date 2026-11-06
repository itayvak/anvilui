# FABMenu

A FAB that opens a stack of labeled actions. You position it.

```ts
import { FABMenu, FABMenuItem } from 'anvilui'
import type { FABMenuProps, FABMenuItemProps } from 'anvilui'
```

## FABMenu props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `MaterialSymbol` | required | Icon while closed. |
| `aria-label` | `string` | required | |
| `children` | `FABMenuItem`s | required | |
| `closeIcon` | `MaterialSymbol` | `'close'` | Icon while open. |
| `color` | `ComponentColor` | `'primary'` | Items use the role's container shade. |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'inline-start' \| 'inline-end'` | `'top'` | |
| `align` | `'start' \| 'center' \| 'end'` | `'end'` | |
| `sticky` | `boolean` | `true` | |
| `className` | `string` | | Goes on the FAB. |
| `open` / `defaultOpen` / `onOpenChange` | | | Base UI Menu.Root state. |

## FABMenuItem props

`icon: MaterialSymbol` (required), `children` (label, required), `color?: ComponentColor`, `onClick`, `disabled`, plus Base UI Menu.Item props.

```tsx
import { FABMenu, FABMenuItem } from 'anvilui'

export function Example() {
    return (
        <div style={{ position: 'fixed', insetInlineEnd: 16, bottom: 16 }}>
            <FABMenu icon="add" aria-label="Create">
                <FABMenuItem
                    icon="description"
                    onClick={() => console.log('doc')}
                >
                    Document
                </FABMenuItem>
                <FABMenuItem
                    icon="folder"
                    onClick={() => console.log('folder')}
                >
                    Folder
                </FABMenuItem>
            </FABMenu>
        </div>
    )
}
```

Needs `AnvilRoot` (the items portal into it).
