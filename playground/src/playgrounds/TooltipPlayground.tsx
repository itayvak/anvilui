import { useState } from 'react'
import { Button, IconButton, Tooltip } from 'anvilui'
import { Row, Section, SelectControl } from '../ui'

const sides = ['top', 'bottom', 'left', 'right'] as const

export function TooltipPlayground() {
    const [side, setSide] = useState<(typeof sides)[number]>('top')

    return (
        <>
            <Section title="Icon buttons">
                <Row>
                    <SelectControl
                        label="side"
                        value={side}
                        options={sides}
                        onChange={setSide}
                    />
                </Row>
                {/* Hover one, then move to the next: the others open instantly */}
                <Row>
                    <Tooltip label="Edit" side={side}>
                        <IconButton icon="edit" aria-label="Edit" />
                    </Tooltip>
                    <Tooltip label="Share" side={side}>
                        <IconButton icon="share" aria-label="Share" />
                    </Tooltip>
                    <Tooltip label="Delete" side={side}>
                        <IconButton
                            icon="delete"
                            color="error"
                            aria-label="Delete"
                        />
                    </Tooltip>
                </Row>
            </Section>
            <Section title="Other">
                <Row>
                    <Tooltip
                        label="A longer tooltip that wraps onto a second line once it hits the max width"
                        side={side}
                    >
                        <Button>Long text</Button>
                    </Tooltip>
                    <Tooltip label="Opens right away" delay={0} side={side}>
                        <Button fillType="outlined">No delay</Button>
                    </Tooltip>
                    <Tooltip label="Always open" defaultOpen side={side}>
                        <Button fillType="text">Open by default</Button>
                    </Tooltip>
                </Row>
            </Section>
        </>
    )
}
