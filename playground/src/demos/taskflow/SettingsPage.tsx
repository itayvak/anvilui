import { useContext, useState } from 'react'
import {
    AnvilContext,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    HoldButton,
    List,
    ListItem,
    Select,
    SelectItem,
    Slider,
    Switch,
    ToggleGroup,
    ToggleGroupItem,
    Typography,
    useSnackbar,
} from 'anvilui'
import { me } from './data'

const startPages = {
    tasks: 'My tasks',
    projects: 'Projects',
    inbox: 'Inbox',
}

const notificationSettings = [
    {
        id: 'email',
        label: 'Email digest',
        description: 'A summary of your day, every morning at 8:00',
    },
    {
        id: 'push',
        label: 'Push notifications',
        description: 'On your phone and desktop',
    },
    {
        id: 'mentions',
        label: 'Only mentions',
        description: 'Mute everything except @mentions',
    },
]

export function SettingsPage() {
    const avl = useContext(AnvilContext)
    const snackbar = useSnackbar()
    const [startPage, setStartPage] = useState('tasks')
    const [focusHours, setFocusHours] = useState(4)
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        email: true,
        push: true,
        mentions: false,
    })

    return (
        <div className="tf-page tf-settings">
            <Card className="tf-profile">
                <CardContent className="tf-profile-content">
                    <Avatar size="big" name={me.name} />
                    <div>
                        <Typography type="h6" as="h2">
                            {me.name}
                        </Typography>
                        <Typography type="caption">{me.email}</Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        fillType="outlined"
                        startIcon="edit"
                        onClick={() =>
                            snackbar.show({
                                message: 'Profile editing is coming soon',
                            })
                        }
                    >
                        Edit profile
                    </Button>
                </CardActions>
            </Card>

            <section className="tf-settings-section">
                <Typography type="h6" as="h2">
                    Appearance
                </Typography>
                {avl && (
                    <div className="tf-setting">
                        <Typography id="tf-theme-label">Theme</Typography>
                        <ToggleGroup
                            aria-labelledby="tf-theme-label"
                            value={avl.colorMode}
                            onValueChange={(value) =>
                                avl.setColorMode(value as 'light' | 'dark')
                            }
                        >
                            <ToggleGroupItem
                                value="light"
                                startIcon="light_mode"
                            >
                                Light
                            </ToggleGroupItem>
                            <ToggleGroupItem value="dark" startIcon="dark_mode">
                                Dark
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                )}
                <Select
                    label="Open on start"
                    items={startPages}
                    value={startPage}
                    onValueChange={(value) => value && setStartPage(value)}
                    className="tf-setting-select"
                >
                    {Object.entries(startPages).map(([id, label]) => (
                        <SelectItem key={id} value={id}>
                            {label}
                        </SelectItem>
                    ))}
                </Select>
                <Slider
                    label={`Daily focus goal: ${focusHours} hours`}
                    min={1}
                    max={8}
                    step={1}
                    value={focusHours}
                    onValueChange={(value) => setFocusHours(value as number)}
                    className="tf-setting-slider"
                />
            </section>

            <Divider />

            <section className="tf-settings-section">
                <Typography type="h6" as="h2">
                    Notifications
                </Typography>
                <List>
                    {notificationSettings.map((s) => (
                        <ListItem
                            key={s.id}
                            render={<label />}
                            label={s.label}
                            description={s.description}
                            end={
                                <Switch
                                    checked={enabled[s.id]}
                                    onCheckedChange={(on) =>
                                        setEnabled({ ...enabled, [s.id]: on })
                                    }
                                />
                            }
                        />
                    ))}
                </List>
            </section>

            <Divider />

            <section className="tf-settings-section">
                <Typography type="h6" as="h2">
                    Danger zone
                </Typography>
                <Typography>
                    Deleting the workspace removes every project and task for
                    everyone in it. This can't be undone.
                </Typography>
                <div>
                    <HoldButton
                        color="error"
                        startIcon="delete_forever"
                        holdDuration={2000}
                        onConfirm={() =>
                            snackbar.show({
                                message:
                                    "Workspace deleted. Just kidding, it's a demo.",
                                closeButton: true,
                            })
                        }
                    >
                        Hold to delete workspace
                    </HoldButton>
                </div>
            </section>
        </div>
    )
}
