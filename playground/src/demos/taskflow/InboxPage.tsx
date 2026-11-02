import type { Dispatch, SetStateAction } from 'react'
import {
    Avatar,
    Badge,
    Button,
    Divider,
    List,
    ListItem,
    Typography,
} from 'anvilui'
import { people, type Notification } from './data'

export function InboxPage({
    notifications,
    setNotifications,
}: {
    notifications: Notification[]
    setNotifications: Dispatch<SetStateAction<Notification[]>>
}) {
    const unread = notifications.filter((n) => n.unread)
    const read = notifications.filter((n) => !n.unread)

    const markRead = (id?: string) =>
        setNotifications((all) =>
            all.map((n) =>
                id === undefined || n.id === id ? { ...n, unread: false } : n
            )
        )

    const row = (n: Notification) => (
        <ListItem
            key={n.id}
            render={<button type="button" onClick={() => markRead(n.id)} />}
            className="tf-notification"
            data-unread={n.unread || undefined}
            start={
                <Badge count={n.unread ? undefined : 0}>
                    <Avatar name={people[n.from].name} />
                </Badge>
            }
            label={people[n.from].name}
            description={n.text}
            end={<Typography type="caption">{n.time}</Typography>}
            aria-label={`${n.unread ? 'Unread: ' : ''}${people[n.from].name} ${n.text}, ${n.time}`}
        />
    )

    return (
        <div className="tf-page">
            <div className="tf-page-header">
                <Typography type="caption">
                    {unread.length === 0
                        ? "You're all caught up"
                        : `${unread.length} unread`}
                </Typography>
                <span className="tf-spacer" />
                <Button
                    fillType="text"
                    startIcon="done_all"
                    disabled={unread.length === 0}
                    onClick={() => markRead()}
                >
                    Mark all as read
                </Button>
            </div>

            {unread.length > 0 && <List>{unread.map(row)}</List>}
            {unread.length > 0 && read.length > 0 && (
                <Divider label="Earlier" />
            )}
            <List>{read.map(row)}</List>
        </div>
    )
}
