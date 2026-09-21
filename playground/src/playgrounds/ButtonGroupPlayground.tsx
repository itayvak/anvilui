import { useState } from 'react'
import { Button, ButtonGroup, Checkbox, IconButton, Typography } from 'anvilui'
import type { ButtonProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

export function ButtonGroupPlayground() {
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
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
            </Row>
            <Row>
                <ButtonGroup>
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
                </ButtonGroup>
            </Row>
            <Row>
                <ButtonGroup>
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
                </ButtonGroup>
            </Row>
        </Section>
    )
}
