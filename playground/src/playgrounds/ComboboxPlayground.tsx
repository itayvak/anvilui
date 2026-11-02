import { useState } from 'react'
import { Combobox, ComboboxItem, Switch, Typography } from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

const fruits = [
    'Apple',
    'Apricot',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Dragon fruit with a very long name that has to be cut off',
    'Grape',
    'Kiwi',
    'Lemon',
    'Mango',
    'Orange',
    'Peach',
    'Pear',
    'Pineapple',
    'Strawberry',
    'Watermelon',
]

const countries = [
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'il', name: 'Israel' },
    { code: 'it', name: 'Italy' },
    { code: 'jp', name: 'Japan' },
]
type Country = (typeof countries)[number]

const renderFruit = (fruit: string) => (
    <ComboboxItem key={fruit} value={fruit}>
        {fruit}
    </ComboboxItem>
)

export function ComboboxPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [size, setSize] = useState<'normal' | 'small'>('normal')
    const [value, setValue] = useState<string | null>(null)
    const [country, setCountry] = useState<Country | null>(null)

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
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Fruit"
                    empty="No fruits found"
                >
                    {renderFruit}
                </Combobox>
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="With placeholder"
                    placeholder="Type to filter"
                >
                    {renderFruit}
                </Combobox>
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Prefilled"
                    defaultValue="Banana"
                >
                    {renderFruit}
                </Combobox>
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    placeholder="No label"
                    aria-label="Fruit"
                >
                    {renderFruit}
                </Combobox>
            </Row>
            <Row>
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={fruits}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                >
                    {renderFruit}
                </Combobox>
                <Typography>value: {String(value)}</Typography>
            </Row>
            <Row>
                <Combobox
                    size={size}
                    disabled={disabled}
                    items={countries}
                    itemToStringLabel={(c) => c.name}
                    label="Object items"
                    value={country}
                    onValueChange={setCountry}
                >
                    {(c) => (
                        <ComboboxItem key={c.code} value={c}>
                            {c.name}
                        </ComboboxItem>
                    )}
                </Combobox>
                <Typography>value: {country?.code ?? 'null'}</Typography>
            </Row>
        </Section>
    )
}
