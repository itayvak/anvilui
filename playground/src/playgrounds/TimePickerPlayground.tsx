import { useState } from 'react'
import { Switch, TimePicker, Typography } from 'anvilui'
import { Labeled, Row, Section, SelectControl } from '../ui'

export function TimePickerPlayground() {
    const [type, setType] = useState<'dial' | 'input'>('dial')
    const [cycle, setCycle] = useState<'12' | '24'>('12')
    const [size, setSize] = useState<'normal' | 'small'>('normal')
    const [disabled, setDisabled] = useState(false)
    const [value, setValue] = useState<string | null>(null)
    const hourCycle = cycle === '12' ? 12 : 24

    return (
        <Section title="States">
            <Row>
                <SelectControl
                    label="type"
                    value={type}
                    options={['dial', 'input']}
                    onChange={setType}
                />
                <SelectControl
                    label="hourCycle"
                    value={cycle}
                    options={['12', '24']}
                    onChange={setCycle}
                />
                <SelectControl
                    label="size"
                    value={size}
                    options={['normal', 'small']}
                    onChange={setSize}
                />
                <Labeled label="disabled">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                </Labeled>
            </Row>
            <Row>
                <TimePicker
                    type={type}
                    hourCycle={hourCycle}
                    size={size}
                    disabled={disabled}
                    label="Alarm"
                />
                <TimePicker
                    type={type}
                    hourCycle={hourCycle}
                    size={size}
                    disabled={disabled}
                    label="Prefilled, afternoon"
                    defaultValue="14:37"
                />
                <TimePicker
                    type={type}
                    hourCycle={hourCycle}
                    size={size}
                    disabled={disabled}
                    aria-label="Start time"
                    defaultValue="09:00"
                />
            </Row>
            <Row>
                <TimePicker
                    type={type}
                    hourCycle={hourCycle}
                    size={size}
                    disabled={disabled}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                />
                <Typography>value: {String(value)}</Typography>
            </Row>
            <Row>
                <TimePicker
                    type={type}
                    size={size}
                    disabled={disabled}
                    label="Locale's hour cycle"
                />
            </Row>
        </Section>
    )
}
