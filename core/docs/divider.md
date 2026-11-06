# Divider

A thin line between groups of content. Renders a separator `<div>`.

```ts
import { Divider } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical stretches to its flex row's height. |
| `label` | `ReactNode` | | Text in the middle ("or"). |
| `squiggly` | `boolean` | `false` | Wavy line. |

```tsx
import { Divider } from 'anvilui'

export function Example() {
    return (
        <>
            <Divider />
            <Divider label="or" />
            <div style={{ display: 'flex', gap: 8, height: 24 }}>
                <span>Left</span>
                <Divider orientation="vertical" />
                <span>Right</span>
            </div>
        </>
    )
}
```
