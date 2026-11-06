# Card

A rounded surface that groups content. Neutral `container` color by default.

```ts
import { Card, CardTitle, CardContent, CardActions } from 'anvilui'
import type {
    CardProps,
    CardTitleProps,
    CardContentProps,
    CardActionsProps,
} from 'anvilui'
```

## Card props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `ComponentColor` | `'container'` | |
| `fillType` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | |
| `clickable` | `boolean` | `false` | The whole card becomes one button (Base UI Button props: `onClick`, `disabled`, `render`). Buttons and links inside still work on their own. |

A plain card takes `<div>` props.

## Parts

| Part | Renders | Notes |
| --- | --- | --- |
| `CardTitle` | `<div>` styled as h6 | Pass `as="h2"` (etc.) for a real heading; `type` changes the look. [Typography](typography.md) props. |
| `CardContent` | `<div>` | Padded body. |
| `CardActions` | `<div>` | Button row aligned to the end. |

There is **no** `CardHeader`, `CardFooter`, `CardDescription` or `CardMedia`. Put an `<img>` directly inside the card.

```tsx
import { Button, Card, CardActions, CardContent, CardTitle } from 'anvilui'

export function Example() {
    return (
        <div
            style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
        >
            <Card>
                <CardTitle as="h2">Storage</CardTitle>
                <CardContent>You've used 80% of your space.</CardContent>
                <CardActions>
                    <Button fillType="text">Dismiss</Button>
                    <Button>Upgrade</Button>
                </CardActions>
            </Card>

            <Card
                clickable
                onClick={() => console.log('open')}
                fillType="outlined"
            >
                <CardTitle>Open project</CardTitle>
                <CardContent>Last edited today</CardContent>
            </Card>

            <Card clickable render={<a href="/billing" />}>
                <CardTitle>Billing</CardTitle>
            </Card>
        </div>
    )
}
```
