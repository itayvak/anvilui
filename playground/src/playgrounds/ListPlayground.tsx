import { useState } from 'react'
import {
    Avatar,
    Badge,
    Checkbox,
    Icon,
    List,
    ListItem,
    Switch,
    Typography,
} from 'anvilui'
import { Section } from '../ui'

const box = { maxWidth: 420 }

export function ListPlayground() {
    const [wifi, setWifi] = useState(true)
    const [done, setDone] = useState<string[]>(['Milk'])

    return (
        <>
            <Section title="Settings (whole row toggles)">
                <List style={box}>
                    <ListItem
                        render={<label />}
                        start={<Icon name="wifi" />}
                        label="Wi-Fi"
                        description={wifi ? 'Connected to Home' : 'Off'}
                        end={
                            <Switch checked={wifi} onCheckedChange={setWifi} />
                        }
                    />
                    <ListItem
                        render={<label />}
                        start={<Icon name="bluetooth" />}
                        label="Bluetooth"
                        end={<Switch />}
                    />
                    <ListItem
                        render={<a href="#" />}
                        start={<Icon name="notifications" />}
                        label="Notifications"
                        description="Sounds, badges and lock screen"
                        end={<Icon name="chevron_right" />}
                    />
                </List>
            </Section>
            <Section title="Messages (avatars, divided)">
                <List divided style={box}>
                    <ListItem
                        render={<a href="#" />}
                        start={<Avatar name="Ada Lovelace" />}
                        label="Ada Lovelace"
                        description="The engine works! Come see it this afternoon if you're free."
                        end={
                            <Badge count={2}>
                                <Typography type="caption">10:42</Typography>
                            </Badge>
                        }
                    />
                    <ListItem
                        render={<a href="#" />}
                        start={<Avatar name="Grace Hopper" color="secondary" />}
                        label="Grace Hopper"
                        description="Found the bug. It was an actual moth. A long message wraps to a second line and then gets cut off with an ellipsis."
                        end="Yesterday"
                    />
                    <ListItem
                        render={<a href="#" />}
                        start={<Avatar />}
                        label="Unknown number"
                        end="Mon"
                    />
                </List>
            </Section>
            <Section title="Checklist (checkbox at the start)">
                <List style={box}>
                    {['Milk', 'Bread', 'Eggs'].map((item) => (
                        <ListItem
                            key={item}
                            render={<label />}
                            start={
                                <Checkbox
                                    checked={done.includes(item)}
                                    onCheckedChange={(on) =>
                                        setDone((d) =>
                                            on
                                                ? [...d, item]
                                                : d.filter((x) => x !== item)
                                        )
                                    }
                                />
                            }
                            label={item}
                        />
                    ))}
                </List>
                <Typography>done: {done.join(', ')}</Typography>
            </Section>
            <Section title="Static">
                <List style={box}>
                    <ListItem
                        start={<Icon name="mail" />}
                        label="someone@example.com"
                        description="Email"
                    />
                    <ListItem
                        start={<Icon name="call" />}
                        label="+1 555 0100"
                        description="Mobile"
                    />
                </List>
            </Section>
        </>
    )
}
