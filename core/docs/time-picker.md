# TimePicker

A field that opens a Material 3 time picker (clock dial or typed boxes). **The value is a 24-hour `"HH:mm"` string.**

```ts
import { TimePicker } from 'anvilui'
import type { TimePickerProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `defaultValue` | `string \| null` | `null` | `"HH:mm"`, e.g. `"07:30"`, `"19:05"`. |
| `onValueChange` | `(value: string) => void` | | On every change. The user can't clear it from the picker; to clear, set `value={null}` yourself (e.g. a Clear button). |
| `type` | `'dial' \| 'input'` | `'dial'` | |
| `hourCycle` | `12 \| 24` | user's locale | 12 shows AM/PM. |
| `label` | `ReactNode` | | Either this or `aria-label`. |
| `name` | `string` | | Submits `"HH:mm"` with a form. |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `disabled` | `boolean` | `false` | |
| `open` / `defaultOpen` / `onOpenChange` | | | The popup. |
| `className`, other `<div>` props | | | On the wrapper. |

```tsx
import { useState } from 'react'
import { TimePicker } from 'anvilui'

export function Example() {
    const [time, setTime] = useState<string | null>('07:30')
    return (
        <TimePicker
            label="Alarm"
            value={time}
            onValueChange={setTime}
            hourCycle={12}
        />
    )
}
```
