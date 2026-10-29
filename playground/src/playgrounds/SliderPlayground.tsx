import { useState } from 'react'
import { Slider, Switch, Typography } from 'anvilui'
import { Row, Section, Labeled } from '../ui'

export function SliderPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [value, setValue] = useState(30)
    const [range, setRange] = useState<readonly number[]>([20, 80])

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                </Labeled>
            </Row>
            <Row>
                <Slider disabled={disabled} label="Volume" defaultValue={50} />
                <Slider
                    disabled={disabled}
                    aria-label="No visible label"
                    defaultValue={0}
                />
                <Slider
                    disabled={disabled}
                    label="No value bubble"
                    showValue={false}
                    defaultValue={70}
                />
                <Slider
                    disabled={disabled}
                    label="Steps of 10"
                    step={10}
                    defaultValue={40}
                />
            </Row>
            <Row>
                <Slider
                    disabled={disabled}
                    label="Controlled"
                    value={value}
                    onValueChange={setValue}
                />
                <Typography>value: {value}</Typography>
            </Row>
            <Row>
                <Slider
                    disabled={disabled}
                    label="Range"
                    value={range}
                    onValueChange={setRange}
                />
                <Typography>value: [{range.join(', ')}]</Typography>
            </Row>
            <Row>
                <Slider
                    squiggly
                    disabled={disabled}
                    label="Squiggly"
                    defaultValue={40}
                />
                <Slider
                    squiggly
                    disabled={disabled}
                    label="Squiggly range"
                    defaultValue={[25, 70]}
                />
                <Slider
                    squiggly
                    disabled={disabled}
                    label="Squiggly, steps of 10"
                    step={10}
                    defaultValue={60}
                />
            </Row>
            <Row>
                <Slider
                    orientation="vertical"
                    disabled={disabled}
                    label="Vertical"
                    defaultValue={60}
                />
                <Slider
                    orientation="vertical"
                    disabled={disabled}
                    label="Vertical range"
                    defaultValue={[25, 75]}
                />
                <Slider
                    orientation="vertical"
                    disabled={disabled}
                    aria-label="Vertical, no label"
                    showValue={false}
                    defaultValue={30}
                />
            </Row>
            <Row>
                <Slider
                    disabled={disabled}
                    label="Price"
                    min={0}
                    max={1000}
                    defaultValue={250}
                    format={{ style: 'currency', currency: 'USD' }}
                />
            </Row>
        </Section>
    )
}
