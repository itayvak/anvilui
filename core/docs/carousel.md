# Carousel

A horizontally scrolling row of items, draggable with a mouse. `aria-label` required.

```ts
import { Carousel, CarouselItem } from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `Carousel` | `<div role="region">` | `aria-label` (required), `<div>` props |
| `CarouselItem` | `<div>` | `<div>` props. 240px wide by default; set `style={{ width }}`. |

No arrows, dots, autoplay or `index` state.

```tsx
import { Carousel, CarouselItem } from 'anvilui'

const albums = [
    { id: 1, title: 'Blue', cover: '/blue.jpg' },
    { id: 2, title: 'Red', cover: '/red.jpg' },
]

export function Example() {
    return (
        <Carousel aria-label="Featured albums">
            {albums.map((a) => (
                <CarouselItem key={a.id}>
                    <img
                        src={a.cover}
                        alt={a.title}
                        style={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover',
                        }}
                    />
                </CarouselItem>
            ))}
        </Carousel>
    )
}
```
