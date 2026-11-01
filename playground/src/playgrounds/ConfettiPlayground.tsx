import { useState } from 'react'
import { Button, HoldButton, Typography, useConfetti } from 'anvilui'
import type { ComponentColor } from 'anvilui'
import { colors } from '../options'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const palettes = ['theme', ...colors] as const

export function ConfettiPlayground() {
    const fire = useConfetti()
    const [count, setCount] = useState(80)
    const [angle, setAngle] = useState(0)
    const [spread, setSpread] = useState(70)
    const [power, setPower] = useState(100)
    const [palette, setPalette] = useState<(typeof palettes)[number]>('theme')

    const options = {
        count,
        angle,
        spread,
        power: power / 100,
        colors: palette === 'theme' ? undefined : [palette as ComponentColor],
    }

    // Two cannons in the bottom corners, aimed in toward the middle
    const cannons = () => {
        const y = window.innerHeight
        fire({ x: 0, y }, { angle: 35, spread: 40, power: 1.4 })
        fire(
            { x: window.innerWidth, y },
            { angle: -35, spread: 40, power: 1.4 }
        )
    }

    return (
        <>
            <Section title="Examples">
                <Row>
                    <Button
                        startIcon="celebration"
                        onClick={(e) => fire(e.currentTarget)}
                    >
                        Celebrate
                    </Button>
                    <HoldButton
                        color="success"
                        startIcon="rocket_launch"
                        onConfirm={() => fire(undefined, { count: 150 })}
                    >
                        Hold to ship it
                    </HoldButton>
                    <Button
                        fillType="outlined"
                        startIcon="wand_stars"
                        onClick={cannons}
                    >
                        Side cannons
                    </Button>
                </Row>
                <Row>
                    <Typography type="caption">
                        Nothing fires with reduced motion on, since the confetti
                        is only decoration.
                    </Typography>
                </Row>
            </Section>
            <Section title="Options">
                <Row>
                    <RangeControl
                        label="count"
                        value={count}
                        min={10}
                        max={300}
                        onChange={setCount}
                    />
                    <RangeControl
                        label="angle"
                        value={angle}
                        min={-90}
                        max={90}
                        onChange={setAngle}
                    />
                    <RangeControl
                        label="spread"
                        value={spread}
                        min={10}
                        max={360}
                        onChange={setSpread}
                    />
                    <RangeControl
                        label="power %"
                        value={power}
                        min={20}
                        max={200}
                        onChange={setPower}
                    />
                    <SelectControl
                        label="colors"
                        value={palette}
                        options={palettes}
                        onChange={setPalette}
                    />
                </Row>
                <Row>
                    <Button onClick={(e) => fire(e.currentTarget, options)}>
                        Fire from here
                    </Button>
                    <Button
                        fillType="outlined"
                        onClick={() => fire(undefined, options)}
                    >
                        Fire from the middle
                    </Button>
                </Row>
            </Section>
        </>
    )
}
