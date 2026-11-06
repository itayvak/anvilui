# FloatingToolbar

A floating pill of icon buttons with arrow-key navigation. You position it.

```ts
import {
    FloatingToolbar,
    FloatingToolbarButton,
    FloatingToolbarSeparator,
} from 'anvilui'
```

| Part | Props |
| --- | --- |
| `FloatingToolbar` | `aria-label`; `inverseColor?: boolean` (default `false`); Base UI Toolbar.Root props (`orientation`) |
| `FloatingToolbarButton` | `IconButton` props (`icon`, `aria-label` required). Default `fillType="text"`; `fillType="filled"` makes the highlighted one. |
| `FloatingToolbarSeparator` | |

```tsx
import {
    FloatingToolbar,
    FloatingToolbarButton,
    FloatingToolbarSeparator,
} from 'anvilui'

export function Example() {
    return (
        <FloatingToolbar
            aria-label="Formatting"
            style={{
                position: 'fixed',
                bottom: 24,
                left: '50%',
                translate: '-50%',
            }}
        >
            <FloatingToolbarButton icon="format_bold" aria-label="Bold" />
            <FloatingToolbarButton icon="format_italic" aria-label="Italic" />
            <FloatingToolbarSeparator />
            <FloatingToolbarButton
                icon="send"
                aria-label="Send"
                fillType="filled"
            />
        </FloatingToolbar>
    )
}
```
