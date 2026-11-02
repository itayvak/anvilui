import { useState } from 'react'
import { Card, CardContent, CardTitle, Sticker, Typography } from 'anvilui'
import type { StickerProps } from 'anvilui'
import { colors } from '../options'
import { RangeControl, Row, Section, SelectControl, TextControl } from '../ui'

export function StickerPlayground() {
    const [color, setColor] =
        useState<NonNullable<StickerProps['color']>>('primary')
    const [tilt, setTilt] = useState(-4)
    const [text, setText] = useState('NEW')

    return (
        <>
            <Section title="Examples">
                <Row>
                    <Sticker>NEW</Sticker>
                    <Sticker
                        color="error"
                        tilt={6}
                        startIcon="local_fire_department"
                    >
                        HOT
                    </Sticker>
                    <Sticker color="tonal" tilt={-8}>
                        beta
                    </Sticker>
                    <Sticker color="success" tilt={3} startIcon="eco">
                        Eco friendly
                    </Sticker>
                    <Sticker color="warning" tilt={-2} startIcon="sell">
                        50% off
                    </Sticker>
                    <Sticker color="container" tilt={10}>
                        Limited edition
                    </Sticker>
                </Row>
                <Row>
                    <Typography type="caption">
                        Hover one: it straightens up and lifts.
                    </Typography>
                </Row>
            </Section>
            <Section title="Stuck on a card">
                {/* The sticker hangs off the card's corner */}
                <div style={{ position: 'relative', width: 280 }}>
                    <Card>
                        <CardTitle>Anvil Pro</CardTitle>
                        <CardContent>
                            Everything in the free plan, plus confetti on every
                            button.
                        </CardContent>
                    </Card>
                    <Sticker
                        color="error"
                        tilt={12}
                        startIcon="celebration"
                        style={{ position: 'absolute', top: -12, right: -16 }}
                    >
                        Just launched
                    </Sticker>
                </div>
            </Section>
            <Section title="Options">
                <Row>
                    <SelectControl
                        label="color"
                        value={color}
                        options={colors}
                        onChange={setColor}
                    />
                    <RangeControl
                        label="tilt"
                        value={tilt}
                        min={-20}
                        max={20}
                        onChange={setTilt}
                    />
                    <TextControl label="text" value={text} onChange={setText} />
                </Row>
                <Row style={{ padding: '16px 0' }}>
                    <Sticker color={color} tilt={tilt}>
                        {text}
                    </Sticker>
                    <Sticker color={color} tilt={tilt} startIcon="star">
                        {text}
                    </Sticker>
                </Row>
            </Section>
        </>
    )
}
