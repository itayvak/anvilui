import { useState } from 'react'
import {
    Button,
    ButtonGroup,
    IconButton,
    Input,
    Popover,
    PopoverClose,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
    Switch,
    Typography,
} from 'anvilui'
import { Row, Section, SelectControl, Labeled } from '../ui'

const sides = ['bottom', 'top', 'left', 'right'] as const

export function PopoverPlayground() {
    const [side, setSide] = useState<(typeof sides)[number]>('bottom')
    const [open, setOpen] = useState(false)

    return (
        <>
            <Section title="Examples">
                <Row>
                    <SelectControl
                        label="side"
                        value={side}
                        options={sides}
                        onChange={setSide}
                    />
                </Row>
                <Row>
                    <Popover>
                        <PopoverTrigger render={<Button />}>
                            Share
                        </PopoverTrigger>
                        <PopoverPopup side={side}>
                            <PopoverTitle>Share this page</PopoverTitle>
                            <PopoverDescription>
                                Anyone with the link can view it.
                            </PopoverDescription>
                            <Input
                                label="Link"
                                defaultValue="https://example.com/page"
                                readOnly
                            />
                            <ButtonGroup>
                                <PopoverClose
                                    render={<Button fillType="outlined" />}
                                >
                                    Cancel
                                </PopoverClose>
                                <PopoverClose render={<Button />}>
                                    Copy link
                                </PopoverClose>
                            </ButtonGroup>
                        </PopoverPopup>
                    </Popover>

                    <Popover>
                        <PopoverTrigger
                            render={
                                <IconButton
                                    icon="tune"
                                    fillType="outlined"
                                    aria-label="Settings"
                                />
                            }
                        />
                        <PopoverPopup side={side}>
                            <PopoverTitle>Settings</PopoverTitle>
                            <Labeled label="Notifications" type="body">
                                <Switch defaultChecked />
                            </Labeled>
                            <Labeled label="Compact mode" type="body">
                                <Switch />
                            </Labeled>
                        </PopoverPopup>
                    </Popover>
                </Row>
            </Section>
            <Section title="Controlled">
                <Row>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger render={<Button fillType="outlined" />}>
                            Toggle
                        </PopoverTrigger>
                        <PopoverPopup side={side}>
                            <PopoverTitle>Controlled</PopoverTitle>
                            <PopoverDescription>
                                Its open state lives in the page.
                            </PopoverDescription>
                        </PopoverPopup>
                    </Popover>
                    <Typography>open: {String(open)}</Typography>
                </Row>
            </Section>
        </>
    )
}
