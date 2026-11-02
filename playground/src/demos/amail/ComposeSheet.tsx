import { useEffect, useRef, useState } from 'react'
import {
    BottomSheet,
    BottomSheetPopup,
    BottomSheetTitle,
    BottomSheetTrigger,
    Button,
    Chip,
    FAB,
    Field,
    FieldError,
    IconButton,
    Input,
    InputChip,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    Select,
    SelectItem,
    SplitButton,
    Textarea,
    FloatingToolbar,
    FloatingToolbarButton,
    FloatingToolbarSeparator,
    Tooltip,
} from 'anvilui'
import type { BottomSheetProps } from 'anvilui'
import {
    contacts,
    me,
    newId,
    type Attachment,
    type Contact,
    type Message,
} from './data'

/** What a new compose window starts with. A new `key` starts a new draft. */
export type Draft = {
    key: number
    to?: Contact[]
    subject?: string
    body?: string
}

type SheetHandle = NonNullable<
    NonNullable<BottomSheetProps['actionsRef']>['current']
>

const fromAddresses = {
    [me.email]: `${me.name} <${me.email}>`,
    'sam.rivera@northwind.io': `${me.name} <sam.rivera@northwind.io>`,
}

const scheduleOptions = [
    'Tomorrow morning, 08:00',
    'Tomorrow afternoon, 13:00',
    'Monday morning, 08:00',
]

const fakeFiles: Attachment[] = [
    { name: 'notes.pdf', size: '320 KB', icon: 'picture_as_pdf' },
    { name: 'photo.jpg', size: '1.2 MB', icon: 'image' },
    { name: 'budget.xlsx', size: '48 KB', icon: 'table' },
]

type Content = { to: Contact[]; subject: string; body: string }

// The Compose button and the sheet it opens
export function ComposeSheet({
    open,
    onOpenChange,
    draft,
    signature,
    onSend,
    onSaveDraft,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    draft: Draft
    signature: string
    onSend: (message: Message) => void
    onSaveDraft: (message: Message) => void
}) {
    const sheet = useRef<SheetHandle>(null)
    // What's typed right now, so closing without sending can keep it as a draft
    const content = useRef<Content | null>(null)
    const sent = useRef(false)

    const toMessage = (
        c: Content,
        folder: Message['folder'],
        attachments: Attachment[] = []
    ): Message => ({
        id: newId(),
        folder,
        category: 'primary',
        from: me,
        to: c.to,
        subject: c.subject.trim() || '(no subject)',
        body: c.body.split(/\n{2,}/).filter((p) => p.trim()),
        time: 'Now',
        date: 'Today, just now',
        unread: false,
        starred: false,
        labels: [],
        attachments,
    })

    return (
        <BottomSheet
            actionsRef={sheet}
            open={open}
            onOpenChange={(next) => {
                if (next) sent.current = false
                const c = content.current
                const typed =
                    c &&
                    (c.to.length > 0 ||
                        c.subject.trim() ||
                        c.body.trim() !== signature.trim())
                if (!next && !sent.current && typed)
                    onSaveDraft(toMessage(c, 'drafts'))
                onOpenChange(next)
            }}
        >
            <BottomSheetTrigger
                render={<FAB className="am-fab" icon="edit" label="Compose" />}
            />
            <BottomSheetPopup>
                <ComposeForm
                    key={draft.key}
                    draft={draft}
                    signature={signature}
                    onContentChange={(c) => (content.current = c)}
                    onDiscard={() => {
                        content.current = null
                        sheet.current?.close()
                    }}
                    onSend={(c, attachments) => {
                        sent.current = true
                        onSend(toMessage(c, 'sent', attachments))
                        // Through Base UI, not `open`, so it goes through
                        // onOpenChange above like a swipe or Escape does
                        sheet.current?.close()
                    }}
                />
            </BottomSheetPopup>
        </BottomSheet>
    )
}

function ComposeForm({
    draft,
    signature,
    onContentChange,
    onDiscard,
    onSend,
}: {
    draft: Draft
    signature: string
    onContentChange: (content: Content) => void
    onDiscard: () => void
    onSend: (content: Content, attachments: Attachment[]) => void
}) {
    const [from, setFrom] = useState(me.email)
    const [to, setTo] = useState<Contact[]>(draft.to ?? [])
    const [toDraft, setToDraft] = useState('')
    const [subject, setSubject] = useState(draft.subject ?? '')
    const [body, setBody] = useState(
        draft.body ?? (signature ? `\n\n${signature}` : '')
    )
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [attachments, setAttachments] = useState<Attachment[]>([])
    const [triedToSend, setTriedToSend] = useState(false)
    const [sending, setSending] = useState(false)

    // Braces, so nothing is returned: React would call it as a cleanup
    useEffect(() => {
        onContentChange({ to, subject, body })
    }, [to, subject, body])

    const query = toDraft.trim().toLowerCase()
    const suggestions = query
        ? contacts.filter(
              (c) =>
                  !to.includes(c) &&
                  (c.name.toLowerCase().includes(query) ||
                      c.email.includes(query))
          )
        : []

    const addRecipient = (contact: Contact) => {
        setTo([...to, contact])
        setToDraft('')
    }

    const addTyped = () => {
        const text = toDraft.trim()
        if (!text) return
        addRecipient(suggestions[0] ?? { name: text, email: text })
    }

    const send = () => {
        setTriedToSend(true)
        if (to.length === 0) return
        setSending(true)
        // Pretend to talk to a server
        setTimeout(() => onSend({ to, subject, body }, attachments), 700)
    }

    return (
        <form
            className="am-compose-form"
            onSubmit={(event) => {
                event.preventDefault()
                send()
            }}
        >
            <div className="am-compose-header">
                <BottomSheetTitle>New message</BottomSheetTitle>
                <Tooltip label="Discard draft">
                    <IconButton
                        icon="delete"
                        fillType="text"
                        color="container"
                        aria-label="Discard draft"
                        onClick={onDiscard}
                    />
                </Tooltip>
            </div>

            <Select
                label="From"
                items={fromAddresses}
                value={from}
                onValueChange={(value) => value && setFrom(value)}
            >
                {Object.entries(fromAddresses).map(([email, label]) => (
                    <SelectItem key={email} value={email}>
                        {label}
                    </SelectItem>
                ))}
            </Select>

            <Field invalid={triedToSend && to.length === 0}>
                <div className="am-recipients">
                    {to.map((c) => (
                        <InputChip
                            key={c.email}
                            removeLabel={`Remove ${c.name}`}
                            onRemove={() => setTo(to.filter((x) => x !== c))}
                        >
                            {c.name}
                        </InputChip>
                    ))}
                    <Input
                        label="To"
                        className="am-recipient-input"
                        value={toDraft}
                        onValueChange={setToDraft}
                        autoFocus={to.length === 0}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ',') {
                                // Adds the recipient instead of sending
                                event.preventDefault()
                                addTyped()
                            } else if (
                                event.key === 'Backspace' &&
                                !toDraft &&
                                to.length
                            ) {
                                setTo(to.slice(0, -1))
                            }
                        }}
                    />
                </div>
                {/* `match` alone always shows it, so only render it once a
                    send was tried with nobody to send to */}
                {triedToSend && to.length === 0 && (
                    <FieldError match>Add at least one recipient</FieldError>
                )}
            </Field>

            {suggestions.length > 0 && (
                <div
                    className="am-chip-row"
                    aria-label="Suggested contacts"
                    role="group"
                >
                    {suggestions.map((c) => (
                        <Chip
                            key={c.email}
                            startIcon="person_add"
                            type="button"
                            onClick={() => addRecipient(c)}
                        >
                            {c.name}
                        </Chip>
                    ))}
                </div>
            )}

            <Input label="Subject" value={subject} onValueChange={setSubject} />

            <FloatingToolbar aria-label="Formatting" className="am-format-bar">
                <FloatingToolbarButton
                    icon="format_bold"
                    aria-label="Bold"
                    aria-pressed={bold}
                    color={bold ? 'primary' : 'container'}
                    onClick={() => setBold(!bold)}
                />
                <FloatingToolbarButton
                    icon="format_italic"
                    aria-label="Italic"
                    aria-pressed={italic}
                    color={italic ? 'primary' : 'container'}
                    onClick={() => setItalic(!italic)}
                />
                <FloatingToolbarSeparator />
                <FloatingToolbarButton
                    icon="attach_file"
                    aria-label="Attach a file"
                    onClick={() => {
                        const file = fakeFiles.find(
                            (f) => !attachments.includes(f)
                        )
                        if (file) setAttachments([...attachments, file])
                    }}
                />
                <FloatingToolbarButton
                    icon="mood"
                    aria-label="Insert emoji"
                    onClick={() => setBody((b) => b.replace(/^/, '🙂 '))}
                />
            </FloatingToolbar>

            <Textarea
                label="Message"
                rows={8}
                value={body}
                onValueChange={setBody}
                className="am-compose-body"
                style={{
                    fontWeight: bold ? 600 : undefined,
                    fontStyle: italic ? 'italic' : undefined,
                }}
            />

            {attachments.length > 0 && (
                <div className="am-chip-row">
                    {attachments.map((a) => (
                        <InputChip
                            key={a.name}
                            startIcon={a.icon}
                            removeLabel={`Remove ${a.name}`}
                            onRemove={() =>
                                setAttachments(
                                    attachments.filter((x) => x !== a)
                                )
                            }
                        >
                            {a.name} ({a.size})
                        </InputChip>
                    ))}
                </div>
            )}

            <div className="am-compose-actions">
                <SplitButton>
                    <Button type="submit" startIcon="send" loading={sending}>
                        {sending ? 'Sending' : 'Send'}
                    </Button>
                    <Menu>
                        <MenuTrigger
                            render={
                                <IconButton
                                    icon="keyboard_arrow_down"
                                    aria-label="Schedule send"
                                    disabled={sending}
                                />
                            }
                        />
                        <MenuPopup>
                            {scheduleOptions.map((when) => (
                                <MenuItem
                                    key={when}
                                    startIcon="schedule_send"
                                    onClick={send}
                                >
                                    {when}
                                </MenuItem>
                            ))}
                        </MenuPopup>
                    </Menu>
                </SplitButton>
            </div>
        </form>
    )
}
