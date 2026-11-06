# useConfetti

A hook that returns a function firing a burst of confetti in the theme's colors. Does nothing with reduced motion on.

```ts
import { useConfetti } from 'anvilui'
import type { ConfettiOptions, ConfettiOrigin } from 'anvilui'

const fire = useConfetti()
fire(origin?: Element | { x: number; y: number }, options?: ConfettiOptions): void
```

| Option | Type | Default |
| --- | --- | --- |
| `count` | `number` | `80` |
| `angle` | `number` (degrees, 0 = up) | `0` |
| `spread` | `number` (degrees) | `70` |
| `power` | `number` | `1` |
| `colors` | `ComponentColor[]` | `['primary', 'tonal', 'success', 'warning', 'error']` |

```tsx
import { Button, useConfetti } from 'anvilui'

export function Celebrate() {
    const fire = useConfetti()
    return <Button onClick={(e) => fire(e.currentTarget)}>Celebrate</Button>
}
```

Without an origin it bursts from the bottom middle of the screen. Must be inside `AnvilRoot`.
