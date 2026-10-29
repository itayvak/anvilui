import { useEffect, useState } from 'react'
import { Progress } from 'anvilui'
import { RangeControl, Row, Section } from '../ui'

export function ProgressPlayground() {
    const [value, setValue] = useState(40)
    const [running, setRunning] = useState(0)

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
                    <Progress squiggly label="Downloading" value={value} />
                </Row>
                <Row>
                    <Progress squiggly label="Running" value={running} />
                </Row>
                <Row>
                    <Progress squiggly label="Loading" value={null} />
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
                    <Progress type="circular" label="Syncing" value={null} />
                </Row>
            </Section>
        </>
    )
}
