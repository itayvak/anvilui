import { useState } from 'react'
import {
    AnvilRoot,
    Button,
    Card,
    CardContent,
    CardTitle,
    Checkbox,
    Chip,
    Input,
    Switch,
    Typography,
    createTheme,
    createThemeFromImage,
    useAnvil,
} from 'anvilui'
import type { ThemePair } from 'anvilui'
import { Labeled, Row, Section, Stack } from '../ui'

export function ThemePlayground() {
    const { colorMode } = useAnvil()
    const [seed, setSeed] = useState('#0B6E4F')
    const [theme, setTheme] = useState<ThemePair>(() => createTheme(seed))
    const [error, setError] = useState('')

    return (
        <>
            <Section title="Source">
                <Row>
                    <Labeled label="primary color">
                        <input
                            type="color"
                            value={seed}
                            onChange={(e) => {
                                setSeed(e.target.value)
                                setTheme(createTheme(e.target.value))
                            }}
                        />
                    </Labeled>
                    <Labeled label="or pick an image">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                try {
                                    const t = await createThemeFromImage(file)
                                    setError('')
                                    setTheme(t)
                                    setSeed(t.light.primary.toLowerCase())
                                } catch (err) {
                                    setError(String(err))
                                }
                            }}
                        />
                    </Labeled>
                </Row>
                {error && <Typography>{error}</Typography>}
            </Section>
            <Section title="Preview">
                {/* Follows the playground's own light/dark toggle */}
                <AnvilRoot
                    colorMode={colorMode}
                    lightTheme={theme.light}
                    darkTheme={theme.dark}
                >
                    <Stack style={{ padding: 16 }}>
                        <Row>
                            <Button>Primary</Button>
                            <Button color="secondary">Secondary</Button>
                            <Button fillType="outlined">Outlined</Button>
                            <Button fillType="text">Text</Button>
                        </Row>
                        <Row>
                            <Checkbox defaultChecked aria-label="Checkbox" />
                            <Switch defaultChecked aria-label="Switch" />
                            <Chip>Chip</Chip>
                            <Input label="Input" placeholder="Muted text" />
                        </Row>
                        <Row>
                            {(['primary', 'surface', 'container'] as const).map(
                                (color) => (
                                    <Card key={color} color={color}>
                                        <CardTitle>{color}</CardTitle>
                                        <CardContent>
                                            Text on a {color} card.
                                        </CardContent>
                                    </Card>
                                )
                            )}
                        </Row>
                    </Stack>
                </AnvilRoot>
            </Section>
            <Section title="Generated colors">
                <Row>
                    {Object.entries(theme[colorMode]).map(([role, value]) => (
                        <Stack key={role} style={{ width: 120 }}>
                            <div
                                style={{
                                    height: 32,
                                    borderRadius: 8,
                                    background: value,
                                    border: '1px solid var(--avl-color-divider)',
                                }}
                            />
                            <Typography type="caption">
                                {role}
                                <br />
                                {value}
                            </Typography>
                        </Stack>
                    ))}
                </Row>
            </Section>
        </>
    )
}
