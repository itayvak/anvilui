import { useState } from 'react'
import {
    Button,
    Checkbox,
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuTrigger,
    Radio,
    RadioGroup,
    Typography,
} from 'anvilui'
import type { MenuItemProps } from 'anvilui'
import { sampleIcons } from '../options'
import { Row, Section, SelectControl } from '../ui'

const iconOptions = ['none', ...sampleIcons] as const
const sides = ['bottom', 'top', 'left', 'right'] as const
const aligns = ['start', 'center', 'end'] as const

const submenuLabels = {
    none: 'no submenu',
    one: 'one submenu',
    two: 'two submenus',
}

type IconOption = (typeof iconOptions)[number]
type SubmenuOption = keyof typeof submenuLabels
type ItemIcons = Pick<MenuItemProps, 'startIcon' | 'endIcon'>
type SubmenuData = { label: string; items: string[]; submenu?: SubmenuData }

const submenuOptions = Object.keys(submenuLabels) as SubmenuOption[]

// "Two submenus" nests the second one inside the first
const submenuData: SubmenuData = {
    label: 'Share',
    items: ['Email', 'Copy link', 'Messages'],
    submenu: { label: 'Send to', items: ['Slack', 'Teams', 'Discord'] },
}

// Renders `levels` submenus, each inside the one before it
function PlaygroundSubmenu(props: {
    data: SubmenuData
    levels: number
    itemProps: ItemIcons
}) {
    const { data, levels, itemProps } = props

    return (
        <MenuSubmenu>
            <MenuSubmenuTrigger startIcon={itemProps.startIcon}>
                {data.label}
            </MenuSubmenuTrigger>
            <MenuPopup>
                <MenuGroup>
                    {data.items.map((item) => (
                        <MenuItem key={item} {...itemProps}>
                            {item}
                        </MenuItem>
                    ))}
                    {levels > 1 && data.submenu && (
                        <PlaygroundSubmenu
                            data={data.submenu}
                            levels={levels - 1}
                            itemProps={itemProps}
                        />
                    )}
                </MenuGroup>
            </MenuPopup>
        </MenuSubmenu>
    )
}

export function MenuPlayground() {
    const [startIcon, setStartIcon] = useState<IconOption>('home')
    const [endIcon, setEndIcon] = useState<IconOption>('none')
    const [side, setSide] = useState<(typeof sides)[number]>('bottom')
    const [align, setAlign] = useState<(typeof aligns)[number]>('start')
    const [lastDisabled, setLastDisabled] = useState(true)
    const [split, setSplit] = useState(true)
    const [submenuOption, setSubmenuOption] = useState<SubmenuOption>('one')

    const submenuLevels = submenuOptions.indexOf(submenuOption)

    const itemProps = {
        startIcon: startIcon === 'none' ? undefined : startIcon,
        endIcon: endIcon === 'none' ? undefined : endIcon,
    }

    const lastItem = (
        <MenuItem {...itemProps} disabled={lastDisabled}>
            Delete account
        </MenuItem>
    )

    return (
        <Section title="Menu">
            <Row>
                <SelectControl
                    label="startIcon"
                    value={startIcon}
                    options={iconOptions}
                    onChange={setStartIcon}
                />
                <SelectControl
                    label="endIcon"
                    value={endIcon}
                    options={iconOptions}
                    onChange={setEndIcon}
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
                <label className="pg-checkbox">
                    <Checkbox
                        checked={lastDisabled}
                        onCheckedChange={setLastDisabled}
                    />
                    <Typography type="caption">last item disabled</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox checked={split} onCheckedChange={setSplit} />
                    <Typography type="caption">
                        split before last item
                    </Typography>
                </label>
                <RadioGroup
                    aria-label="Submenus"
                    value={submenuOption}
                    onValueChange={setSubmenuOption}
                    style={{ flexDirection: 'row' }}
                >
                    {submenuOptions.map((option) => (
                        <label key={option} className="pg-checkbox">
                            <Radio value={option} />
                            <Typography type="caption">
                                {submenuLabels[option]}
                            </Typography>
                        </label>
                    ))}
                </RadioGroup>
            </Row>
            {/* Padding so the popup has room to open on every side without
                Base UI flipping it to fit the viewport */}
            <Row style={{ padding: '8rem', justifyContent: 'center' }}>
                <Menu>
                    <MenuTrigger render={<Button endIcon="arrow_drop_down" />}>
                        Open menu
                    </MenuTrigger>
                    <MenuPopup side={side} align={align}>
                        <MenuGroup>
                            <MenuItem {...itemProps}>Profile</MenuItem>
                            <MenuItem {...itemProps}>Settings</MenuItem>
                            <MenuItem {...itemProps}>Favorites</MenuItem>
                            {submenuLevels > 0 && (
                                <PlaygroundSubmenu
                                    data={submenuData}
                                    levels={submenuLevels}
                                    itemProps={itemProps}
                                />
                            )}
                            {!split && lastItem}
                        </MenuGroup>
                        {split && <MenuGroup>{lastItem}</MenuGroup>}
                    </MenuPopup>
                </Menu>
            </Row>
        </Section>
    )
}
