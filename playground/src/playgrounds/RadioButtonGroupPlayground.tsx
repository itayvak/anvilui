import { useState } from 'react'
import { Checkbox, RadioButton, RadioButtonGroup, Typography } from 'anvilui'
import type { RadioButtonGroupProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { RangeControl, Row, Section, SelectControl, Labeled } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

const options = ['Day', 'Week', 'Month', 'Year', 'Decade', 'Century']

export function RadioButtonGroupPlayground() {
    const [size, setSize] =
        useState<NonNullable<RadioButtonGroupProps['size']>>('normal')
    const [color, setColor] =
        useState<NonNullable<RadioButtonGroupProps['color']>>('primary')
    const [fillType, setFillType] =
        useState<NonNullable<RadioButtonGroupProps['fillType']>>('filled')
    const [count, setCount] = useState(3)
    const [disabled, setDisabled] = useState(false)
    const [icons, setIcons] = useState(false)
    const [value, setValue] = useState('Week')

    const shown = options.slice(0, count)

    const buttons = shown.map((option) => (
        <RadioButton
            key={option}
            value={option}
            startIcon={icons ? 'calendar_today' : undefined}
        >
            {option}
        </RadioButton>
    ))

    return (
        <Section title="Radio button group">
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
                    min={2}
                    max={options.length}
                    onChange={setCount}
                />
                <Labeled label="icons">
                    <Checkbox checked={icons} onCheckedChange={setIcons} />
                </Labeled>
                <Labeled label="disabled">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                </Labeled>
            </Row>
            <Row>
                <RadioButtonGroup
                    aria-label="Uncontrolled"
                    defaultValue="Day"
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </RadioButtonGroup>
                <RadioButtonGroup
                    aria-label="Controlled"
                    value={value}
                    onValueChange={setValue}
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </RadioButtonGroup>
                <Typography type="caption">selected: {value}</Typography>
            </Row>
        </Section>
    )
}
