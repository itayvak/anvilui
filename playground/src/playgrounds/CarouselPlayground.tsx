import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { Carousel, CarouselItem, Icon, Typography } from 'anvilui'
import { RangeControl, Row, Section } from '../ui'

// Theme colors instead of photos, so it works offline and follows the theme
const tiles: { title: string; icon: MaterialSymbol; bg: string; fg: string }[] =
    [
        {
            title: 'Mountains',
            icon: 'landscape',
            bg: 'primary',
            fg: 'on-primary',
        },
        { title: 'Ocean', icon: 'waves', bg: 'tonal', fg: 'on-tonal' },
        { title: 'Forest', icon: 'forest', bg: 'success', fg: 'on-success' },
        { title: 'Desert', icon: 'sunny', bg: 'warning', fg: 'on-warning' },
        {
            title: 'Volcano',
            icon: 'local_fire_department',
            bg: 'error',
            fg: 'on-error',
        },
        {
            title: 'Night sky',
            icon: 'bedtime',
            bg: 'primary-container',
            fg: 'on-primary-container',
        },
        {
            title: 'Glacier',
            icon: 'ac_unit',
            bg: 'tonal-container',
            fg: 'on-tonal-container',
        },
        {
            title: 'Meadow',
            icon: 'grass',
            bg: 'success-container',
            fg: 'on-success-container',
        },
        {
            title: 'Canyon',
            icon: 'landslide',
            bg: 'warning-container',
            fg: 'on-warning-container',
        },
        {
            title: 'City',
            icon: 'location_city',
            bg: 'container',
            fg: 'on-container',
        },
    ]

function Tile(props: (typeof tiles)[number]) {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        height: '100%',
        padding: 16,
        backgroundColor: `var(--avl-color-${props.bg})`,
        color: `var(--avl-color-${props.fg})`,
    }
    return (
        <div style={style}>
            <Icon name={props.icon} style={{ fontSize: 48 }} />
            <Typography type="h6">{props.title}</Typography>
        </div>
    )
}

// Fixed Lorem Picsum ids, so the same photos come back on every reload
const photoIds = [10, 15, 16, 28, 29, 37, 42, 47, 54, 57]

function Photo(props: { id: number; index: number }) {
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <img
                src={`https://picsum.photos/id/${props.id}/640/480`}
                alt=""
                loading="lazy"
                draggable={false}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            {/* Dark fade at the bottom, so the caption reads on any photo */}
            <div
                style={{
                    position: 'absolute',
                    inset: 'auto 0 0',
                    padding: '32px 16px 12px',
                    background:
                        'linear-gradient(transparent, rgb(0 0 0 / 0.6))',
                    color: 'white',
                }}
            >
                <Typography type="h6">Photo {props.index + 1}</Typography>
            </div>
        </div>
    )
}

export function CarouselPlayground() {
    const [width, setWidth] = useState(240)
    const [height, setHeight] = useState(200)
    const [count, setCount] = useState(8)

    return (
        <>
            <Section title="Basic">
                <Row>
                    <Typography type="caption">
                        Scroll sideways (trackpad, Shift + wheel, or focus it
                        and use the arrow keys). Items at the edges get rounded
                        masks and their content slides to stay centered.
                    </Typography>
                </Row>
                <Carousel aria-label="Places" style={{ height: 200 }}>
                    {tiles.map((tile) => (
                        <CarouselItem key={tile.title} aria-label={tile.title}>
                            <Tile {...tile} />
                        </CarouselItem>
                    ))}
                </Carousel>
            </Section>
            <Section title="Photos">
                <Row>
                    <Typography type="caption">
                        Photos from Lorem Picsum, so this one needs an internet
                        connection. Watch the photos at the edges slide as you
                        scroll.
                    </Typography>
                </Row>
                <Carousel aria-label="Photos" style={{ height: 240 }}>
                    {photoIds.map((id, i) => (
                        <CarouselItem
                            key={id}
                            aria-label={`Photo ${i + 1} of ${photoIds.length}`}
                            style={{ width: 300 }}
                        >
                            <Photo id={id} index={i} />
                        </CarouselItem>
                    ))}
                </Carousel>
            </Section>
            <Section title="Sizes">
                <Row>
                    <RangeControl
                        label="item width"
                        value={width}
                        min={80}
                        max={480}
                        onChange={setWidth}
                    />
                    <RangeControl
                        label="height"
                        value={height}
                        min={80}
                        max={360}
                        onChange={setHeight}
                    />
                    <RangeControl
                        label="items"
                        value={count}
                        min={1}
                        max={tiles.length}
                        onChange={setCount}
                    />
                </Row>
                <Carousel aria-label="Resizable places" style={{ height }}>
                    {tiles.slice(0, count).map((tile) => (
                        <CarouselItem
                            key={tile.title}
                            aria-label={tile.title}
                            style={{ width }}
                        >
                            <Tile {...tile} />
                        </CarouselItem>
                    ))}
                </Carousel>
            </Section>
        </>
    )
}
