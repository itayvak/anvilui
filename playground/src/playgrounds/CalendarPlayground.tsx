import { useState } from 'react'
import { Button, Calendar, Typography } from 'anvilui'
import { Row, Section, Stack } from '../ui'

export function CalendarPlayground() {
    const [value, setValue] = useState<string | null>('2026-02-28')

    return (
        <>
            <Section title="Uncontrolled">
                <Calendar aria-label="Pick a date" />
            </Section>
            <Section title="Controlled">
                <Row>
                    <Calendar
                        value={value}
                        onValueChange={setValue}
                        aria-label="Pick a date"
                    />
                    <Stack>
                        <Typography type="caption">
                            value: {value ?? 'null'}
                        </Typography>
                        <Button
                            fillType="outlined"
                            onClick={() => setValue(null)}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Row>
            </Section>
        </>
    )
}
