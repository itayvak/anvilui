# Tooltip

A short hint on hover or keyboard focus. **One component, no parts.** The text is `label`; the single child element is the trigger.

```ts
import { Tooltip } from 'anvilui'
import type { TooltipProps } from 'anvilui'
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | required | The hint text (not `content` or `title`). |
| `children` | `ReactElement` | required | Exactly one element that takes a ref and passes props through (all AnvilUI components do). |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'inline-start' \| 'inline-end'` | `'top'` | |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | |
| `sideOffset`, `alignOffset` | `number` | `4`, `0` | |
| `delay`, `closeDelay` | `number` (ms) | | Hover timing. |
| `open` / `defaultOpen` / `onOpenChange` | | | |
| `className` | `string` | | On the bubble. |

There is no `TooltipTrigger`, `TooltipContent` or `TooltipProvider` (AnvilRoot provides it).

```tsx
import { IconButton, Tooltip } from 'anvilui'

export function Example() {
    return (
        <Tooltip label="Delete" side="bottom">
            <IconButton
                icon="delete"
                aria-label="Delete"
                fillType="text"
                color="container"
            />
        </Tooltip>
    )
}
```

- A tooltip is not an accessible name: still give icon buttons `aria-label`.
- On plain text, wrap it in a focusable element: `<Tooltip label="…"><span tabIndex={0}>text</span></Tooltip>`.
- Disabled buttons don't get hover events; wrap them in a `<span>`.
