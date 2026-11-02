import { useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { FAB, Switch, Typography } from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const colors = [
    'primary',
    'tonal',
    'success',
    'warning',
    'error',
    'container',
    'surface',
] as const
const fills = ['filled', 'outlined', 'text'] as const
const actions: { icon: MaterialSymbol; label: string }[] = [
    { icon: 'edit', label: 'Compose' },
    { icon: 'add', label: 'New' },
    { icon: 'navigation', label: 'Navigate' },
]

export function FABPlayground() {
    const [size, setSize] = useState<(typeof sizes)[number]>('normal')
    const [color, setColor] = useState<(typeof colors)[number]>('primary')
    const [fill, setFill] = useState<(typeof fills)[number]>('filled')
    const [disabled, setDisabled] = useState(false)
    const [sticky, setSticky] = useState(true)

    const shared = { size, color, fillType: fill, disabled, sticky }

    return (
        <>
            <Section title="Icon only">
                <Row>
                    <SelectControl
                        label="size"
                        value={size}
                        options={sizes}
                        onChange={setSize}
                    />
                    <SelectControl
                        label="color"
                        value={color}
                        options={colors}
                        onChange={setColor}
                    />
                    <SelectControl
                        label="fillType"
                        value={fill}
                        options={fills}
                        onChange={setFill}
                    />
                    <Labeled label="disabled">
                        <Switch
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                    </Labeled>
                    <Labeled label="sticky">
                        <Switch checked={sticky} onCheckedChange={setSticky} />
                    </Labeled>
                </Row>
                <Row>
                    {actions.map((action) => (
                        <FAB
                            key={action.icon}
                            {...shared}
                            icon={action.icon}
                            aria-label={action.label}
                        />
                    ))}
                </Row>
            </Section>
            <Section title="Extended">
                <Row>
                    {actions.map((action) => (
                        <FAB
                            key={action.icon}
                            {...shared}
                            icon={action.icon}
                            label={action.label}
                        />
                    ))}
                </Row>
            </Section>
        </>
    )
}
