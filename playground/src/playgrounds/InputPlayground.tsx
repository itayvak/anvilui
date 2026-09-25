import { useState } from 'react'
import { Checkbox, Input, Typography } from 'anvilui'
import { Row, Section, SelectControl, TextControl } from '../ui'

const types = ['text', 'password', 'email', 'number', 'search'] as const

export function InputPlayground() {
    const [type, setType] = useState<(typeof types)[number]>('text')
    const [label, setLabel] = useState('Label')
    const [placeholder, setPlaceholder] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [readOnly, setReadOnly] = useState(false)

    const states = [
        { label: 'empty', defaultValue: '' },
        { label: 'filled', defaultValue: 'Hello' },
        { label: 'no label', defaultValue: '', noLabel: true },
    ]

    return (
        <Section title="Input">
            <Row>
                <SelectControl
                    label="type"
                    value={type}
                    options={types}
                    onChange={setType}
                />
                <TextControl label="label" value={label} onChange={setLabel} />
                <TextControl
                    label="placeholder"
                    value={placeholder}
                    onChange={setPlaceholder}
                />
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={readOnly}
                        onCheckedChange={setReadOnly}
                    />
                    <Typography type="caption">readOnly</Typography>
                </label>
            </Row>
            <table className="pg-matrix">
                <tbody>
                    {states.map((state) => (
                        <tr key={state.label}>
                            <th scope="row">
                                <Typography type="caption">
                                    {state.label}
                                </Typography>
                            </th>
                            <td>
                                <Input
                                    type={type}
                                    label={state.noLabel ? undefined : label}
                                    placeholder={placeholder || undefined}
                                    defaultValue={state.defaultValue}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Section>
    )
}
