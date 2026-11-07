import { useState } from 'react'
import { Checkbox, IconButton } from 'anvilui'
import type { ComponentColor, ComponentFillType } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Labeled, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

export function IconButtonPlayground() {
    const [size, setSize] = useState<(typeof sizes)[number]>('normal')
    const [color, setColor] = useState<ComponentColor>('primary')
    const [fillType, setFillType] = useState<ComponentFillType>('filled')
    const [disabled, setDisabled] = useState(false)

    return (
        <Section title="Icon buttons">
            <Row>
                <SelectControl
                    label="size"
                    value={size}
                    options={sizes}
                    onChange={setSize}
                />
                <SelectControl
                    label="color"
                    value={color}
                    options={colors}
                    onChange={setColor}
                />
                <SelectControl
                    label="fillType"
                    value={fillType}
                    options={fillTypes}
                    onChange={setFillType}
                />
                <Labeled label="disabled">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                </Labeled>
            </Row>
            <Row>
                {sampleIcons.map((name) => (
                    <IconButton
                        key={name}
                        icon={name}
                        aria-label={name}
                        size={size}
                        color={color}
                        fillType={fillType}
                        disabled={disabled}
                    />
                ))}
            </Row>
        </Section>
    )
}
