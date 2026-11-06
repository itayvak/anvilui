# DateInput

A text field for a date, typed in the user's locale format or picked from a calendar popup. **The value is a `"YYYY-MM-DD"` string, not a `Date`.**

```ts
import { DateInput } from 'anvilui'
import type { DateInputProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string \| null` | `null` | `"YYYY-MM-DD"`. |
| `onValueChange` | `(value: string \| null) => void` | | `null` when cleared. |
| `label` | `ReactNode` | | Either this or `aria-label`. |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `className` | `string` | | On the wrapper. |
| `disabled`, `required`, `id`, `onBlur` | | | On the `<input>`. |

No `min` / `max` / disabled dates.

```tsx
import { useState } from 'react'
import { DateInput } from 'anvilui'

export function Example() {
    const [start, setStart] = useState<string | null>('2026-11-06')
    return (
        <form>
            <DateInput
                label="Start date"
                value={start}
                onValueChange={setStart}
            />
            {/* `name` on DateInput would submit the locale-formatted text; submit the ISO value like this */}
            <input type="hidden" name="start" value={start ?? ''} />
        </form>
    )
}
```

Convert: `new Date(value + 'T00:00')` for a local `Date`; back with `date.toISOString().slice(0, 10)` (UTC) or format it yourself.
