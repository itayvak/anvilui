import { useState } from 'react'
import { Switch, Textarea, Typography } from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

export function TextareaPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [value, setValue] = useState('')
    const [size, setSize] = useState<'normal' | 'small'>('normal')

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
                <Textarea size={size} disabled={disabled} label="Label" />
                <Textarea
                    size={size}
                    disabled={disabled}
                    label="Prefilled"
                    defaultValue={'First line\nSecond line\nThird line'}
                />
                <Textarea
                    size={size}
                    disabled={disabled}
                    label="Invalid"
                    aria-invalid
                />
                <Textarea
                    size={size}
                    disabled={disabled}
                    placeholder="No label"
                />
            </Row>
            <Row>
                <Textarea
                    size={size}
                    disabled={disabled}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                />
                <Typography>value: {value}</Typography>
            </Row>
        </Section>
    )
}
