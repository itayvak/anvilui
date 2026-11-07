# Progress

A bar or ring showing progress. Needs `label` or `aria-label`.

```ts
import { Progress } from 'anvilui'
import type { ProgressProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| null` | | `null` = indeterminate (spinning / sweeping). Required by Base UI: pass `null` explicitly for loading. |
| `min` / `max` | `number` | `0` / `100` | |
| `type` | `'linear' \| 'circular' \| 'inline'` | `'linear'` | `inline` is a ring the size of the text. |
| `squiggly` | `boolean` | `false` | Wavy bar (linear only). Changing it animates: the wave flattens into the plain bar and back. |
| `label` | `ReactNode` | | Visible label. Either this or `aria-label`. |
| `aria-label` | `string` | | |

There is no `Spinner` / `CircularProgress` / `LinearProgress`: use `<Progress type="circular" value={null} aria-label="Loading" />`. For a loading button, use `<Button loading>`.

```tsx
import { Progress } from 'anvilui'

export function Example({ uploaded }: { uploaded: number }) {
    return (
        <div style={{ display: 'grid', gap: 16, width: 300 }}>
            <Progress label="Uploading" value={uploaded} />
            <Progress aria-label="Loading" value={null} squiggly />
            <Progress type="circular" aria-label="Loading" value={null} />
            <span>
                Syncing{' '}
                <Progress type="inline" aria-label="Syncing" value={null} />
            </span>
        </div>
    )
}
```
