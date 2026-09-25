import { useState } from 'react'
import { Switch, Typography } from 'anvilui'
import { Row, Section } from '../ui'

export function SwitchPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [checked, setChecked] = useState(true)

    return (
        <Section title="States">
            <Row>
                <label className="pg-checkbox">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                    <Typography type="caption">disabled</Typography>
                </label>
            </Row>
            <Row>
                <label className="pg-checkbox">
                    <Switch disabled={disabled} />
                    <Typography>unchecked</Typography>
                </label>
                <label className="pg-checkbox">
                    <Switch disabled={disabled} defaultChecked />
                    <Typography>checked</Typography>
                </label>
                <label className="pg-checkbox">
                    <Switch
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
