import { useState } from 'react'
import {
    Switch,
    FloatingToolbar,
    FloatingToolbarButton,
    FloatingToolbarSeparator,
    Typography,
    useSnackbar,
} from 'anvilui'
import { Row, Section, Labeled } from '../ui'

export function FloatingToolbarPlayground() {
    const snackbar = useSnackbar()
    const [inverse, setInverse] = useState(false)
    const say = (message: string) => () => snackbar.show({ message })

    return (
        <>
            <Section title="Like the screenshot">
                <Row>
                    <Labeled label="inverseColor">
                        <Switch
                            checked={inverse}
                            onCheckedChange={setInverse}
                        />
                    </Labeled>
                </Row>
                <Row>
                    <FloatingToolbar
                        inverseColor={inverse}
                        aria-label="Browser"
                    >
                        <FloatingToolbarButton
                            icon="arrow_back"
                            aria-label="Back"
                            onClick={say('Back')}
                        />
                        <FloatingToolbarButton
                            icon="arrow_forward"
                            aria-label="Forward"
                            onClick={say('Forward')}
                        />
                        <FloatingToolbarButton
                            icon="add"
                            aria-label="New tab"
                            fillType="filled"
                            onClick={say('New tab')}
                        />
                        <FloatingToolbarButton
                            icon="tab"
                            aria-label="Tabs"
                            onClick={say('Tabs')}
                        />
                        <FloatingToolbarButton
                            icon="more_vert"
                            aria-label="More"
                            onClick={say('More')}
                        />
                    </FloatingToolbar>
                </Row>
            </Section>
            <Section title="With a separator, one disabled">
                <Row>
                    <FloatingToolbar
                        inverseColor={inverse}
                        aria-label="Formatting"
                    >
                        <FloatingToolbarButton
                            icon="format_bold"
                            aria-label="Bold"
                        />
                        <FloatingToolbarButton
                            icon="format_italic"
                            aria-label="Italic"
                        />
                        <FloatingToolbarButton
                            icon="format_underlined"
                            aria-label="Underline"
                            disabled
                        />
                        <FloatingToolbarSeparator />
                        <FloatingToolbarButton
                            icon="format_align_left"
                            aria-label="Align left"
                        />
                        <FloatingToolbarButton
                            icon="format_align_center"
                            aria-label="Align center"
                        />
                    </FloatingToolbar>
                </Row>
            </Section>
            <Section title="Vertical">
                <Row>
                    <FloatingToolbar
                        inverseColor={inverse}
                        aria-label="Tools"
                        orientation="vertical"
                    >
                        <FloatingToolbarButton icon="edit" aria-label="Draw" />
                        <FloatingToolbarButton
                            icon="add"
                            aria-label="Add"
                            fillType="filled"
                        />
                        <FloatingToolbarSeparator />
                        <FloatingToolbarButton icon="undo" aria-label="Undo" />
                        <FloatingToolbarButton icon="redo" aria-label="Redo" />
                    </FloatingToolbar>
                </Row>
            </Section>
        </>
    )
}
