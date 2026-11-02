import { useState } from 'react'
import {
    Avatar,
    Badge,
    Card,
    CardContent,
    CardTitle,
    Checkbox,
    Icon,
    IconButton,
    List,
    ListItem,
    morph,
    Switch,
    Typography,
} from 'anvilui'
import { Section } from '../ui'

const box = { maxWidth: 420 }

export function ListPlayground() {
    const [wifi, setWifi] = useState(true)
    const [done, setDone] = useState<string[]>(['Milk'])
    const [openMail, setOpenMail] = useState<string | null>(null)
    const mail = inbox.find((m) => m.id === openMail)

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
            <Section title="Morph into a detail page">
                <div style={{ ...box, minHeight: 320 }}>
                    {mail ? (
                        <Card
                            data-morph-id={mail.id}
                            style={{ minHeight: 320 }}
                        >
                            <IconButton
                                icon="arrow_back"
                                aria-label="Back to inbox"
                                fillType="text"
                                onClick={() =>
                                    morph(mail.id, () => setOpenMail(null))
                                }
                            />
                            <CardTitle>{mail.subject}</CardTitle>
                            <CardContent>
                                <Typography type="caption">
                                    From {mail.from}
                                </Typography>
                                <Typography>{mail.body}</Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <List divided>
                            {inbox.map((m) => (
                                <ListItem
                                    key={m.id}
                                    data-morph-id={m.id}
                                    render={<button type="button" />}
                                    onClick={() =>
                                        morph(m.id, () => setOpenMail(m.id))
                                    }
                                    start={<Avatar name={m.from} />}
                                    label={m.subject}
                                    description={m.from}
                                    end={<Icon name="chevron_right" />}
                                />
                            ))}
                        </List>
                    )}
                </div>
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
                        start={<Avatar name="Grace Hopper" color="tonal" />}
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

const inbox = [
    {
        id: 'mail-1',
        from: 'Grace Hopper',
        subject: 'Found the bug',
        body: 'It was a moth, stuck in relay 70. Taped it into the logbook so nobody believes we made it up.',
    },
    {
        id: 'mail-2',
        from: 'Alan Turing',
        subject: 'Lunch on Thursday?',
        body: 'The new place by the river does a decent soup. I can bring the chess board if you want a rematch.',
    },
    {
        id: 'mail-3',
        from: 'Katherine Johnson',
        subject: 'Numbers check out',
        body: 'Ran the trajectory by hand again. Tell them they are good to go.',
    },
]
