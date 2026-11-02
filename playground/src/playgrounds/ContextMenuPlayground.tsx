import { useState } from 'react'
import {
    ContextMenu,
    ContextMenuTrigger,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    Typography,
} from 'anvilui'
import { Section } from '../ui'

const area = {
    display: 'grid',
    placeItems: 'center',
    height: 240,
    border: '1px dashed gray',
    borderRadius: 16,
    userSelect: 'none',
} as const

export function ContextMenuPlayground() {
    const [last, setLast] = useState('nothing yet')
    const pick = (action: string) => () => setLast(action)

    return (
        <>
            <Section title="Uncontrolled">
                <ContextMenu>
                    <ContextMenuTrigger style={area}>
                        <Typography>
                            Right-click (or long-press) here. Last action:{' '}
                            {last}
                        </Typography>
                    </ContextMenuTrigger>
                    <MenuPopup>
                        <MenuGroup>
                            <MenuItem startIcon="undo" onClick={pick('Undo')}>
                                Undo
                            </MenuItem>
                            <MenuItem startIcon="redo" disabled>
                                Redo (disabled)
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup>
                            <MenuItem
                                startIcon="content_cut"
                                onClick={pick('Cut')}
                            >
                                Cut
                            </MenuItem>
                            <MenuItem
                                startIcon="content_copy"
                                onClick={pick('Copy')}
                            >
                                Copy
                            </MenuItem>
                            <MenuItem
                                startIcon="content_paste"
                                onClick={pick('Paste')}
                            >
                                Paste
                            </MenuItem>
                            <MenuSubmenu>
                                <MenuSubmenuTrigger startIcon="share">
                                    Share
                                </MenuSubmenuTrigger>
                                <MenuPopup>
                                    <MenuItem onClick={pick('Email')}>
                                        Email
                                    </MenuItem>
                                    <MenuItem onClick={pick('Copy link')}>
                                        Copy link
                                    </MenuItem>
                                </MenuPopup>
                            </MenuSubmenu>
                        </MenuGroup>
                        <MenuGroup>
                            <MenuItem
                                startIcon="delete"
                                onClick={pick('Delete')}
                            >
                                Delete a file with a very long name.txt
                            </MenuItem>
                        </MenuGroup>
                    </MenuPopup>
                </ContextMenu>
            </Section>
            <ControlledDemo />
        </>
    )
}

function ControlledDemo() {
    const [open, setOpen] = useState(false)

    return (
        <Section title="Controlled">
            <ContextMenu open={open} onOpenChange={setOpen}>
                <ContextMenuTrigger style={area}>
                    <Typography>Open: {String(open)}</Typography>
                </ContextMenuTrigger>
                <MenuPopup>
                    <MenuItem startIcon="edit">Rename</MenuItem>
                    <MenuItem startIcon="close">Close</MenuItem>
                </MenuPopup>
            </ContextMenu>
        </Section>
    )
}
