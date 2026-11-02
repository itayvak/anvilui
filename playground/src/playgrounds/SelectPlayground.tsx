import { useState } from 'react'
import { Select, SelectItem, Switch, Typography } from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

const fruits = {
    apple: 'Apple',
    banana: 'Banana',
    cherry: 'Cherry',
    dragonfruit: 'Dragon fruit with a very long name that should truncate',
}

const items = Object.entries(fruits).map(([value, label]) => (
    <SelectItem key={value} value={value}>
        {label}
    </SelectItem>
))

// Enough to overflow the screen, to check the popup scrolls
const manyItems = Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => [`item-${i + 1}`, `Item ${i + 1}`])
)

export function SelectPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [size, setSize] = useState<'normal' | 'small'>('normal')
    const [value, setValue] = useState<string | null>(null)
    const [values, setValues] = useState<string[]>([])

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                </Labeled>
                <SelectControl
                    label="size"
                    value={size}
                    options={['normal', 'small']}
                    onChange={setSize}
                />
            </Row>
            <Row>
                <Select
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Fruit"
                >
                    {items}
                </Select>
                <Select
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="With placeholder"
                    placeholder="Pick one"
                >
                    {items}
                </Select>
                <Select
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Prefilled"
                    defaultValue="banana"
                >
                    {items}
                </Select>
                <Select
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    placeholder="No label"
                >
                    {items}
                </Select>
            </Row>
            <Row>
                <Select
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                >
                    {items}
                </Select>
                <Typography>value: {String(value)}</Typography>
            </Row>
            <Row>
                <Select
                    multiple
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Multiple"
                    defaultValue={['apple', 'cherry']}
                >
                    {items}
                </Select>
                <Select
                    multiple
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Multiple, controlled"
                    value={values}
                    onValueChange={setValues}
                >
                    {items}
                </Select>
                <Typography>value: [{values.join(', ')}]</Typography>
            </Row>
            <Row>
                <Select
                    size={size}
                    disabled={disabled}
                    items={manyItems}
                    label="100 items"
                >
                    {Object.entries(manyItems).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </Select>
            </Row>
        </Section>
    )
}
