# PinInput

One box per character, for verification codes and PINs. `length` is required.

```ts
import { PinInput } from 'anvilui'
import type { PinInputProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | required | Number of boxes. |
| `label` | `ReactNode` | | Either this or `aria-label`. |
| `value` / `defaultValue` | `string` | | |
| `onValueChange` | `(value: string, details) => void` | | |
| `onValueComplete` | `(value: string, details) => void` | | When every box is filled. |
| `validationType` | `'numeric' \| 'alpha' \| 'alphanumeric' \| 'none'` | `'numeric'` | |
| `mask` | `boolean` | `false` | Hide characters. |
| `fillType` | `'filled' \| 'outlined'` | `'outlined'` | |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `name`, `disabled`, `required`, `autoSubmit` | | | |
| `className`, `style` | | | On the wrapper; `ref` goes on the group of boxes. |

```tsx
import { PinInput } from 'anvilui'

export function Example() {
    return (
        <PinInput
            label="Verification code"
            length={6}
            onValueComplete={(code) => console.log(code)}
        />
    )
}
```

Base UI docs: `node_modules/@base-ui/react/docs/react/components/otp-field.md`.
