import { useEffect, useRef, useState } from 'react'
import {
    Avatar,
    BottomSheet,
    BottomSheetClose,
    BottomSheetPopup,
    BottomSheetTitle,
    Button,
    Card,
    Chip,
    Icon,
    IconButton,
    InputChip,
    List,
    ListItem,
    Menu,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuTrigger,
    Popover,
    PopoverClose,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
    SplitButton,
    Textarea,
    Tooltip,
    Typography,
    useSnackbar,
} from 'anvilui'
import { labels, mailMorphId, me, newId, type Message } from './data'
import type { Draft } from './ComposeSheet'

const snoozeOptions = [
    { label: 'Later today', when: '18:00' },
    { label: 'Tomorrow', when: 'Fri, 08:00' },
    { label: 'This weekend', when: 'Sat, 08:00' },
    { label: 'Next week', when: 'Mon, 08:00' },
]

const smartReplies = [
    'Sounds good!',
    'Thanks, will do.',
    "Let's talk tomorrow.",
]

export function MessageView({
    message: m,
    signature,
    defaultReply,
    onBack,
    onUpdate,
    onMove,
    onSend,
    onCompose,
}: {
    message: Message
    signature: string
    defaultReply: 'reply' | 'replyAll'
    onBack: () => void
    onUpdate: (change: Partial<Message>) => void
    onMove: (folder: Message['folder'], text: string) => void
    onSend: (message: Message) => void
    onCompose: (draft: Omit<Draft, 'key'>) => void
}) {
    const snackbar = useSnackbar()
    const [reply, setReply] = useState<'reply' | 'replyAll' | null>(null)
    const [replyText, setReplyText] = useState('')
    const [sending, setSending] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const heading = useRef<HTMLHeadingElement>(null)

    // The row that was clicked is hidden now, so bring focus here
    useEffect(() => heading.current?.focus({ preventScroll: true }), [])

    const others = m.to.filter((c) => c.email !== me.email)
    const replyTo =
        reply === 'replyAll'
            ? [m.from, ...others].filter((c) => c.email !== me.email)
            : [m.from]

    const startReply = (kind: 'reply' | 'replyAll', text = '') => {
        setReply(kind)
        setReplyText(text)
    }

    const forward = () =>
        onCompose({
            subject: `Fwd: ${m.subject}`,
            body: `\n\n---------- Forwarded message ----------\nFrom: ${m.from.name} <${m.from.email}>\nDate: ${m.date}\nSubject: ${m.subject}\n\n${m.body.join('\n\n')}`,
        })

    const sendReply = () => {
        setSending(true)
        // Pretend to talk to a server
        setTimeout(() => {
            onSend({
                id: newId(),
                folder: 'sent',
                category: 'primary',
                from: me,
                to: replyTo,
                subject: m.subject.startsWith('Re:')
                    ? m.subject
                    : `Re: ${m.subject}`,
                body: [replyText, signature].filter(Boolean),
                time: 'Now',
                date: 'Today, just now',
                unread: false,
                starred: false,
                labels: [],
                attachments: [],
            })
            setSending(false)
            setReply(null)
            setReplyText('')
        }, 600)
    }

    return (
        <article className="am-message" data-morph-id={mailMorphId(m.id)}>
            <div className="am-message-actions">
                <IconButton
                    icon="arrow_back"
                    fillType="text"
                    color="container"
                    aria-label="Back to list"
                    onClick={onBack}
                />
                {m.folder !== 'archive' && m.folder !== 'trash' && (
                    <Tooltip label="Archive">
                        <IconButton
                            icon="archive"
                            fillType="text"
                            color="container"
                            aria-label="Archive"
                            onClick={() =>
                                onMove('archive', 'Conversation archived')
                            }
                        />
                    </Tooltip>
                )}
                {m.folder === 'trash' ? (
                    <Tooltip label="Move to inbox">
                        <IconButton
                            icon="restore_from_trash"
                            fillType="text"
                            color="container"
                            aria-label="Move to inbox"
                            onClick={() => onMove('inbox', 'Moved to Inbox')}
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
                                onMove('trash', 'Conversation moved to Trash')
                            }
                        />
                    </Tooltip>
                )}
                <Tooltip label="Mark as unread">
                    <IconButton
                        icon="mark_email_unread"
                        fillType="text"
                        color="container"
                        aria-label="Mark as unread"
                        onClick={() => {
                            onUpdate({ unread: true })
                            onBack()
                        }}
                    />
                </Tooltip>
                <Popover>
                    <Tooltip label="Snooze">
                        <PopoverTrigger
                            render={
                                <IconButton
                                    icon="schedule"
                                    fillType="text"
                                    color="container"
                                    aria-label="Snooze"
                                />
                            }
                        />
                    </Tooltip>
                    <PopoverPopup className="am-snooze">
                        <PopoverTitle>Snooze until…</PopoverTitle>
                        <List>
                            {snoozeOptions.map((o) => (
                                <ListItem
                                    key={o.label}
                                    render={<PopoverClose />}
                                    className="am-menu-row"
                                    label={o.label}
                                    end={
                                        <Typography type="caption">
                                            {o.when}
                                        </Typography>
                                    }
                                    onClick={() =>
                                        onMove(
                                            'snoozed',
                                            `Snoozed until ${o.label.toLowerCase()}`
                                        )
                                    }
                                />
                            ))}
                        </List>
                    </PopoverPopup>
                </Popover>

                <span className="am-spacer" />

                <IconButton
                    icon="star"
                    fillType="text"
                    color={m.starred ? 'warning' : 'container'}
                    className="am-star"
                    data-starred={m.starred || undefined}
                    aria-label="Starred"
                    aria-pressed={m.starred}
                    onClick={() => onUpdate({ starred: !m.starred })}
                />
                <Menu>
                    <Tooltip label="More">
                        <MenuTrigger
                            render={
                                <IconButton
                                    icon="more_vert"
                                    fillType="text"
                                    color="container"
                                    aria-label="More"
                                />
                            }
                        />
                    </Tooltip>
                    <MenuPopup align="end">
                        <MenuItem startIcon="forward" onClick={forward}>
                            Forward
                        </MenuItem>
                        <MenuSubmenu>
                            <MenuSubmenuTrigger startIcon="label">
                                Label as
                            </MenuSubmenuTrigger>
                            <MenuPopup>
                                {labels.map((l) => {
                                    const has = m.labels.includes(l.id)
                                    return (
                                        <MenuItem
                                            key={l.id}
                                            endIcon={has ? 'check' : undefined}
                                            onClick={() =>
                                                onUpdate({
                                                    labels: has
                                                        ? m.labels.filter(
                                                              (x) => x !== l.id
                                                          )
                                                        : [...m.labels, l.id],
                                                })
                                            }
                                        >
                                            {l.label}
                                        </MenuItem>
                                    )
                                })}
                            </MenuPopup>
                        </MenuSubmenu>
                        <MenuItem
                            startIcon="info"
                            onClick={() => setDetailsOpen(true)}
                        >
                            Message details
                        </MenuItem>
                        <MenuItem
                            startIcon="print"
                            onClick={() =>
                                snackbar.show({
                                    message: 'Preparing to print…',
                                })
                            }
                        >
                            Print
                        </MenuItem>
                        <MenuItem
                            startIcon="report"
                            onClick={() => onMove('trash', 'Reported as spam')}
                        >
                            Report spam
                        </MenuItem>
                    </MenuPopup>
                </Menu>
            </div>

            <div className="am-message-scroll">
                <Typography
                    ref={heading}
                    tabIndex={-1}
                    type="h5"
                    as="h1"
                    className="am-message-subject"
                >
                    {m.subject}
                </Typography>

                {m.labels.length > 0 && (
                    <div className="am-chip-row">
                        {m.labels.map((id) => {
                            const label = labels.find((l) => l.id === id)!
                            return (
                                <InputChip
                                    key={id}
                                    startIcon="label"
                                    removeLabel={`Remove label ${label.label}`}
                                    onRemove={() =>
                                        onUpdate({
                                            labels: m.labels.filter(
                                                (x) => x !== id
                                            ),
                                        })
                                    }
                                >
                                    {label.label}
                                </InputChip>
                            )
                        })}
                    </div>
                )}

                <div className="am-sender">
                    <Avatar name={m.from.name} />
                    <div className="am-sender-text">
                        <Typography>
                            <strong>{m.from.name}</strong>{' '}
                            <span className="am-muted">
                                &lt;{m.from.email}&gt;
                            </span>
                        </Typography>
                        <Typography type="caption">
                            to{' '}
                            {m.to
                                .map((c) =>
                                    c.email === me.email ? 'me' : c.name
                                )
                                .join(', ')}
                        </Typography>
                    </div>
                    <Tooltip label={m.date}>
                        <Typography
                            type="caption"
                            tabIndex={0}
                            className="am-time"
                        >
                            {m.time}
                        </Typography>
                    </Tooltip>
                </div>

                <div className="am-message-body">
                    {m.body.map((p, i) => (
                        <Typography key={i}>{p}</Typography>
                    ))}
                </div>

                {m.attachments.length > 0 && (
                    <section
                        aria-label="Attachments"
                        className="am-attachments"
                    >
                        <Typography type="caption" as="h2">
                            {m.attachments.length}{' '}
                            {m.attachments.length === 1
                                ? 'attachment'
                                : 'attachments'}
                        </Typography>
                        <div className="am-attachment-grid">
                            {m.attachments.map((a) => (
                                <Card
                                    key={a.name}
                                    fillType="outlined"
                                    className="am-attachment"
                                >
                                    <Icon name={a.icon} />
                                    <div className="am-attachment-text">
                                        <Typography className="am-ellipsis">
                                            {a.name}
                                        </Typography>
                                        <Typography type="caption">
                                            {a.size}
                                        </Typography>
                                    </div>
                                    <IconButton
                                        icon="download"
                                        fillType="text"
                                        color="container"
                                        aria-label={`Download ${a.name}`}
                                        onClick={() =>
                                            snackbar.show({
                                                message: `Downloading ${a.name}`,
                                            })
                                        }
                                    />
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {m.folder !== 'sent' && m.folder !== 'drafts' && (
                    <div className="am-reply">
                        {reply === null ? (
                            <>
                                <div className="am-chip-row">
                                    {smartReplies.map((text) => (
                                        <Chip
                                            key={text}
                                            startIcon="bolt"
                                            onClick={() =>
                                                startReply('reply', text)
                                            }
                                        >
                                            {text}
                                        </Chip>
                                    ))}
                                </div>
                                <div className="am-chip-row">
                                    <SplitButton>
                                        <Button
                                            fillType="outlined"
                                            startIcon={
                                                defaultReply === 'replyAll'
                                                    ? 'reply_all'
                                                    : 'reply'
                                            }
                                            onClick={() =>
                                                startReply(defaultReply)
                                            }
                                        >
                                            {defaultReply === 'replyAll'
                                                ? 'Reply all'
                                                : 'Reply'}
                                        </Button>
                                        <Menu>
                                            <MenuTrigger
                                                render={
                                                    <IconButton
                                                        icon="keyboard_arrow_down"
                                                        fillType="outlined"
                                                        aria-label="More reply options"
                                                    />
                                                }
                                            />
                                            <MenuPopup>
                                                <MenuItem
                                                    startIcon="reply"
                                                    onClick={() =>
                                                        startReply('reply')
                                                    }
                                                >
                                                    Reply
                                                </MenuItem>
                                                <MenuItem
                                                    startIcon="reply_all"
                                                    disabled={
                                                        others.length === 0
                                                    }
                                                    onClick={() =>
                                                        startReply('replyAll')
                                                    }
                                                >
                                                    Reply all
                                                </MenuItem>
                                                <MenuItem
                                                    startIcon="forward"
                                                    onClick={forward}
                                                >
                                                    Forward
                                                </MenuItem>
                                            </MenuPopup>
                                        </Menu>
                                    </SplitButton>
                                </div>
                            </>
                        ) : (
                            <Card fillType="outlined" className="am-reply-box">
                                <Typography type="caption">
                                    {reply === 'replyAll'
                                        ? 'Reply all'
                                        : 'Reply'}{' '}
                                    to {replyTo.map((c) => c.name).join(', ')}
                                </Typography>
                                <Textarea
                                    label="Your reply"
                                    rows={4}
                                    autoFocus
                                    value={replyText}
                                    onValueChange={setReplyText}
                                />
                                <div className="am-chip-row">
                                    <Button
                                        startIcon="send"
                                        loading={sending}
                                        disabled={!replyText.trim()}
                                        onClick={sendReply}
                                    >
                                        {sending ? 'Sending' : 'Send'}
                                    </Button>
                                    <span className="am-spacer" />
                                    <Tooltip label="Discard">
                                        <IconButton
                                            icon="delete"
                                            fillType="text"
                                            color="container"
                                            aria-label="Discard reply"
                                            onClick={() => setReply(null)}
                                        />
                                    </Tooltip>
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>

            <BottomSheet open={detailsOpen} onOpenChange={setDetailsOpen}>
                <BottomSheetPopup>
                    <BottomSheetTitle>Message details</BottomSheetTitle>
                    <List>
                        <ListItem
                            label="From"
                            description={`${m.from.name} <${m.from.email}>`}
                        />
                        <ListItem
                            label="To"
                            description={m.to
                                .map((c) => `${c.name} <${c.email}>`)
                                .join(', ')}
                        />
                        <ListItem label="Date" description={m.date} />
                        <ListItem label="Subject" description={m.subject} />
                        <ListItem
                            label="Security"
                            description="Standard encryption (TLS)"
                            end={<Icon name="lock" />}
                        />
                    </List>
                    <BottomSheetClose render={<Button fillType="text" />}>
                        Close
                    </BottomSheetClose>
                </BottomSheetPopup>
            </BottomSheet>
        </article>
    )
}
