import { useState } from 'react'
import { Checkbox, Radio, RadioGroup, Typography } from 'anvilui'
import { Row, Section, Labeled } from '../ui'

const fruits = ['apple', 'banana', 'cherry'] as const

type Fruit = (typeof fruits)[number]

export function RadioGroupPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [horizontal, setHorizontal] = useState(false)
    const [value, setValue] = useState<Fruit>('banana')

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                </Labeled>
                <Labeled label="horizontal">
                    <Checkbox
                        checked={horizontal}
                        onCheckedChange={setHorizontal}
                    />
                </Labeled>
            </Row>
            <Row>
                <RadioGroup
                    aria-label="Uncontrolled"
                    defaultValue="apple"
                    disabled={disabled}
                    style={horizontal ? { flexDirection: 'row' } : undefined}
                >
                    {fruits.map((fruit) => (
                        <Labeled key={fruit} label={<>{fruit}</>} type="body">
                            <Radio value={fruit} />
                        </Labeled>
                    ))}
                </RadioGroup>
                <RadioGroup
                    aria-label="Controlled"
                    value={value}
                    onValueChange={setValue}
                    disabled={disabled}
                    style={horizontal ? { flexDirection: 'row' } : undefined}
                >
                    {fruits.map((fruit) => (
                        <Labeled
                            key={fruit}
                            label={
                                <>
                                    {fruit}
                                    {fruit === value ? ' (selected)' : ''}
                                </>
                            }
                            type="body"
                        >
                            <Radio value={fruit} />
                        </Labeled>
                    ))}
                </RadioGroup>
            </Row>
        </Section>
    )
}
