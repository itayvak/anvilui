import { useEffect, useState } from 'react'
import { Progress, Switch, Typography } from 'anvilui'
import { Labeled, RangeControl, Row, Section } from '../ui'

export function ProgressPlayground() {
    const [value, setValue] = useState(40)
    const [running, setRunning] = useState(0)
    // Toggling shows the wave easing into the plain bar and back
    const [wavy, setWavy] = useState(true)

    // A fake upload that loops, to see the value animate
    useEffect(() => {
        const id = setInterval(
            () => setRunning((v) => (v >= 100 ? 0 : v + 5)),
            300
        )
        return () => clearInterval(id)
    }, [])

    return (
        <>
            <Section title="Linear">
                <Row>
                    <RangeControl
                        label="value"
                        value={value}
                        min={0}
                        max={100}
                        onChange={setValue}
                    />
                </Row>
                <Row>
                    <Progress label="Downloading" value={value} />
                </Row>
                <Row>
                    <Progress label="Running" value={running} />
                </Row>
                <Row>
                    <Progress label="Loading" value={null} />
                </Row>
                <Row>
                    <Progress aria-label="Done" value={100} />
                </Row>
            </Section>
            <Section title="Squiggly">
                <Row>
                    <Labeled label="squiggly">
                        <Switch checked={wavy} onCheckedChange={setWavy} />
                    </Labeled>
                </Row>
                <Row>
                    <Progress
                        squiggly={wavy}
                        label="Downloading"
                        value={value}
                    />
                </Row>
                <Row>
                    <Progress squiggly={wavy} label="Running" value={running} />
                </Row>
                <Row>
                    <Progress squiggly={wavy} label="Loading" value={null} />
                </Row>
            </Section>
            <Section title="Circular">
                <Row>
                    <Progress
                        type="circular"
                        aria-label="Value"
                        value={value}
                    />
                    <Progress
                        type="circular"
                        aria-label="Running"
                        value={running}
                    />
                    <Progress
                        type="circular"
                        aria-label="Loading"
                        value={null}
                    />
                </Row>
            </Section>
            <Section title="Inline">
                <Row>
                    <Typography>
                        <Progress
                            type="inline"
                            aria-label="Saving"
                            value={null}
                        />{' '}
                        Saving your changes
                    </Typography>
                </Row>
                <Row>
                    <Typography>
                        <Progress
                            type="inline"
                            label="Syncing 3 files"
                            value={value}
                        />
                    </Typography>
                </Row>
            </Section>
        </>
    )
}
