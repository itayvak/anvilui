# morph and morphBetween

Animate one element growing into another while the view changes (Material's container transform), using View Transitions.

```ts
import { morph, morphBetween } from 'anvilui'
import type { MorphOptions } from 'anvilui'

morph(id: string, update: () => void, options?: MorphOptions): Promise<void>
morphBetween(from: HTMLElement, update: () => void, getTo: () => HTMLElement | null, options?: MorphOptions): Promise<void>
type MorphOptions = { duration?: number /* ms */; easing?: string }
```

```tsx
import { useState } from 'react'
import { Button, Card, CardTitle, morph } from 'anvilui'

const albums = [
    { id: 'a1', title: 'Blue' },
    { id: 'a2', title: 'Red' },
]

export function Albums() {
    const [open, setOpen] = useState<string | null>(null)

    if (open) {
        return (
            <Card data-morph-id={open} style={{ minHeight: 300 }}>
                <Button onClick={() => morph(open, () => setOpen(null))}>
                    Back
                </Button>
            </Card>
        )
    }
    return albums.map((a) => (
        <Card
            key={a.id}
            clickable
            data-morph-id={a.id}
            onClick={() => morph(a.id, () => setOpen(a.id))}
        >
            <CardTitle>{a.title}</CardTitle>
        </Card>
    ))
}
```

- Give both elements the same `data-morph-id`.
- `update` must change the view **synchronously** (set state, or `navigate(to, { flushSync: true })` in React Router). A view that waits on data or a lazy route has nothing to morph into yet.
- The box's size, position, background, corners and shadow animate; the content crossfades.
- It returns a promise that resolves when the morph ends, e.g. to move focus: `await morph(id, close); row.focus()`.
- `duration` and `easing` default to the theme's `easeLength.slow` and `ease.smooth`.
- Without View Transitions support, or with reduced motion, `update` just runs.
- `Dialog` and `Popover` take `morph` (boolean) to do this between their trigger and popup.
