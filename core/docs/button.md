# Button

A button with a text label and optional icons. Renders a `<button type="button">`.

```ts
import { Button } from 'anvilui'
import type { ButtonProps } from 'anvilui'
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | The style (other libraries call this `variant`). |
| `color` | `ComponentColor` | `'primary'` | `primary`, `tonal`, `success`, `warning`, `error`, `container`, `surface`. |
| `size` | `'small' \| 'normal' \| 'big'` | `'normal'` | 32, 40 or 48px tall. |
| `startIcon` | `MaterialSymbol` | | Icon name before the label, e.g. `'add'`. |
| `endIcon` | `MaterialSymbol` | | Icon name after the label. |
| `loading` | `boolean` | `false` | Spinner in place of `startIcon`; ignores clicks; keeps focus. |
| `disabled` | `boolean` | `false` | |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Pass `'submit'` in forms. |
| `render` | `ReactElement` | | Render as another element, e.g. `<a href>` (+ `nativeButton={false}`). |

Also takes Base UI Button props (`focusableWhenDisabled`, `nativeButton`) and all `<button>` attributes. Base UI docs: `node_modules/@base-ui/react/docs/react/components/button.md`.

## Example

```tsx
import { useState } from 'react'
import { Button } from 'anvilui'

export function Example() {
    const [saving, setSaving] = useState(false)
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <Button startIcon="add">New</Button>
            <Button fillType="outlined" color="container">
                Cancel
            </Button>
            <Button fillType="text">Learn more</Button>
            <Button color="error" startIcon="delete">
                Delete
            </Button>
            <Button loading={saving} onClick={() => setSaving(true)}>
                {saving ? 'Saving' : 'Save'}
            </Button>
            <Button
                render={<a href="/docs" />}
                nativeButton={false}
                endIcon="arrow_forward"
            >
                Docs
            </Button>
        </div>
    )
}
```

## Notes

- Mapping from other libraries: `variant="outline"` → `fillType="outlined"`, `variant="ghost" | "link"` → `fillType="text"`, `variant="secondary"` → `color="container"` or `color="tonal"`, `variant="destructive"` → `color="error"`.
- Icon-only? Use [IconButton](icon-button.md). Grouped buttons: [SplitButton](split-button.md). Hold-to-confirm: [HoldButton](hold-button.md). On/off: [Toggle](toggle.md).
- No `fullWidth` prop: use `style={{ width: '100%' }}`.
