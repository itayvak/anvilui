import { useState } from 'react'
import {
    Switch,
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    Typography,
    useSnackbar,
} from 'anvilui'
import { Row, Section } from '../ui'

export function ToolbarPlayground() {
    const snackbar = useSnackbar()
    const [inverse, setInverse] = useState(false)
    const say = (message: string) => () => snackbar.show({ message })

    return (
        <>
            <Section title="Like the screenshot">
                <Row>
                    <label className="pg-checkbox">
                        <Switch
                            checked={inverse}
                            onCheckedChange={setInverse}
                        />
                        <Typography type="caption">inverseColor</Typography>
                    </label>
                </Row>
                <Row>
                    <Toolbar inverseColor={inverse} aria-label="Browser">
                        <ToolbarButton
                            icon="arrow_back"
                            aria-label="Back"
                            onClick={say('Back')}
                        />
                        <ToolbarButton
                            icon="arrow_forward"
                            aria-label="Forward"
                            onClick={say('Forward')}
                        />
                        <ToolbarButton
                            icon="add"
                            aria-label="New tab"
                            fillType="filled"
                            onClick={say('New tab')}
                        />
                        <ToolbarButton
                            icon="tab"
                            aria-label="Tabs"
                            onClick={say('Tabs')}
                        />
                        <ToolbarButton
                            icon="more_vert"
                            aria-label="More"
                            onClick={say('More')}
                        />
                    </Toolbar>
                </Row>
            </Section>
            <Section title="With a separator, one disabled">
                <Row>
                    <Toolbar inverseColor={inverse} aria-label="Formatting">
                        <ToolbarButton icon="format_bold" aria-label="Bold" />
                        <ToolbarButton
                            icon="format_italic"
                            aria-label="Italic"
                        />
                        <ToolbarButton
                            icon="format_underlined"
                            aria-label="Underline"
                            disabled
                        />
                        <ToolbarSeparator />
                        <ToolbarButton
                            icon="format_align_left"
                            aria-label="Align left"
                        />
                        <ToolbarButton
                            icon="format_align_center"
                            aria-label="Align center"
                        />
                    </Toolbar>
                </Row>
            </Section>
            <Section title="Vertical">
                <Row>
                    <Toolbar
                        inverseColor={inverse}
                        aria-label="Tools"
                        orientation="vertical"
                    >
                        <ToolbarButton icon="edit" aria-label="Draw" />
                        <ToolbarButton
                            icon="add"
                            aria-label="Add"
                            fillType="filled"
                        />
                        <ToolbarSeparator />
                        <ToolbarButton icon="undo" aria-label="Undo" />
                        <ToolbarButton icon="redo" aria-label="Redo" />
                    </Toolbar>
                </Row>
            </Section>
        </>
    )
}
