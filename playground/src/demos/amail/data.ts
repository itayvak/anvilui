import type { MaterialSymbol } from 'material-symbols'
import type { ComponentColor } from 'anvilui'

export type FolderId =
    'inbox' | 'snoozed' | 'sent' | 'drafts' | 'archive' | 'trash'
export type Category = 'primary' | 'updates' | 'promotions'
export type LabelId = 'work' | 'travel' | 'family' | 'receipts'

export type Contact = { name: string; email: string }

export type Attachment = { name: string; size: string; icon: MaterialSymbol }

export type Message = {
    id: string
    folder: FolderId
    category: Category
    from: Contact
    to: Contact[]
    subject: string
    body: string[]
    /** Shown in the list: a time today, or a short date */
    time: string
    /** Shown in the tooltip on the time */
    date: string
    unread: boolean
    starred: boolean
    labels: LabelId[]
    attachments: Attachment[]
}

export const me: Contact = { name: 'Sam Rivera', email: 'sam@amail.app' }

export const folders: {
    id: FolderId | 'starred'
    label: string
    icon: MaterialSymbol
}[] = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'starred', label: 'Starred', icon: 'star' },
    { id: 'snoozed', label: 'Snoozed', icon: 'schedule' },
    { id: 'sent', label: 'Sent', icon: 'send' },
    { id: 'drafts', label: 'Drafts', icon: 'draft' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
    { id: 'trash', label: 'Trash', icon: 'delete' },
]

// Each label is a dot in its color, so these are the strong roles: tonal is
// too pale to see as a dot on the page background
export const labels: { id: LabelId; label: string; color: ComponentColor }[] = [
    { id: 'work', label: 'Work', color: 'primary' },
    { id: 'travel', label: 'Travel', color: 'success' },
    { id: 'family', label: 'Family', color: 'error' },
    { id: 'receipts', label: 'Receipts', color: 'warning' },
]

export const contacts: Contact[] = [
    { name: 'Priya Natarajan', email: 'priya@northwind.io' },
    { name: 'Jonas Becker', email: 'jonas@northwind.io' },
    { name: 'Elena Rossi', email: 'elena.rossi@mailbox.org' },
    { name: 'Mom', email: 'carmen.rivera@mailbox.org' },
    { name: 'Daniel Kim', email: 'dkim@studio-kim.com' },
    { name: 'Aisha Bello', email: 'aisha@northwind.io' },
]

const [priya, jonas, elena, mom, daniel, aisha] = contacts

const service = (name: string, email: string): Contact => ({ name, email })

/** Shared by a message's row and its open view, so one morphs into the other */
export const mailMorphId = (id: string) => `am-mail-${id}`

let nextId = 100
export const newId = () => `m${nextId++}`

export const initialMessages: Message[] = [
    {
        id: 'm1',
        folder: 'inbox',
        category: 'primary',
        from: priya,
        to: [me, jonas],
        subject: 'Q3 roadmap review moved to Thursday',
        body: [
            'Hi Sam,',
            "Quick heads-up: we're moving the roadmap review to Thursday at 10:00, since half the team is out on Wednesday.",
            "I've attached the latest draft. Could you add your notes on the search project before then? Mostly the timeline and the open questions on ranking.",
            'Thanks!\nPriya',
        ],
        time: '10:42',
        date: 'Today, 10:42',
        unread: true,
        starred: true,
        labels: ['work'],
        attachments: [
            {
                name: 'Q3-roadmap-draft.pdf',
                size: '2.4 MB',
                icon: 'picture_as_pdf',
            },
        ],
    },
    {
        id: 'm2',
        folder: 'inbox',
        category: 'primary',
        from: elena,
        to: [me],
        subject: 'Lisbon in May?',
        body: [
            'Sam!',
            'We finally have dates: 14–19 May. Marco found a flat in Alfama with a terrace, and it sleeps six. Are you in?',
            "If yes, I'll book it this weekend. Flights from here are still cheap if we go soon.",
            'Elena',
        ],
        time: '09:15',
        date: 'Today, 09:15',
        unread: true,
        starred: false,
        labels: ['travel'],
        attachments: [
            { name: 'alfama-flat-1.jpg', size: '840 KB', icon: 'image' },
            { name: 'alfama-flat-2.jpg', size: '910 KB', icon: 'image' },
        ],
    },
    {
        id: 'm3',
        folder: 'inbox',
        category: 'primary',
        from: jonas,
        to: [me],
        subject: 'Re: Search ranking experiment',
        body: [
            'The results are in, and the new ranking wins on every metric except time-to-first-click, which is flat.',
            "I'd like to ship it to 50% next week. Any objections? If not, I'll write it up for Priya.",
            'Jonas',
        ],
        time: '08:03',
        date: 'Today, 08:03',
        unread: true,
        starred: false,
        labels: ['work'],
        attachments: [],
    },
    {
        id: 'm4',
        folder: 'inbox',
        category: 'primary',
        from: mom,
        to: [me],
        subject: 'Sunday lunch',
        body: [
            'Hi sweetie,',
            "Are you coming on Sunday? Your aunt is visiting and she'd love to see you. I'm making the lasagna.",
            'Call me when you can.\nLove, Mom',
        ],
        time: 'Yesterday',
        date: 'Yesterday, 19:20',
        unread: false,
        starred: true,
        labels: ['family'],
        attachments: [],
    },
    {
        id: 'm5',
        folder: 'inbox',
        category: 'primary',
        from: daniel,
        to: [me],
        subject: 'Logo concepts, round 2',
        body: [
            'Hi Sam,',
            'Here are three new directions based on your feedback. I pushed the second one further, since it got the strongest reaction last time.',
            'Happy to jump on a call this week to go through them.',
            'Best,\nDaniel',
        ],
        time: 'Yesterday',
        date: 'Yesterday, 15:48',
        unread: false,
        starred: false,
        labels: ['work'],
        attachments: [
            { name: 'concepts-round-2.fig', size: '12.1 MB', icon: 'draw' },
            { name: 'concepts-preview.png', size: '1.8 MB', icon: 'image' },
        ],
    },
    {
        id: 'm6',
        folder: 'inbox',
        category: 'primary',
        from: aisha,
        to: [me, priya, jonas],
        subject: 'Team offsite: vote for a date',
        body: [
            'Hi all,',
            'Please vote for the offsite date by Friday. The options are the 3rd, the 10th or the 17th.',
            'Aisha',
        ],
        time: 'Mon',
        date: 'Monday, 11:30',
        unread: false,
        starred: false,
        labels: ['work'],
        attachments: [],
    },
    {
        id: 'm7',
        folder: 'inbox',
        category: 'updates',
        from: service('SkyLine Airways', 'no-reply@skyline.example'),
        to: [me],
        subject: 'Your flight to Berlin: check-in is open',
        body: [
            'Check-in is now open for flight SL 482 to Berlin on Friday at 07:35.',
            'Seat 14A is reserved for you. Boarding closes 20 minutes before departure.',
        ],
        time: '07:00',
        date: 'Today, 07:00',
        unread: true,
        starred: false,
        labels: ['travel'],
        attachments: [
            {
                name: 'boarding-pass.pdf',
                size: '180 KB',
                icon: 'picture_as_pdf',
            },
        ],
    },
    {
        id: 'm8',
        folder: 'inbox',
        category: 'updates',
        from: service('Payly', 'receipts@payly.example'),
        to: [me],
        subject: 'Receipt for your payment to Corner Bakery',
        body: [
            'You paid €12.40 to Corner Bakery.',
            'Transaction ID: 8F2K-11QZ',
        ],
        time: 'Yesterday',
        date: 'Yesterday, 08:12',
        unread: false,
        starred: false,
        labels: ['receipts'],
        attachments: [],
    },
    {
        id: 'm9',
        folder: 'inbox',
        category: 'updates',
        from: service('CodeHost', 'notifications@codehost.example'),
        to: [me],
        subject: '[search-api] 3 pull requests need your review',
        body: [
            '#412 Cache ranking features per session',
            '#415 Bump index schema to v7',
            '#418 Fix pagination off-by-one',
        ],
        time: 'Mon',
        date: 'Monday, 09:02',
        unread: false,
        starred: false,
        labels: [],
        attachments: [],
    },
    {
        id: 'm10',
        folder: 'inbox',
        category: 'promotions',
        from: service('Trailhead Outfitters', 'hello@trailhead.example'),
        to: [me],
        subject: 'Autumn sale: 30% off rain jackets',
        body: [
            'The weather is turning. Our best-selling rain jackets are 30% off until Sunday.',
            'Free returns, as always.',
        ],
        time: 'Tue',
        date: 'Tuesday, 12:00',
        unread: true,
        starred: false,
        labels: [],
        attachments: [],
    },
    {
        id: 'm11',
        folder: 'inbox',
        category: 'promotions',
        from: service('Readwise Books', 'news@readwise-books.example'),
        to: [me],
        subject: 'New this week: 12 books we loved',
        body: [
            'Our editors picked twelve new releases for the long evenings ahead.',
        ],
        time: 'Sun',
        date: 'Sunday, 10:00',
        unread: false,
        starred: false,
        labels: [],
        attachments: [],
    },
    {
        id: 'm12',
        folder: 'sent',
        category: 'primary',
        from: me,
        to: [daniel],
        subject: 'Re: Logo concepts',
        body: [
            'Thanks Daniel, these are great. The second direction is the strongest. Could you try it with a heavier weight and fewer details?',
            'Sam',
        ],
        time: 'Fri',
        date: 'Friday, 16:20',
        unread: false,
        starred: false,
        labels: ['work'],
        attachments: [],
    },
    {
        id: 'm13',
        folder: 'drafts',
        category: 'primary',
        from: me,
        to: [priya],
        subject: 'Search project notes',
        body: ['Hi Priya,', 'Notes on the timeline below. The main risk is'],
        time: 'Mon',
        date: 'Monday, 18:05',
        unread: false,
        starred: false,
        labels: ['work'],
        attachments: [],
    },
    {
        id: 'm14',
        folder: 'snoozed',
        category: 'primary',
        from: service('City Library', 'loans@citylibrary.example'),
        to: [me],
        subject: '2 books are due next week',
        body: [
            '"The Overstory" and "Piranesi" are due on the 14th. Renew online.',
        ],
        time: 'Sat',
        date: 'Saturday, 09:00',
        unread: false,
        starred: false,
        labels: [],
        attachments: [],
    },
]
