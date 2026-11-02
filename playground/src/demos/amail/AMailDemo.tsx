import { useEffect, useRef, useState } from 'react'
import {
    AppBar,
    Avatar,
    Button,
    Divider,
    Icon,
    IconButton,
    Input,
    NavigationDrawer,
    NavigationDrawerItem,
    NavigationDrawerPopup,
    NavigationDrawerTitle,
    NavigationDrawerTrigger,
    NavigationRail,
    NavigationRailItem,
    NavigationRailToggle,
    Popover,
    PopoverClose,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
    Progress,
    Typography,
    morph,
    useSnackbar,
} from 'anvilui'
import {
    folders,
    initialMessages,
    labels,
    mailMorphId,
    me,
    type Message,
} from './data'
import { MessageList } from './MessageList'
import { MessageView } from './MessageView'
import { ComposeSheet, type Draft } from './ComposeSheet'
import {
    SettingsDialog,
    defaultSettings,
    type Settings,
} from './SettingsDialog'
import './amail.css'

/** A folder id, `starred`, or `label-<id>` */
export type View = string

type Route = { view: View; messageId: string | null }

function routeFromHash(): Route {
    const [view, messageId] = window.location.hash.slice(1).split('/')
    return { view: view || 'inbox', messageId: messageId || null }
}

const sameRoute = (a: Route, b: Route) =>
    a.view === b.view && a.messageId === b.messageId

// Opening or closing a message in the same folder morphs between its row
// and the message. morph() needs the view to change synchronously, so the
// route is React state, and the URL hash follows it.
function changeRoute(from: Route, to: Route, apply: () => void) {
    const id = to.messageId ?? from.messageId
    if (id && from.view === to.view && from.messageId !== to.messageId) {
        morph(mailMorphId(id), apply)
    } else {
        apply()
    }
}

// The open folder and message live in the URL hash, so reloads and
// back/forward work
function useRoute() {
    const [route, setRoute] = useState(routeFromHash)
    const current = useRef(route)

    const show = (next: Route) => {
        current.current = next
        setRoute(next)
    }

    useEffect(() => {
        // Back/forward, and plain links like the folder list
        const onChange = () => {
            const next = routeFromHash()
            if (sameRoute(next, current.current)) return
            changeRoute(current.current, next, () => show(next))
        }
        window.addEventListener('hashchange', onChange)
        window.addEventListener('popstate', onChange)
        return () => {
            window.removeEventListener('hashchange', onChange)
            window.removeEventListener('popstate', onChange)
        }
    }, [])

    const navigate = (view: View, messageId: string | null = null) => {
        const next = { view, messageId }
        if (sameRoute(next, current.current)) return
        changeRoute(current.current, next, () => {
            // pushState doesn't fire hashchange, so this doesn't loop back
            history.pushState(
                null,
                '',
                messageId ? `#${view}/${messageId}` : `#${view}`
            )
            show(next)
        })
    }

    return [route, navigate] as const
}

export function inView(message: Message, view: View) {
    if (view === 'starred') return message.starred && message.folder !== 'trash'
    if (view.startsWith('label-')) {
        return (
            message.labels.includes(
                view.slice(6) as Message['labels'][number]
            ) && message.folder !== 'trash'
        )
    }
    return message.folder === view
}

function viewName(view: View) {
    if (view.startsWith('label-')) {
        return labels.find((l) => `label-${l.id}` === view)?.label ?? 'Label'
    }
    return folders.find((f) => f.id === view)?.label ?? 'Inbox'
}

function matches(message: Message, query: string) {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return [
        message.subject,
        message.from.name,
        message.from.email,
        ...message.body,
    ]
        .join(' ')
        .toLowerCase()
        .includes(q)
}

export function AMailDemo() {
    const [route, navigate] = useRoute()
    const snackbar = useSnackbar()
    const [messages, setMessages] = useState(initialMessages)
    const [search, setSearch] = useState('')
    const [settings, setSettings] = useState<Settings>(defaultSettings)
    const [compose, setCompose] = useState<{ open: boolean; draft: Draft }>({
        open: false,
        draft: { key: 0 },
    })

    const visible = messages.filter(
        (m) =>
            (search ? m.folder !== 'trash' : inView(m, route.view)) &&
            matches(m, search)
    )
    const open = messages.find((m) => m.id === route.messageId) ?? null
    const unreadIn = (view: View) =>
        messages.filter((m) => inView(m, view) && m.unread).length

    const update = (ids: Iterable<string>, change: Partial<Message>) => {
        const set = new Set(ids)
        setMessages((all) =>
            all.map((m) => (set.has(m.id) ? { ...m, ...change } : m))
        )
    }

    // Moves messages to a folder, with an Undo that puts each one back
    const move = (
        ids: string[],
        folder: Message['folder'],
        message: string
    ) => {
        const before = new Map(
            messages
                .filter((m) => ids.includes(m.id))
                .map((m) => [m.id, m.folder])
        )
        update(ids, { folder })
        if (route.messageId && ids.includes(route.messageId))
            navigate(route.view)
        snackbar.show({
            message,
            action: {
                label: 'Undo',
                onClick: () =>
                    setMessages((all) =>
                        all.map((m) =>
                            before.has(m.id)
                                ? { ...m, folder: before.get(m.id)! }
                                : m
                        )
                    ),
            },
        })
    }

    const openMessage = (id: string) => navigate(route.view, id)

    // Opening a message marks it read, however it was opened: a click, a
    // link or back/forward
    useEffect(() => {
        if (route.messageId) update([route.messageId], { unread: false })
    }, [route.messageId])

    const startCompose = (draft: Omit<Draft, 'key'> = {}) =>
        setCompose((c) => ({
            open: true,
            draft: { ...draft, key: c.draft.key + 1 },
        }))

    const send = (message: Message) => {
        setMessages((all) => [message, ...all])
        snackbar.show({
            message: 'Message sent',
            // The Undo window, set in Settings
            timeout: settings.undoSeconds * 1000,
            action: {
                label: 'Undo',
                onClick: () => {
                    setMessages((all) => all.filter((m) => m.id !== message.id))
                    startCompose({
                        to: message.to,
                        subject: message.subject,
                        body: message.body.join('\n\n'),
                    })
                },
            },
        })
    }

    const navItems = folders.map((f) => ({
        view: f.id,
        label: f.label,
        icon: f.icon,
        count:
            f.id === 'inbox'
                ? unreadIn('inbox')
                : f.id === 'drafts'
                  ? messages.filter((m) => m.folder === 'drafts').length
                  : 0,
    }))

    return (
        <NavigationDrawer>
            <div
                className="am-app"
                data-density={settings.density}
                data-reading={open ? '' : undefined}
            >
                <AppBar
                    className="am-bar"
                    label={
                        <span className="am-logo">
                            <Icon name="mail" />
                            AMail
                        </span>
                    }
                    start={
                        <span className="am-narrow-only">
                            <NavigationDrawerTrigger
                                render={
                                    <IconButton
                                        icon="menu"
                                        fillType="text"
                                        color="container"
                                        aria-label="Open folders"
                                    />
                                }
                            />
                        </span>
                    }
                    end={
                        <>
                            <Input
                                size="small"
                                type="search"
                                label="Search mail"
                                className="am-search"
                                value={search}
                                onValueChange={(value) => {
                                    setSearch(value)
                                    if (route.messageId) navigate(route.view)
                                }}
                            />
                            <SettingsDialog
                                settings={settings}
                                onChange={setSettings}
                                onEmptyTrash={() => {
                                    setMessages((all) =>
                                        all.filter((m) => m.folder !== 'trash')
                                    )
                                    snackbar.show({ message: 'Trash emptied' })
                                }}
                            />
                            <AccountButton />
                        </>
                    }
                />

                <div className="am-body">
                    <NavigationRail
                        className="am-sidebar am-wide-only"
                        aria-label="Folders"
                    >
                        <NavigationRailToggle aria-label="Menu" />
                        {navItems.map((item) => (
                            <NavigationRailItem
                                key={item.view}
                                href={`#${item.view}`}
                                icon={item.icon}
                                label={item.label}
                                active={route.view === item.view && !search}
                                end={item.count > 0 ? item.count : undefined}
                            />
                        ))}
                        <div className="am-expanded-only">
                            <Divider />
                            <Typography
                                as="h2"
                                type="caption"
                                className="am-sidebar-heading"
                            >
                                Labels
                            </Typography>
                        </div>
                        {labels.map((l) => (
                            <NavigationRailItem
                                key={l.id}
                                href={`#label-${l.id}`}
                                icon="label"
                                label={l.label}
                                active={
                                    route.view === `label-${l.id}` && !search
                                }
                            />
                        ))}
                        <Progress
                            className="am-storage am-expanded-only"
                            label="4.2 GB of 15 GB used"
                            value={28}
                        />
                    </NavigationRail>

                    {/* Stays mounted while a message is open, so selection,
                        tab and scroll position are still there on the way back */}
                    <section
                        className="am-list-pane"
                        aria-label={
                            search ? 'Search results' : viewName(route.view)
                        }
                    >
                        <MessageList
                            key={route.view}
                            view={search ? 'search' : route.view}
                            title={
                                search
                                    ? `Results for “${search}”`
                                    : viewName(route.view)
                            }
                            messages={visible}
                            openId={route.messageId}
                            onOpen={openMessage}
                            onUpdate={update}
                            onMove={move}
                        />
                    </section>

                    {open && (
                        <section
                            className="am-reading-pane"
                            aria-label="Message"
                        >
                            <MessageView
                                key={open.id}
                                message={open}
                                signature={settings.signature}
                                defaultReply={settings.defaultReply}
                                onBack={() => navigate(route.view)}
                                onUpdate={(change) => update([open.id], change)}
                                onMove={(folder, text) =>
                                    move([open.id], folder, text)
                                }
                                onSend={send}
                                onCompose={startCompose}
                            />
                        </section>
                    )}
                </div>

                <ComposeSheet
                    open={compose.open}
                    onOpenChange={(o) =>
                        setCompose((c) => ({
                            open: o,
                            // Opened from the Compose button: a blank draft
                            draft:
                                o && !c.open
                                    ? { key: c.draft.key + 1 }
                                    : c.draft,
                        }))
                    }
                    draft={compose.draft}
                    signature={settings.signature}
                    onSend={send}
                    onSaveDraft={(draft) => {
                        setMessages((all) => [draft, ...all])
                        snackbar.show({ message: 'Saved to Drafts' })
                    }}
                />
            </div>

            <NavigationDrawerPopup>
                <NavigationDrawerTitle>AMail</NavigationDrawerTitle>
                {navItems.map((item) => (
                    <NavigationDrawerItem
                        key={item.view}
                        href={`#${item.view}`}
                        icon={item.icon}
                        label={item.label}
                        active={route.view === item.view}
                        end={item.count > 0 ? item.count : undefined}
                    />
                ))}
                <Divider className="am-drawer-divider" />
                {labels.map((l) => (
                    <NavigationDrawerItem
                        key={l.id}
                        href={`#label-${l.id}`}
                        icon="label"
                        label={l.label}
                        active={route.view === `label-${l.id}`}
                    />
                ))}
            </NavigationDrawerPopup>
        </NavigationDrawer>
    )
}

function AccountButton() {
    return (
        <Popover morph>
            <PopoverTrigger className="am-avatar-button" aria-label="Account">
                <Avatar size="small" name={me.name} />
            </PopoverTrigger>
            <PopoverPopup align="end" className="am-account-popup">
                <Avatar size="big" name={me.name} />
                <PopoverTitle>Hi, {me.name.split(' ')[0]}!</PopoverTitle>
                <Typography type="caption">{me.email}</Typography>
                <PopoverClose render={<Button fillType="outlined" />}>
                    Manage your account
                </PopoverClose>
            </PopoverPopup>
        </Popover>
    )
}
