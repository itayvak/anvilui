# Search, SearchItem

A Material 3 search bar, with an optional suggestion list. `aria-label` is required. For suggestions, **children are a render function** over `items`; without children it's a plain search bar. The value is the typed text.

```ts
import { Search, SearchItem } from 'anvilui'
import type { SearchProps, SearchItemProps } from 'anvilui'
```

## Search props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | required | |
| `children` | `(item: Item, index: number) => ReactNode` | | Renders one `SearchItem`. Leave out for a plain search bar. |
| `items` | `readonly Item[]` | | Suggestions, filtered as you type. Pass `[]` for none. |
| `value` / `defaultValue` | `string` | | The typed text. |
| `onValueChange` | `(text: string, details) => void` | | |
| `placeholder` | `string` | | |
| `empty` | `ReactNode` | | Shown when nothing matches. |
| `color` | `'surface' \| 'container'` | `'surface'` | The bar's background. Use `'container'` on a `surface` panel (drawer, sidebar) so the bar doesn't blend in. No other colors and no `fillType`. |
| `clearLabel` | `string` | `'Clear'` | Name of the clear button. |
| `className`, `style` | | | On the bar. |
| `ref`, `id`, `aria-*`, `data-*` | | | On the text `<input>`. |
| `itemToStringValue`, `filter`, `limit`, `openOnInputClick` | | | Base UI Autocomplete.Root props. |

## SearchItem props

`value: Item` (required), `startIcon?: MaterialSymbol`, `children`.

```tsx
import { useState } from 'react'
import { Search, SearchItem } from 'anvilui'

const recent = ['invoices', 'travel', 'receipts']

export function Example() {
    const [query, setQuery] = useState('')
    return (
        <Search
            aria-label="Search mail"
            placeholder="Search mail"
            items={recent}
            value={query}
            onValueChange={setQuery}
        >
            {(item: string) => (
                <SearchItem key={item} value={item} startIcon="history">
                    {item}
                </SearchItem>
            )}
        </Search>
    )
}
```

To filter a page's own content, leave out `items` and children. It's then a plain search bar (with the clear button) that never opens a list; filter your data with the typed text:

```tsx
import { useState } from 'react'
import { List, ListItem, Search } from 'anvilui'

const people = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper']

export function FilterExample() {
    const [query, setQuery] = useState('')
    const shown = people.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    return (
        <>
            <Search aria-label="Filter people" placeholder="Filter people" value={query} onValueChange={setQuery} />
            <List>
                {shown.map((p) => <ListItem key={p} label={p} />)}
            </List>
        </>
    )
}
```
