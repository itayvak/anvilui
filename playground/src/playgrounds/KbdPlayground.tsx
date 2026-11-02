import { useState } from 'react'
import { Checkbox, Kbd, Typography } from 'anvilui'
import { Row, Section, Labeled } from '../ui'

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

export function KbdPlayground() {
    const [listen, setListen] = useState(true)

    return (
        <>
            <Section title="Shortcuts">
                <Row>
                    <Typography type="caption">
                        Press the keys on your keyboard: they press down here
                        too.
                    </Typography>
                </Row>
                <Row>
                    <Typography>Search</Typography>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </Row>
                <Row>
                    <Typography>Save</Typography>
                    <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
                </Row>
                <Row>
                    <Typography>Command palette</Typography>
                    <Kbd>⇧</Kbd>
                    <Kbd>⌘</Kbd>
                    <Kbd>P</Kbd>
                </Row>
                <Row>
                    <Typography>Close</Typography>
                    <Kbd>Esc</Kbd>
                    <Typography>Confirm</Typography>
                    <Kbd>↵</Kbd>
                    <Typography>Next field</Typography>
                    <Kbd>Tab</Kbd>
                </Row>
                <Row>
                    <Typography>
                        Inline in text: press <Kbd>?</Kbd> to see every
                        shortcut, or <Kbd>Space</Kbd> to play.
                    </Typography>
                </Row>
            </Section>
            <Section title="A little keyboard">
                <Row>
                    <Labeled label="listen">
                        <Checkbox
                            checked={listen}
                            onCheckedChange={setListen}
                        />
                    </Labeled>
                </Row>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    {rows.map((row) => (
                        <div key={row} style={{ display: 'flex', gap: 6 }}>
                            {[...row].map((letter) => (
                                <Kbd key={letter} listen={listen}>
                                    {letter}
                                </Kbd>
                            ))}
                        </div>
                    ))}
                    <Kbd listen={listen} style={{ width: 220 }}>
                        Space
                    </Kbd>
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                        <Kbd listen={listen}>←</Kbd>
                        <Kbd listen={listen}>↑</Kbd>
                        <Kbd listen={listen}>↓</Kbd>
                        <Kbd listen={listen}>→</Kbd>
                    </div>
                </div>
            </Section>
            <Section title="listen and listenFor">
                <Row>
                    <Typography>
                        <Kbd listen={false}>K</Kbd> stays put with{' '}
                        <code>listen={'{false}'}</code>, and{' '}
                        <Kbd listenFor="Shift">Hold me</Kbd> listens for Shift
                        with <code>listenFor="Shift"</code>.
                    </Typography>
                </Row>
            </Section>
        </>
    )
}
