import { useState } from 'react'
import { Checkbox, IconButton } from 'anvilui'
import type { ComponentColor, ComponentFillType } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Labeled, Row, Section, SelectControl } from '../ui'

export function IconButtonPlayground() {
    const [color, setColor] = useState<ComponentColor>('primary')
    const [fillType, setFillType] = useState<ComponentFillType>('filled')
    const [disabled, setDisabled] = useState(false)

    return (
        <Section title="Icon buttons">
            <Row>
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
                        color={color}
                        fillType={fillType}
                        disabled={disabled}
                    />
                ))}
            </Row>
        </Section>
    )
}
