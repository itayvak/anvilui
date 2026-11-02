import { useState } from 'react'
import {
    AnimatedNumber,
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
} from 'anvilui'
import { typographyTypes } from '../options'
import { Row, Section, SelectControl } from '../ui'

const formats = {
    plain: {},
    decimals: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    currency: { style: 'currency', currency: 'USD' },
    percent: { style: 'percent', maximumFractionDigits: 1 },
    compact: { notation: 'compact', maximumFractionDigits: 1 },
} satisfies Record<string, Intl.NumberFormatOptions>
type FormatName = keyof typeof formats
const formatNames = Object.keys(formats) as FormatName[]

// Percent wants 0-1, the rest look best in the thousands
const randomFor = (format: FormatName) =>
    format === 'percent'
        ? Math.random()
        : Math.round(Math.random() * 10 ** (2 + Math.random() * 5))

export function AnimatedNumberPlayground() {
    const [count, setCount] = useState(99)
    const [stats, setStats] = useState({ revenue: 12480.5, users: 3204 })
    const [format, setFormat] = useState<FormatName>('plain')
    const [type, setType] = useState<(typeof typographyTypes)[number]>('h2')
    const [value, setValue] = useState(1234)

    return (
        <>
            <Section title="Examples">
                <Row>
                    <IconButton
                        icon="remove"
                        aria-label="Decrease"
                        fillType="outlined"
                        onClick={() => setCount((n) => n - 1)}
                    />
                    <Typography type="h3">
                        <AnimatedNumber value={count} />
                    </Typography>
                    <IconButton
                        icon="add"
                        aria-label="Increase"
                        onClick={() => setCount((n) => n + 1)}
                    />
                </Row>
                <Row>
                    <Card>
                        <CardContent>
                            <Typography type="caption">Revenue</Typography>
                            <Typography type="h4">
                                <AnimatedNumber
                                    value={stats.revenue}
                                    format={formats.currency}
                                />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography type="caption">Active users</Typography>
                            <Typography type="h4">
                                <AnimatedNumber
                                    value={stats.users}
                                    format={formats.compact}
                                />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button
                        fillType="outlined"
                        startIcon="refresh"
                        onClick={() =>
                            setStats({
                                revenue: Math.random() * 50000,
                                users: Math.round(Math.random() * 2_000_000),
                            })
                        }
                    >
                        Refresh stats
                    </Button>
                </Row>
            </Section>
            <Section title="Format and size">
                <Row>
                    <SelectControl
                        label="format"
                        value={format}
                        options={formatNames}
                        onChange={(next) => {
                            setFormat(next)
                            setValue(randomFor(next))
                        }}
                    />
                    <SelectControl
                        label="typography"
                        value={type}
                        options={typographyTypes}
                        onChange={setType}
                    />
                    <Button onClick={() => setValue(randomFor(format))}>
                        Random value
                    </Button>
                </Row>
                <Row>
                    <Typography type={type}>
                        <AnimatedNumber
                            value={value}
                            format={formats[format]}
                        />
                    </Typography>
                </Row>
            </Section>
        </>
    )
}
