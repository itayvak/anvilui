# PreviewCard

A card shown while hovering or focusing a link. Hover-only: nothing inside should need clicking (use [Popover](popover.md) for that).

```ts
import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `PreviewCard` | nothing (state) | `open` / `defaultOpen` / `onOpenChange` |
| `PreviewCardTrigger` | `<a>` | `href`, `delay`, `closeDelay`; `render={<Link to="..." />}` for routers |
| `PreviewCardPopup` | portal + positioner + card | `side`, `align`, `sideOffset` (8), `alignOffset` |

```tsx
import {
    Avatar,
    PreviewCard,
    PreviewCardPopup,
    PreviewCardTrigger,
    Typography,
} from 'anvilui'

export function Example() {
    return (
        <Typography>
            Written by{' '}
            <PreviewCard>
                <PreviewCardTrigger href="/users/ada">@ada</PreviewCardTrigger>
                <PreviewCardPopup
                    style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                >
                    <Avatar name="Ada Lovelace" />
                    <span>Ada Lovelace · 12 posts</span>
                </PreviewCardPopup>
            </PreviewCard>
        </Typography>
    )
}
```
