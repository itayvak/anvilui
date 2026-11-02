import { useState } from 'react'
import { Field, FieldError, PinInput, Switch, Typography } from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

export function PinInputPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [size, setSize] = useState<'normal' | 'small'>('normal')
    const [fillType, setFillType] = useState<'outlined' | 'filled'>('outlined')
    const [value, setValue] = useState('')
    const [completed, setCompleted] = useState<string | null>(null)

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
                <SelectControl
                    label="fillType"
                    value={fillType}
                    options={['outlined', 'filled']}
                    onChange={setFillType}
                />
            </Row>
            <Row>
                <PinInput
                    length={6}
                    size={size}
                    fillType={fillType}
                    disabled={disabled}
                    label="Verification code"
                />
                <PinInput
                    length={4}
                    size={size}
                    fillType={fillType}
                    disabled={disabled}
                    aria-label="PIN"
                    mask
                />
                <PinInput
                    length={5}
                    size={size}
                    fillType={fillType}
                    disabled={disabled}
                    label="Letters and digits"
                    validationType="alphanumeric"
                    normalizeValue={(v) => v.toUpperCase()}
                    defaultValue="AB1"
                />
            </Row>
            <Row>
                <PinInput
                    length={6}
                    size={size}
                    fillType={fillType}
                    disabled={disabled}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                    onValueComplete={setCompleted}
                />
                <Typography>
                    value: "{value}", completed: {String(completed)}
                </Typography>
            </Row>
            <Row>
                <Field disabled={disabled} invalid>
                    <PinInput
                        length={6}
                        size={size}
                        fillType={fillType}
                        label="Invalid"
                        defaultValue="123456"
                    />
                    <FieldError match>That code is wrong</FieldError>
                </Field>
            </Row>
        </Section>
    )
}
