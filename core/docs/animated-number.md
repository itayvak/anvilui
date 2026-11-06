# AnimatedNumber

A number whose digits roll like an odometer when `value` changes. Renders a `<span>`.

```ts
import { AnimatedNumber } from 'anvilui'
```

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `number` | Required. |
| `format` | `Intl.NumberFormatOptions` | Currency, percent, compact, decimals. |
| `locales` | `Intl.LocalesArgument` | Default: the browser's. |

```tsx
import { useState } from 'react'
import { AnimatedNumber, Button } from 'anvilui'

export function Example() {
    const [count, setCount] = useState(1200)
    return (
        <>
            <AnimatedNumber
                value={count}
                format={{ style: 'currency', currency: 'USD' }}
            />
            <Button onClick={() => setCount(count + 99)}>Add</Button>
        </>
    )
}
```
