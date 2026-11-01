import { useContext } from 'react'
import {
    AnvilContext,
    Button,
    Dialog,
    DialogActions,
    DialogClose,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    Field,
    FieldDescription,
    FieldError,
    HoldButton,
    IconButton,
    Progress,
    Radio,
    RadioGroup,
    Slider,
    Switch,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Textarea,
    ToggleGroup,
    ToggleGroupItem,
    Tooltip,
    Typography,
} from 'anvilui'
import { me } from './data'

export type Settings = {
    density: 'comfortable' | 'compact'
    defaultReply: 'reply' | 'replyAll'
    /** How long the Undo on "Message sent" stays */
    undoSeconds: number
    signature: string
    vacation: boolean
    vacationMessage: string
}

export const defaultSettings: Settings = {
    density: 'comfortable',
    defaultReply: 'reply',
    undoSeconds: 10,
    signature: `${me.name.split(' ')[0]}\nSent with AMail`,
    vacation: false,
    vacationMessage: '',
}

export function SettingsDialog({
    settings,
    onChange,
    onEmptyTrash,
}: {
    settings: Settings
    onChange: (settings: Settings) => void
    onEmptyTrash: () => void
}) {
    const avl = useContext(AnvilContext)
    const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
        onChange({ ...settings, [key]: value })

    return (
        <Dialog>
            <Tooltip label="Settings">
                <DialogTrigger
                    render={
                        <IconButton
                            icon="settings"
                            fillType="text"
                            color="container"
                            aria-label="Settings"
                        />
                    }
                />
            </Tooltip>
            <DialogPopup className="am-settings">
                <DialogTitle>Settings</DialogTitle>
                <Tabs defaultValue="general">
                    <TabsList>
                        <TabsTab value="general" icon="tune">
                            General
                        </TabsTab>
                        <TabsTab value="appearance" icon="palette">
                            Appearance
                        </TabsTab>
                        <TabsTab value="storage" icon="cloud">
                            Storage
                        </TabsTab>
                    </TabsList>

                    <TabsPanel value="general" className="am-settings-panel">
                        <fieldset className="am-fieldset">
                            <legend>
                                <Typography as="span" type="caption">
                                    Default reply
                                </Typography>
                            </legend>
                            <RadioGroup
                                value={settings.defaultReply}
                                onValueChange={(value) =>
                                    set(
                                        'defaultReply',
                                        value as Settings['defaultReply']
                                    )
                                }
                                className="am-radio-row"
                            >
                                <label className="am-radio">
                                    <Radio value="reply" />
                                    <Typography as="span">Reply</Typography>
                                </label>
                                <label className="am-radio">
                                    <Radio value="replyAll" />
                                    <Typography as="span">Reply all</Typography>
                                </label>
                            </RadioGroup>
                        </fieldset>

                        <Slider
                            label={`Undo send: ${settings.undoSeconds} seconds`}
                            min={5}
                            max={30}
                            step={5}
                            value={settings.undoSeconds}
                            onValueChange={(value) =>
                                set('undoSeconds', value as number)
                            }
                        />

                        <Field>
                            <Textarea
                                label="Signature"
                                rows={3}
                                value={settings.signature}
                                onValueChange={(value) =>
                                    set('signature', value)
                                }
                            />
                            <FieldDescription>
                                Added to new messages and replies
                            </FieldDescription>
                        </Field>

                        <label className="am-switch-row">
                            <span>
                                <Typography>Vacation responder</Typography>
                                <Typography type="caption">
                                    Reply automatically while you're away
                                </Typography>
                            </span>
                            <Switch
                                checked={settings.vacation}
                                onCheckedChange={(on) => set('vacation', on)}
                            />
                        </label>
                        {settings.vacation && (
                            <Field
                                validationMode="onChange"
                                validate={(value) =>
                                    String(value ?? '').trim()
                                        ? null
                                        : 'Write the automatic reply'
                                }
                            >
                                <Textarea
                                    label="Automatic reply"
                                    rows={3}
                                    required
                                    value={settings.vacationMessage}
                                    onValueChange={(value) =>
                                        set('vacationMessage', value)
                                    }
                                />
                                <FieldError />
                            </Field>
                        )}
                    </TabsPanel>

                    <TabsPanel value="appearance" className="am-settings-panel">
                        {avl && (
                            <div className="am-setting">
                                <Typography id="am-theme-label">
                                    Theme
                                </Typography>
                                <ToggleGroup
                                    aria-labelledby="am-theme-label"
                                    value={avl.colorMode}
                                    onValueChange={(value) =>
                                        avl.setColorMode(
                                            value as 'light' | 'dark'
                                        )
                                    }
                                >
                                    <ToggleGroupItem
                                        value="light"
                                        startIcon="light_mode"
                                    >
                                        Light
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="dark"
                                        startIcon="dark_mode"
                                    >
                                        Dark
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        )}
                        <div className="am-setting">
                            <Typography id="am-density-label">
                                Density
                            </Typography>
                            <ToggleGroup
                                aria-labelledby="am-density-label"
                                value={settings.density}
                                onValueChange={(value) =>
                                    set('density', value as Settings['density'])
                                }
                            >
                                <ToggleGroupItem
                                    value="comfortable"
                                    startIcon="density_medium"
                                >
                                    Comfortable
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="compact"
                                    startIcon="density_small"
                                >
                                    Compact
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </TabsPanel>

                    <TabsPanel value="storage" className="am-settings-panel">
                        <Progress label="4.2 GB of 15 GB used" value={28} />
                        <Typography type="caption">
                            Mail 3.1 GB · Attachments 0.9 GB · Trash 0.2 GB
                        </Typography>
                        <div>
                            <HoldButton
                                color="error"
                                fillType="outlined"
                                startIcon="delete_forever"
                                onConfirm={onEmptyTrash}
                            >
                                Hold to empty Trash
                            </HoldButton>
                        </div>
                    </TabsPanel>
                </Tabs>
                <DialogActions>
                    <DialogClose render={<Button />}>Done</DialogClose>
                </DialogActions>
            </DialogPopup>
        </Dialog>
    )
}
