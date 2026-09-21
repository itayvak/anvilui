import { useState } from 'react'
import { Checkbox, Radio, RadioGroup, Typography } from 'anvilui'
import { Row, Section } from '../ui'

const fruits = ['apple', 'banana', 'cherry'] as const

type Fruit = (typeof fruits)[number]

export function RadioGroupPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [horizontal, setHorizontal] = useState(false)
    const [value, setValue] = useState<Fruit>('banana')

    return (
        <Section title="States">
            <Row>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={horizontal}
                        onCheckedChange={setHorizontal}
                    />
                    <Typography type="caption">horizontal</Typography>
                </label>
            </Row>
            <Row>
                <RadioGroup
                    aria-label="Uncontrolled"
                    defaultValue="apple"
                    disabled={disabled}
                    style={horizontal ? { flexDirection: 'row' } : undefined}
                >
                    {fruits.map((fruit) => (
                        <label key={fruit} className="pg-checkbox">
                            <Radio value={fruit} />
                            <Typography>{fruit}</Typography>
                        </label>
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
                        <label key={fruit} className="pg-checkbox">
                            <Radio value={fruit} />
                            <Typography>
                                {fruit}
                                {fruit === value ? ' (selected)' : ''}
                            </Typography>
                        </label>
                    ))}
                </RadioGroup>
            </Row>
        </Section>
    )
}
