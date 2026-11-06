# Popover

A floating panel anchored to its trigger, for content users interact with.

```ts
import {
    Popover,
    PopoverTrigger,
    PopoverPopup,
    PopoverTitle,
    PopoverDescription,
    PopoverClose,
} from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `Popover` | nothing (state) | `open` / `defaultOpen` / `onOpenChange`, `modal`, `morph` |
| `PopoverTrigger` | bare `<button>` | `render={<Button />}`; `openOnHover`, `delay` |
| `PopoverPopup` | portal + positioner + panel | `side` (`'top' \| 'bottom' \| 'left' \| 'right' \| 'inline-start' \| 'inline-end'`, default `'bottom'`), `align` (`'start' \| 'center' \| 'end'`), `sideOffset` (4), `alignOffset`, `anchor` |
| `PopoverTitle` | `<h2>` | `render={<h3 />}` to change level |
| `PopoverDescription` | `<p>` | |
| `PopoverClose` | bare `<button>` | `render={<IconButton icon="close" aria-label="Close" />}` |

There is no `PopoverContent`; `side` / `align` go on `PopoverPopup`.

```tsx
import {
    Button,
    IconButton,
    Input,
    Popover,
    PopoverClose,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
} from 'anvilui'

export function Example() {
    return (
        <Popover>
            <PopoverTrigger
                render={<Button fillType="outlined" startIcon="filter_list" />}
            >
                Filters
            </PopoverTrigger>
            <PopoverPopup
                side="bottom"
                align="start"
                style={{ display: 'grid', gap: 12, width: 280 }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <PopoverTitle>Filters</PopoverTitle>
                    <PopoverClose
                        render={
                            <IconButton
                                icon="close"
                                aria-label="Close"
                                fillType="text"
                                color="container"
                            />
                        }
                    />
                </div>
                <Input label="Min price" type="number" />
            </PopoverPopup>
        </Popover>
    )
}
```

For a hint on hover use [Tooltip](tooltip.md); for a hover preview of a link, [PreviewCard](preview-card.md).
