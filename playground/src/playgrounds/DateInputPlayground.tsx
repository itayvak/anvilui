import { useState } from 'react'
import { DateInput, Field, FieldError, Switch, Typography } from 'anvilui'
import { Labeled, Row, Section, SelectControl } from '../ui'

export function DateInputPlayground() {
    const [size, setSize] = useState<'normal' | 'small'>('normal')
    const [disabled, setDisabled] = useState(false)
    const [value, setValue] = useState<string | null>(null)

    return (
        <Section title="Type a date, or pick one from the calendar">
            <Row>
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
                <DateInput size={size} disabled={disabled} label="Birthday" />
                <DateInput
                    size={size}
                    disabled={disabled}
                    label="Prefilled"
                    defaultValue="2026-02-28"
                />
                <DateInput
                    size={size}
                    disabled={disabled}
                    aria-label="No visible label"
                />
            </Row>
            <Row>
                <DateInput
                    size={size}
                    disabled={disabled}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                />
                <Typography>value: {String(value)}</Typography>
            </Row>
            <Row>
                <Field disabled={disabled} invalid>
                    <DateInput
                        size={size}
                        label="Invalid (from Field)"
                        defaultValue="2026-10-29"
                    />
                    <FieldError match>That date is taken</FieldError>
                </Field>
            </Row>
        </Section>
    )
}
