import { useState } from 'react'
import {
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuTrigger,
    Menubar,
    Switch,
    Typography,
} from 'anvilui'
import type { MenuItemProps } from 'anvilui'
import { Labeled, Row, Section, SelectControl } from '../ui'

export function MenubarPlayground() {
    const [disabled, setDisabled] = useState(false)
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
        'horizontal'
    )
    const [last, setLast] = useState<string | null>(null)

    const item = (label: string, icon?: MenuItemProps['startIcon']) => (
        <MenuItem startIcon={icon} onClick={() => setLast(label)}>
            {label}
        </MenuItem>
    )

    return (
        <Section title="States">
            <Row>
                <Labeled label="disabled">
                    <Switch checked={disabled} onCheckedChange={setDisabled} />
                </Labeled>
                <SelectControl
                    label="orientation"
                    value={orientation}
                    options={['horizontal', 'vertical']}
                    onChange={setOrientation}
                />
            </Row>
            <Row>
                <Menubar disabled={disabled} orientation={orientation}>
                    <Menu>
                        <MenuTrigger>File</MenuTrigger>
                        <MenuPopup>
                            <MenuGroup>
                                {item('New', 'add')}
                                {item('Open…', 'folder_open')}
                                <MenuSubmenu>
                                    <MenuSubmenuTrigger startIcon="history">
                                        Open recent
                                    </MenuSubmenuTrigger>
                                    <MenuPopup>
                                        {item('report.docx')}
                                        {item('budget.xlsx')}
                                        {item(
                                            'A file with a very long name that keeps going.txt'
                                        )}
                                    </MenuPopup>
                                </MenuSubmenu>
                            </MenuGroup>
                            <MenuGroup>
                                {item('Save', 'save')}
                                {item('Save as…')}
                            </MenuGroup>
                        </MenuPopup>
                    </Menu>
                    <Menu>
                        <MenuTrigger>Edit</MenuTrigger>
                        <MenuPopup>
                            {item('Undo', 'undo')}
                            {item('Redo', 'redo')}
                            <MenuItem startIcon="content_cut" disabled>
                                Cut (disabled)
                            </MenuItem>
                            {item('Copy', 'content_copy')}
                            {item('Paste', 'content_paste')}
                        </MenuPopup>
                    </Menu>
                    <Menu>
                        <MenuTrigger>View</MenuTrigger>
                        <MenuPopup>
                            {item('Zoom in', 'zoom_in')}
                            {item('Zoom out', 'zoom_out')}
                        </MenuPopup>
                    </Menu>
                    <Menu disabled>
                        <MenuTrigger>Disabled</MenuTrigger>
                        <MenuPopup>{item('Never shown')}</MenuPopup>
                    </Menu>
                </Menubar>
                <Typography>last picked: {String(last)}</Typography>
            </Row>
        </Section>
    )
}
