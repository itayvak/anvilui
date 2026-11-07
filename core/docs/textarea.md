# Textarea

A multi-line text field. Same API as [Input](input.md), with `<textarea>` attributes (`rows`, …).

```ts
import { Textarea } from 'anvilui'
import type { TextareaProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | | Floating label. |
| `size` | `'small' \| 'normal'` | `'normal'` | |
| `onValueChange` | `(value: string, details) => void` | | Or native `onChange`. |
| `className`, `style` | | | On the wrapper; `ref` and other props go on the `<textarea>`. |

```tsx
import { Textarea } from 'anvilui'

export function Example() {
    return <Textarea label="Message" name="message" rows={4} />
}
```
