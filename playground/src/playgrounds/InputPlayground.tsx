import { useState } from 'react'
import { Input, Switch, Typography } from 'anvilui'
import { Row, Section, SelectControl } from '../ui'

export function InputPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [value, setValue] = useState('')
    const [size, setSize] = useState<'normal' | 'small'>('normal')

    return (
        <Section title="States">
            <Row>
                <label className="pg-checkbox">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                    <Typography type="caption">disabled</Typography>
                </label>
                <SelectControl
                    label="size"
                    value={size}
                    options={['normal', 'small']}
                    onChange={setSize}
                />
            </Row>
            <Row>
                <Input size={size} disabled={disabled} label="Label" />
                <Input
                    size={size}
                    disabled={disabled}
                    label="With placeholder"
                    placeholder="Shown on focus"
                />
                <Input
                    size={size}
                    disabled={disabled}
                    label="Prefilled"
                    defaultValue="Default value"
                />
                <Input
                    size={size}
                    disabled={disabled}
                    label="Invalid"
                    aria-invalid
                />
                <Input size={size} disabled={disabled} placeholder="No label" />
            </Row>
            <Row>
                <Input
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
