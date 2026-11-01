import { useState } from 'react'
import { Checkbox, ToggleGroup, ToggleGroupItem, Typography } from 'anvilui'
import type { ToggleGroupProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

const options = ['Day', 'Week', 'Month', 'Year', 'Decade', 'Century']

export function ToggleGroupPlayground() {
    const [size, setSize] =
        useState<NonNullable<ToggleGroupProps['size']>>('normal')
    const [color, setColor] =
        useState<NonNullable<ToggleGroupProps['color']>>('primary')
    const [fillType, setFillType] =
        useState<NonNullable<ToggleGroupProps['fillType']>>('filled')
    const [count, setCount] = useState(3)
    const [disabled, setDisabled] = useState(false)
    const [icons, setIcons] = useState(false)
    const [value, setValue] = useState('Week')
    const [picked, setPicked] = useState<string[]>(['Day', 'Month'])

    const shown = options.slice(0, count)

    const buttons = shown.map((option) => (
        <ToggleGroupItem
            key={option}
            value={option}
            startIcon={icons ? 'calendar_today' : undefined}
        >
            {option}
        </ToggleGroupItem>
    ))

    return (
        <Section title="Toggle group">
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
                <label className="pg-checkbox">
                    <Checkbox checked={icons} onCheckedChange={setIcons} />
                    <Typography type="caption">icons</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
            </Row>
            <Row>
                <ToggleGroup
                    aria-label="Uncontrolled"
                    defaultValue="Day"
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </ToggleGroup>
                <ToggleGroup
                    aria-label="Controlled"
                    value={value}
                    onValueChange={setValue}
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </ToggleGroup>
                <Typography type="caption">selected: {value}</Typography>
            </Row>
            <Row>
                <ToggleGroup
                    multiple
                    aria-label="Multiple, uncontrolled"
                    defaultValue={['Week']}
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </ToggleGroup>
                <ToggleGroup
                    multiple
                    aria-label="Multiple, controlled"
                    value={picked}
                    onValueChange={setPicked}
                    disabled={disabled}
                    size={size}
                    color={color}
                    fillType={fillType}
                >
                    {buttons}
                </ToggleGroup>
                <Typography type="caption">
                    selected: {picked.join(', ') || 'none'}
                </Typography>
            </Row>
        </Section>
    )
}
