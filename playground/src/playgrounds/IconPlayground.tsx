import { useState } from 'react'
import { Icon } from 'anvilui'
import { sampleIcons } from '../options'
import { RangeControl, Row, Section } from '../ui'

export function IconPlayground() {
    const [size, setSize] = useState(32)

    return (
        <Section title="Icons">
            <RangeControl
                label="font-size"
                value={size}
                min={12}
                max={64}
                onChange={setSize}
            />
            <Row>
                {sampleIcons.map((name) => (
                    <Icon key={name} name={name} style={{ fontSize: size }} />
                ))}
            </Row>
        </Section>
    )
}
