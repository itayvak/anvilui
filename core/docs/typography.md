# Typography

Text in the theme's type scale.

```ts
import { Typography } from 'anvilui'
import type { TypographyProps, TypographyType, TypographyTag } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'body' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'body'` | The look (not `variant`). |
| `as` | `'p' \| 'span' \| 'div' \| 'h1' … 'h6'` | from `type` | The tag. `body` → `<p>`, `caption` → `<span>`, `hN` → `<hN>`. |

Plus `<p>` props (`id`, `className`, `aria-*`, … all pass through to the rendered tag). No `color`, `weight`, `align` or `gutterBottom`: use `style` or CSS (`color: 'var(--avl-color-on-background-muted)'` for secondary text).

```tsx
import { Typography } from 'anvilui'

export function Example() {
    return (
        <>
            <Typography type="h3" as="h1">
                Settings
            </Typography>
            <Typography type="h6" as="h2">
                Notifications
            </Typography>
            <Typography>Choose what you hear about.</Typography>
            <Typography
                type="caption"
                style={{ color: 'var(--avl-color-on-background-muted)' }}
            >
                Updated 2 minutes ago
            </Typography>
        </>
    )
}
```

Sizes (default tokens): h1 57px, h2 45px, h3 36px, h4 32px, h5 28px, h6 24px, body 16px, caption 12px. h1–h3 are display sizes; page titles usually use `h4`–`h6`.
