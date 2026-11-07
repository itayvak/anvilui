# Slider

Pick a number, or a range with several handles. Needs `label` or `aria-label`.

```ts
import { Slider } from 'anvilui'
import type { SliderProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | | Visible label above. Either this or `aria-label`. |
| `aria-label` | `string` | | |
| `value` / `defaultValue` | `number` or `number[]` | | An array makes a range with that many handles. |
| `onValueChange` | `(value, details) => void` | | While dragging. Gets the value, not an event: `number` when `value` is a number, `number[]` when it's an array, so a `useState` setter can be passed directly. |
| `onValueCommitted` | `(value, details) => void` | | On release. |
| `min` / `max` / `step` | `number` | `0` / `100` / `1` | |
| `showValue` | `boolean` | `true` | Value bubble while dragging or focused. |
| `squiggly` | `boolean` | `false` | Wavy track (horizontal only). Changing it animates: the wave flattens into the plain track and back, e.g. `squiggly={playing}` on a media seek bar. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical is 160px tall; set height via `className`. |
| `format` | `Intl.NumberFormatOptions` | | Formats the bubble. |
| `disabled`, `name` | | | |

Base UI docs: `node_modules/@base-ui/react/docs/react/components/slider.md`.

```tsx
import { useState } from 'react'
import { Slider } from 'anvilui'

export function Example() {
    const [volume, setVolume] = useState(40)
    const [price, setPrice] = useState([20, 80])
    return (
        <div style={{ display: 'grid', gap: 24, width: 300 }}>
            <Slider label="Volume" value={volume} onValueChange={setVolume} />
            <Slider
                aria-label="Price"
                value={price}
                onValueChange={setPrice}
                min={0}
                max={200}
                format={{ style: 'currency', currency: 'USD' }}
            />
        </div>
    )
}
```
