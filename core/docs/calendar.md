# Calendar

A month grid to pick a date. **Values are `"YYYY-MM-DD"` strings.** Locale-aware (first weekday, names).

```ts
import { Calendar } from 'anvilui'
import type { CalendarProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string \| null` | `null` | |
| `onValueChange` | `(value: string) => void` | | |
| other | `<div>` props | | |

No range selection, `min` / `max` or disabled dates. For a field with a popup calendar, use [DateInput](date-input.md).

```tsx
import { useState } from 'react'
import { Calendar } from 'anvilui'

export function Example() {
    const [date, setDate] = useState<string | null>(null)
    return <Calendar value={date} onValueChange={setDate} />
}
```
