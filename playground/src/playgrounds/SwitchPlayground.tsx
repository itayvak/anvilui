import { useState } from 'react'
import { Switch, Typography } from 'anvilui'
import { Row, Section, Labeled } from '../ui'

export function SwitchPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [checked, setChecked] = useState(true)

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                </Labeled>
            </Row>
            <Row>
                <Labeled label="unchecked" type="body">
                    <Switch disabled={disabled} />
                </Labeled>
                <Labeled label="checked" type="body">
                    <Switch disabled={disabled} defaultChecked />
                </Labeled>
                <Labeled label={<>controlled: {String(checked)}</>} type="body">
                    <Switch
                        disabled={disabled}
                        checked={checked}
                        onCheckedChange={setChecked}
                    />
                </Labeled>
            </Row>
        </Section>
    )
}
