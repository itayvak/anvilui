import { useState } from 'react'
import {
    Avatar,
    Button,
    SplitButton,
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
import { Row, Section, SelectControl } from '../ui'

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
                            <SplitButton>
                                <PopoverClose
                                    render={<Button fillType="outlined" />}
                                >
                                    Cancel
                                </PopoverClose>
                                <PopoverClose render={<Button />}>
                                    Copy link
                                </PopoverClose>
                            </SplitButton>
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
                            <label className="pg-checkbox">
                                <Switch defaultChecked />
                                <Typography>Notifications</Typography>
                            </label>
                            <label className="pg-checkbox">
                                <Switch />
                                <Typography>Compact mode</Typography>
                            </label>
                        </PopoverPopup>
                    </Popover>
                </Row>
            </Section>
            <Section title="Morph from the trigger">
                <Row>
                    <Popover morph>
                        <PopoverTrigger
                            aria-label="Ada Lovelace"
                            render={
                                <Avatar
                                    name="Ada Lovelace"
                                    size="big"
                                    render={<button type="button" />}
                                />
                            }
                        />
                        <PopoverPopup side={side}>
                            <PopoverTitle>Ada Lovelace</PopoverTitle>
                            <PopoverDescription>
                                Mathematician. Wrote the first program for the
                                Analytical Engine.
                            </PopoverDescription>
                            <PopoverClose render={<Button fillType="text" />}>
                                Close
                            </PopoverClose>
                        </PopoverPopup>
                    </Popover>
                    <Popover morph>
                        <PopoverTrigger
                            render={
                                <IconButton
                                    icon="info"
                                    aria-label="What is this?"
                                    fillType="outlined"
                                />
                            }
                        />
                        <PopoverPopup side={side}>
                            <PopoverTitle>Morphing popovers</PopoverTitle>
                            <PopoverDescription>
                                The button grows into this bubble, and shrinks
                                back when it closes.
                            </PopoverDescription>
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
