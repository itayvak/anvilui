import { useState } from 'react'
import {
    Avatar,
    PreviewCard,
    PreviewCardPopup,
    PreviewCardTrigger,
    Typography,
} from 'anvilui'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const sides = ['bottom', 'top', 'left', 'right'] as const

export function PreviewCardPlayground() {
    const [side, setSide] = useState<(typeof sides)[number]>('bottom')
    const [delay, setDelay] = useState(600)

    return (
        <Section title="Hover or focus the links">
            <Row>
                <SelectControl
                    label="side"
                    value={side}
                    options={sides}
                    onChange={setSide}
                />
                <RangeControl
                    label="delay (ms)"
                    value={delay}
                    min={0}
                    max={1500}
                    onChange={setDelay}
                />
            </Row>
            <Typography>
                The first program was written by{' '}
                <PreviewCard>
                    <PreviewCardTrigger
                        href="https://en.wikipedia.org/wiki/Ada_Lovelace"
                        delay={delay}
                    >
                        Ada Lovelace
                    </PreviewCardTrigger>
                    <PreviewCardPopup side={side}>
                        <Avatar name="Ada Lovelace" />
                        <Typography type="h6" as="span">
                            Ada Lovelace
                        </Typography>
                        <Typography>
                            English mathematician, known for her work on Charles
                            Babbage's Analytical Engine.
                        </Typography>
                    </PreviewCardPopup>
                </PreviewCard>{' '}
                for a machine that was never built. Text only, no picture:{' '}
                <PreviewCard>
                    <PreviewCardTrigger
                        href="https://en.wikipedia.org/wiki/Analytical_engine"
                        delay={delay}
                    >
                        Analytical Engine
                    </PreviewCardTrigger>
                    <PreviewCardPopup side={side}>
                        <Typography>
                            A proposed mechanical general-purpose computer,
                            designed in 1837.
                        </Typography>
                    </PreviewCardPopup>
                </PreviewCard>
                .
            </Typography>
        </Section>
    )
}
