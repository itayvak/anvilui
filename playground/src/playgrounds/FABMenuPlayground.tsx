import { useState } from 'react'
import {
    Checkbox,
    FABMenu,
    FABMenuItem,
    Typography,
    useConfetti,
} from 'anvilui'
import type { FABMenuProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { Row, Section, SelectControl, Labeled } from '../ui'

const sides = ['top', 'bottom'] as const
const aligns = ['end', 'center', 'start'] as const
const closeIcons = [
    'close',
    'keyboard_arrow_down',
    'keyboard_arrow_up',
    'arrow_downward',
    'remove',
] as const

export function FABMenuPlayground() {
    const fire = useConfetti()
    const [color, setColor] =
        useState<NonNullable<FABMenuProps['color']>>('primary')
    const [fillType, setFillType] =
        useState<NonNullable<FABMenuProps['fillType']>>('filled')
    const [side, setSide] = useState<(typeof sides)[number]>('top')
    const [align, setAlign] = useState<(typeof aligns)[number]>('end')
    const [closeIcon, setCloseIcon] =
        useState<(typeof closeIcons)[number]>('close')
    const [disabledItem, setDisabledItem] = useState(false)
    const [sticky, setSticky] = useState(true)
    const [open, setOpen] = useState(false)
    const [picked, setPicked] = useState('nothing yet')

    return (
        <>
            <Section title="Options">
                <Row>
                    <SelectControl
                        label="color"
                        value={color}
                        options={colors}
                        onChange={setColor}
                    />
                    <SelectControl
                        label="fillType"
                        value={fillType}
                        options={fillTypes}
                        onChange={setFillType}
                    />
                    <SelectControl
                        label="side"
                        value={side}
                        options={sides}
                        onChange={setSide}
                    />
                    <SelectControl
                        label="align"
                        value={align}
                        options={aligns}
                        onChange={setAlign}
                    />
                    <SelectControl
                        label="closeIcon"
                        value={closeIcon}
                        options={closeIcons}
                        onChange={setCloseIcon}
                    />
                    <Labeled label="sticky">
                        <Checkbox
                            checked={sticky}
                            onCheckedChange={setSticky}
                        />
                    </Labeled>
                    <Labeled label={'disable "Upload"'}>
                        <Checkbox
                            checked={disabledItem}
                            onCheckedChange={setDisabledItem}
                        />
                    </Labeled>
                </Row>
                <Row>
                    <Typography type="caption">
                        Picked: {picked}. Open (controlled):{' '}
                        {open ? 'yes' : 'no'}
                    </Typography>
                </Row>
                {/* Room for the items to open into, either way */}
                <Row style={{ justifyContent: 'center', padding: '280px 0' }}>
                    <FABMenu
                        icon="add"
                        closeIcon={closeIcon}
                        sticky={sticky}
                        aria-label="Create"
                        color={color}
                        fillType={fillType}
                        side={side}
                        align={align}
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <FABMenuItem
                            icon="celebration"
                            onClick={(e) => {
                                setPicked('Celebrate')
                                fire(e.currentTarget)
                            }}
                        >
                            Celebrate
                        </FABMenuItem>
                        <FABMenuItem
                            icon="upload"
                            disabled={disabledItem}
                            onClick={() => setPicked('Upload')}
                        >
                            Upload
                        </FABMenuItem>
                        <FABMenuItem
                            icon="folder"
                            onClick={() => setPicked('New folder')}
                        >
                            New folder
                        </FABMenuItem>
                        <FABMenuItem
                            icon="edit"
                            onClick={() => setPicked('Note')}
                        >
                            Note
                        </FABMenuItem>
                    </FABMenu>
                </Row>
            </Section>
            <Section title="Uncontrolled">
                <Row style={{ paddingTop: 240 }}>
                    <FABMenu icon="edit" aria-label="Compose" color="tonal">
                        <FABMenuItem icon="mail">Email</FABMenuItem>
                        <FABMenuItem icon="chat">Message</FABMenuItem>
                        <FABMenuItem icon="event">Event</FABMenuItem>
                    </FABMenu>
                </Row>
            </Section>
        </>
    )
}
