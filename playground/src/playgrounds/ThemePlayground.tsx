import { useContext, useState } from 'react'
import {
    AnvilContext,
    Button,
    Card,
    CardContent,
    CardTitle,
    Checkbox,
    IconButton,
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    NavigationRail,
    NavigationRailItem,
    Radio,
    RadioButton,
    RadioButtonGroup,
    RadioGroup,
    Switch,
    Typography,
} from 'anvilui'
import { colors, fillTypes } from '../options'
import { Grid, Row, Section } from '../ui'

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)
const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const isOnKey = (key: string) => /^on[A-Z]/.test(key)

// Same naming as themeToCssVariables in core
function cssVariable(key: string) {
    return `--avl-color-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
}

// The key of the color drawn on top of this one, or the one it is drawn on top
// of: primary <-> onPrimary, primaryContainer <-> onPrimaryContainer
function partnerKey(key: string) {
    return isOnKey(key) ? lowerFirst(key.slice(2)) : 'on' + upperFirst(key)
}

// primary, onPrimary, primaryContainer and onPrimaryContainer are one family
function familyOf(key: string) {
    const base = isOnKey(key) ? lowerFirst(key.slice(2)) : key
    return base.replace(/(?<=[a-z])Container$/, '')
}

function familyTitle(family: string) {
    return upperFirst(family.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase())
}

function Swatch(props: { name: string; value: string; partner?: string }) {
    const { name, value, partner } = props

    return (
        <div className="pg-swatch" title={cssVariable(name)}>
            <div
                className="pg-swatch-chip"
                style={{
                    backgroundColor: `var(${cssVariable(name)})`,
                    color: partner ? `var(${cssVariable(partner)})` : undefined,
                }}
            >
                {partner && 'Aa'}
            </div>
            <Typography type="caption">{name}</Typography>
            <Typography type="caption" className="pg-swatch-value">
                {value}
            </Typography>
        </div>
    )
}

export function ThemePlayground() {
    const avl = useContext(AnvilContext)
    const [railExpanded, setRailExpanded] = useState(true)
    if (!avl) throw new Error('ThemePlayground must be used inside AnvilRoot')

    const { colorMode, lightTheme, darkTheme } = avl
    const theme = colorMode === 'light' ? lightTheme : darkTheme

    // Built from the theme itself, so a color added to Theme shows up here
    const families = new Map<string, [key: string, value: string][]>()
    for (const [key, value] of Object.entries(theme)) {
        const family = familyOf(key)
        families.set(family, [...(families.get(family) ?? []), [key, value]])
    }

    return (
        <>
            <Section title="Buttons">
                {fillTypes.map((fillType) => (
                    <Row key={fillType}>
                        {colors.map((color) => (
                            <Button
                                key={color}
                                color={color}
                                fillType={fillType}
                            >
                                {color}
                            </Button>
                        ))}
                    </Row>
                ))}
            </Section>

            <Section title="Cards">
                <Grid>
                    {colors.map((color) => (
                        <Card key={color} color={color}>
                            <CardTitle>{color}</CardTitle>
                            <CardContent>
                                <Typography>Text on {color}.</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Section>

            <Section title="Controls">
                <Row>
                    <label className="pg-checkbox">
                        <Checkbox />
                        <Typography>unchecked</Typography>
                    </label>
                    <label className="pg-checkbox">
                        <Checkbox defaultChecked />
                        <Typography>checked</Typography>
                    </label>
                    <label className="pg-checkbox">
                        <Switch />
                        <Typography>off</Typography>
                    </label>
                    <label className="pg-checkbox">
                        <Switch defaultChecked />
                        <Typography>on</Typography>
                    </label>
                </Row>
                <Row>
                    <RadioGroup
                        aria-label="Radio"
                        defaultValue="b"
                        style={{ flexDirection: 'row' }}
                    >
                        {['a', 'b', 'c'].map((value) => (
                            <label key={value} className="pg-checkbox">
                                <Radio value={value} />
                                <Typography>{value}</Typography>
                            </label>
                        ))}
                    </RadioGroup>
                    <RadioButtonGroup aria-label="Radio buttons" defaultValue="Week">
                        {['Day', 'Week', 'Month'].map((value) => (
                            <RadioButton key={value} value={value}>
                                {value}
                            </RadioButton>
                        ))}
                    </RadioButtonGroup>
                </Row>
                <Row>
                    {colors.map((color) => (
                        <IconButton
                            key={color}
                            icon="favorite"
                            color={color}
                            aria-label={color}
                        />
                    ))}
                </Row>
            </Section>

            <Section title="Menu">
                <Row>
                    <Menu>
                        <MenuTrigger
                            render={<Button endIcon="arrow_drop_down" />}
                        >
                            Open menu
                        </MenuTrigger>
                        <MenuPopup>
                            <MenuGroup>
                                <MenuItem startIcon="person">Profile</MenuItem>
                                <MenuItem startIcon="settings">
                                    Settings
                                </MenuItem>
                                <MenuItem startIcon="delete" disabled>
                                    Delete account
                                </MenuItem>
                            </MenuGroup>
                        </MenuPopup>
                    </Menu>
                </Row>
            </Section>

            <Section title="Navigation rail">
                <div className="pg-frame">
                    <NavigationRail
                        hasExpandButton
                        expanded={railExpanded}
                        setExpanded={setRailExpanded}
                        defaultValue={['profile']}
                    >
                        <NavigationRailItem
                            value="profile"
                            icon="person"
                            title="Profile"
                        />
                        <NavigationRailItem
                            value="photos"
                            icon="photo"
                            title="Photos"
                        />
                        <NavigationRailItem
                            value="settings"
                            icon="settings"
                            title="Settings"
                        />
                    </NavigationRail>
                </div>
            </Section>

            <Section title={`Swatches (${colorMode})`}>
                {[...families].map(([family, entries]) => (
                    <div key={family}>
                        <Typography type="caption">
                            {familyTitle(family)}
                        </Typography>
                        <div className="pg-swatches">
                            {entries.map(([key, value]) => {
                                const partner = partnerKey(key)
                                return (
                                    <Swatch
                                        key={key}
                                        name={key}
                                        value={value}
                                        partner={
                                            partner in theme
                                                ? partner
                                                : undefined
                                        }
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </Section>
        </>
    )
}
