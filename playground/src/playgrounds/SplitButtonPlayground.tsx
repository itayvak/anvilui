import { useState } from 'react'
import { Button, SplitButton, Checkbox, IconButton, Typography } from 'anvilui'
import type { ButtonProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { RangeControl, Row, Section, SelectControl, Labeled } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

export function SplitButtonPlayground() {
    const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('normal')
    const [color, setColor] =
        useState<NonNullable<ButtonProps['color']>>('primary')
    const [fillType, setFillType] =
        useState<NonNullable<ButtonProps['fillType']>>('filled')
    const [count, setCount] = useState(3)
    const [disabled, setDisabled] = useState(false)

    return (
        <Section title="Button group">
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
                <RangeControl
                    label="buttons"
                    value={count}
                    min={1}
                    max={6}
                    onChange={setCount}
                />
                <Labeled label="disabled">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                </Labeled>
            </Row>
            <Row>
                <SplitButton>
                    {Array.from({ length: count }, (_, i) => (
                        <Button
                            key={i}
                            size={size}
                            color={color}
                            fillType={fillType}
                            disabled={disabled}
                        >
                            Button {i + 1}
                        </Button>
                    ))}
                </SplitButton>
            </Row>
            <Row>
                <SplitButton>
                    <Button
                        color={color}
                        fillType={fillType}
                        disabled={disabled}
                    >
                        My Profile
                    </Button>
                    <IconButton
                        icon="keyboard_arrow_down"
                        aria-label="More"
                        color={color}
                        fillType={fillType}
                        disabled={disabled}
                    />
                </SplitButton>
            </Row>
        </Section>
    )
}
