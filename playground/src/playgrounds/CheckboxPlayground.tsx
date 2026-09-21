import { useState } from 'react'
import { Checkbox, Typography } from 'anvilui'
import { Row, Section } from '../ui'

export function CheckboxPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [checked, setChecked] = useState(true)

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
            </Row>
            <Row>
                <label className="pg-checkbox">
                    <Checkbox disabled={disabled} />
                    <Typography>unchecked</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox disabled={disabled} defaultChecked />
                    <Typography>checked</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox disabled={disabled} indeterminate />
                    <Typography>indeterminate</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        disabled={disabled}
                        checked={checked}
                        onCheckedChange={setChecked}
                    />
                    <Typography>controlled: {String(checked)}</Typography>
                </label>
            </Row>
        </Section>
    )
}
