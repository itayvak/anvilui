import { useEffect, useRef, useState } from 'react'
import {
    Avatar,
    Badge,
    Checkbox,
    FilterChip,
    Icon,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    Progress,
    Tabs,
    TabsList,
    TabsTab,
    Tooltip,
    Typography,
} from 'anvilui'
import { labels, mailMorphId, type Category, type Message } from './data'

const categories: {
    id: Category
    label: string
    icon: 'inbox' | 'info' | 'sell'
}[] = [
    { id: 'primary', label: 'Primary', icon: 'inbox' },
    { id: 'updates', label: 'Updates', icon: 'info' },
    { id: 'promotions', label: 'Promotions', icon: 'sell' },
]

export function MessageList({
    view,
    title,
    messages,
    openId,
    onOpen,
    onUpdate,
    onMove,
}: {
    /** The folder or label shown, or `search` */
    view: string
    title: string
    messages: Message[]
    openId: string | null
    onOpen: (id: string) => void
    onUpdate: (ids: Iterable<string>, change: Partial<Message>) => void
    onMove: (ids: string[], folder: Message['folder'], text: string) => void
}) {
    const [category, setCategory] = useState<Category>('primary')
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [unreadOnly, setUnreadOnly] = useState(false)
    const [withFiles, setWithFiles] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    // Back from a message: put focus on its row again
    const lastOpen = useRef(openId)
    useEffect(() => {
        const closed = lastOpen.current
        lastOpen.current = openId
        if (!closed || openId) return
        document
            .querySelector<HTMLElement>(
                `[data-morph-id="${mailMorphId(closed)}"] .am-row-open`
            )
            ?.focus({ preventScroll: true })
    }, [openId])

    const inbox = view === 'inbox'
    const shown = messages
        .filter((m) => !inbox || m.category === category)
        .filter((m) => !unreadOnly || m.unread)
        .filter((m) => !withFiles || m.attachments.length > 0)
    const picked = shown.filter((m) => selected.has(m.id))
    const ids = picked.map((m) => m.id)
    const anyUnread = picked.some((m) => m.unread)

    const plural = (n: number, word: string) =>
        `${n} ${word}${n === 1 ? '' : 's'}`

    const act = (folder: Message['folder'], verb: string) => {
        onMove(ids, folder, `${plural(ids.length, 'conversation')} ${verb}`)
        setSelected(new Set())
    }

    const refresh = () => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1200)
    }

    return (
        <div className="am-list">
            <div className="am-list-header">
                <Typography type="h6" as="h2">
                    {title}
                </Typography>
                <Typography type="caption">
                    {shown.length === 0
                        ? 'Empty'
                        : `1–${shown.length} of ${shown.length}`}
                </Typography>
            </div>

            {inbox && (
                <Tabs
                    value={category}
                    onValueChange={(value) => {
                        setCategory(value)
                        setSelected(new Set())
                    }}
                >
                    <TabsList>
                        {categories.map((c) => {
                            const unread = messages.filter(
                                (m) => m.category === c.id && m.unread
                            ).length
                            return (
                                <TabsTab key={c.id} value={c.id} icon={c.icon}>
                                    {c.label}
                                    {unread > 0 && c.id !== category && (
                                        <Badge
                                            count={unread}
                                            color="primary"
                                            className="am-tab-badge"
                                        />
                                    )}
                                </TabsTab>
                            )
                        })}
                    </TabsList>
                </Tabs>
            )}

            <div className="am-list-actions">
                <Checkbox
                    aria-label="Select all"
                    checked={shown.length > 0 && picked.length === shown.length}
                    indeterminate={
                        picked.length > 0 && picked.length < shown.length
                    }
                    disabled={shown.length === 0}
                    onCheckedChange={(on) =>
                        setSelected(new Set(on ? shown.map((m) => m.id) : []))
                    }
                />
                {picked.length > 0 ? (
                    <>
                        <Typography type="caption" className="am-picked">
                            {picked.length} selected
                        </Typography>
                        {view !== 'archive' && view !== 'trash' && (
                            <Tooltip label="Archive">
                                <IconButton
                                    icon="archive"
                                    fillType="text"
                                    color="container"
                                    aria-label="Archive"
                                    onClick={() => act('archive', 'archived')}
                                />
                            </Tooltip>
                        )}
                        {view === 'trash' ? (
                            <Tooltip label="Move to inbox">
                                <IconButton
                                    icon="restore_from_trash"
                                    fillType="text"
                                    color="container"
                                    aria-label="Move to inbox"
                                    onClick={() => act('inbox', 'restored')}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip label="Delete">
                                <IconButton
                                    icon="delete"
                                    fillType="text"
                                    color="container"
                                    aria-label="Delete"
                                    onClick={() =>
                                        act('trash', 'moved to Trash')
                                    }
                                />
                            </Tooltip>
                        )}
                        <Tooltip
                            label={
                                anyUnread ? 'Mark as read' : 'Mark as unread'
                            }
                        >
                            <IconButton
                                icon={
                                    anyUnread ? 'drafts' : 'mark_email_unread'
                                }
                                fillType="text"
                                color="container"
                                aria-label={
                                    anyUnread
                                        ? 'Mark as read'
                                        : 'Mark as unread'
                                }
                                onClick={() =>
                                    onUpdate(ids, { unread: !anyUnread })
                                }
                            />
                        </Tooltip>
                        <Menu>
                            <Tooltip label="Label as">
                                <MenuTrigger
                                    render={
                                        <IconButton
                                            icon="label"
                                            fillType="text"
                                            color="container"
                                            aria-label="Label as"
                                        />
                                    }
                                />
                            </Tooltip>
                            <MenuPopup>
                                {labels.map((l) => {
                                    const all = picked.every((m) =>
                                        m.labels.includes(l.id)
                                    )
                                    return (
                                        <MenuItem
                                            key={l.id}
                                            startIcon="label"
                                            endIcon={all ? 'check' : undefined}
                                            onClick={() => {
                                                for (const m of picked) {
                                                    onUpdate([m.id], {
                                                        labels: all
                                                            ? m.labels.filter(
                                                                  (x) =>
                                                                      x !== l.id
                                                              )
                                                            : [
                                                                  ...new Set([
                                                                      ...m.labels,
                                                                      l.id,
                                                                  ]),
                                                              ],
                                                    })
                                                }
                                            }}
                                        >
                                            {l.label}
                                        </MenuItem>
                                    )
                                })}
                            </MenuPopup>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Tooltip label="Refresh">
                            <IconButton
                                icon="refresh"
                                fillType="text"
                                color="container"
                                aria-label="Refresh"
                                disabled={refreshing}
                                onClick={refresh}
                            />
                        </Tooltip>
                        <FilterChip
                            pressed={unreadOnly}
                            onPressedChange={setUnreadOnly}
                        >
                            Unread
                        </FilterChip>
                        <FilterChip
                            pressed={withFiles}
                            onPressedChange={setWithFiles}
                        >
                            Has attachment
                        </FilterChip>
                    </>
                )}
            </div>

            {refreshing && (
                <Progress
                    value={null}
                    squiggly
                    aria-label="Checking for new mail"
                    className="am-refresh"
                />
            )}

            {shown.length === 0 ? (
                <div className="am-empty">
                    <Icon name={view === 'search' ? 'search_off' : 'inbox'} />
                    <Typography type="h6" as="p">
                        {view === 'search' ? 'No results' : 'Nothing here'}
                    </Typography>
                    <Typography type="caption">
                        {view === 'search'
                            ? 'Try different words.'
                            : 'Messages you move here will show up in this list.'}
                    </Typography>
                </div>
            ) : (
                <List className="am-rows">
                    {shown.map((m) => (
                        <MessageRow
                            key={m.id}
                            message={m}
                            active={m.id === openId}
                            selected={selected.has(m.id)}
                            onSelectedChange={(on) =>
                                setSelected((prev) => {
                                    const next = new Set(prev)
                                    if (on) next.add(m.id)
                                    else next.delete(m.id)
                                    return next
                                })
                            }
                            onOpen={() => onOpen(m.id)}
                            onStar={() =>
                                onUpdate([m.id], { starred: !m.starred })
                            }
                        />
                    ))}
                </List>
            )}
        </div>
    )
}

function MessageRow({
    message: m,
    active,
    selected,
    onSelectedChange,
    onOpen,
    onStar,
}: {
    message: Message
    active: boolean
    selected: boolean
    onSelectedChange: (on: boolean) => void
    onOpen: () => void
    onStar: () => void
}) {
    const sender =
        m.folder === 'sent' || m.folder === 'drafts'
            ? `To: ${m.to.map((c) => c.name).join(', ')}`
            : m.from.name

    return (
        <ListItem
            className="am-row"
            data-morph-id={mailMorphId(m.id)}
            data-unread={m.unread || undefined}
            data-active={active || undefined}
            data-selected={selected || undefined}
            start={
                <>
                    <Checkbox
                        aria-label={`Select “${m.subject}”`}
                        checked={selected}
                        onCheckedChange={onSelectedChange}
                    />
                    <Avatar
                        size="small"
                        name={m.from.name}
                        className="am-row-avatar"
                    />
                </>
            }
            label={
                // Covers the whole row (see .am-row-open::after), so the
                // row opens the message, but the checkbox and star stay
                // their own buttons
                <button
                    type="button"
                    className="am-row-open"
                    onClick={onOpen}
                    aria-current={active || undefined}
                >
                    {m.unread && <span className="am-sr-only">Unread, </span>}
                    {sender}
                    {m.folder === 'drafts' && (
                        <span className="am-draft"> Draft</span>
                    )}
                </button>
            }
            description={
                <>
                    <span className="am-subject">{m.subject}</span>
                    <span className="am-snippet"> — {m.body.join(' ')}</span>
                </>
            }
            end={
                <span className="am-row-end">
                    <span className="am-row-meta">
                        {m.attachments.length > 0 && (
                            <Icon
                                name="attach_file"
                                aria-label="Has attachment"
                            />
                        )}
                        <Typography type="caption" className="am-time">
                            {m.time}
                        </Typography>
                    </span>
                    <IconButton
                        icon="star"
                        fillType="text"
                        color={m.starred ? 'warning' : 'container'}
                        className="am-star"
                        data-starred={m.starred || undefined}
                        aria-label="Starred"
                        aria-pressed={m.starred}
                        onClick={onStar}
                    />
                </span>
            }
        />
    )
}
