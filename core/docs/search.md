# Search, SearchItem

A Material 3 search bar with a suggestion list. `aria-label` is required. **Children are a render function** over `items`. The value is the typed text.

```ts
import { Search, SearchItem } from 'anvilui'
import type { SearchProps, SearchItemProps } from 'anvilui'
```

## Search props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | required | |
| `children` | `(item: Item, index: number) => ReactNode` | required | Renders one `SearchItem`. |
| `items` | `readonly Item[]` | | Suggestions, filtered as you type. Pass `[]` for none. |
| `value` / `defaultValue` | `string` | | The typed text. |
| `onValueChange` | `(text: string, details) => void` | | |
| `placeholder` | `string` | | |
| `empty` | `ReactNode` | | Shown when nothing matches. |
| `clearLabel` | `string` | `'Clear'` | Name of the clear button. |
| `className` | `string` | | On the bar. |
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

To filter a page's own content with no suggestion list, pass `items={[]}` and a render function that returns `null`, then filter your data with the typed text:

```tsx
import { useState } from 'react'
import { List, ListItem, Search } from 'anvilui'

const people = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper']

export function FilterExample() {
    const [query, setQuery] = useState('')
    const shown = people.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    return (
        <>
            <Search aria-label="Filter people" placeholder="Filter people" items={[]} value={query} onValueChange={setQuery}>
                {() => null}
            </Search>
            <List>
                {shown.map((p) => <ListItem key={p} label={p} />)}
            </List>
        </>
    )
}
```
