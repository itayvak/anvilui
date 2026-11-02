import { useState } from 'react'
import { Checkbox, Typography } from 'anvilui'
import { Row, Section, Labeled } from '../ui'

export function CheckboxPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [checked, setChecked] = useState(true)

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                </Labeled>
            </Row>
            <Row>
                <Labeled label="unchecked" type="body">
                    <Checkbox disabled={disabled} />
                </Labeled>
                <Labeled label="checked" type="body">
                    <Checkbox disabled={disabled} defaultChecked />
                </Labeled>
                <Labeled label="indeterminate" type="body">
                    <Checkbox disabled={disabled} indeterminate />
                </Labeled>
                <Labeled label={<>controlled: {String(checked)}</>} type="body">
                    <Checkbox
                        disabled={disabled}
                        checked={checked}
                        onCheckedChange={setChecked}
                    />
                </Labeled>
            </Row>
        </Section>
    )
}
