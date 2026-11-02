import type { MaterialSymbol } from 'material-symbols'
import type { ComponentColor } from 'anvilui'

export type Priority = 'low' | 'medium' | 'high'
export type Due = 'overdue' | 'today' | 'week' | 'later'

export type Person = { id: string; name: string; email: string }

export type Project = {
    id: string
    name: string
    description: string
    icon: MaterialSymbol
    color: ComponentColor
    members: string[]
}

export type Task = {
    id: string
    title: string
    description: string
    project: string
    assignee: string
    due: Due
    priority: Priority
    done: boolean
    tags: string[]
}

export type Notification = {
    id: string
    from: string
    text: string
    time: string
    unread: boolean
}

export const me: Person = {
    id: 'maya',
    name: 'Maya Cohen',
    email: 'maya@taskflow.app',
}

export const people: Record<string, Person> = {
    maya: me,
    noah: { id: 'noah', name: 'Noah Levi', email: 'noah@taskflow.app' },
    lea: { id: 'lea', name: 'Lea Martin', email: 'lea@taskflow.app' },
    omar: { id: 'omar', name: 'Omar Haddad', email: 'omar@taskflow.app' },
    yuki: { id: 'yuki', name: 'Yuki Tanaka', email: 'yuki@taskflow.app' },
}

export const projects: Project[] = [
    {
        id: 'web',
        name: 'Website redesign',
        description: 'New marketing site, docs and pricing page.',
        icon: 'web',
        color: 'primary',
        members: ['maya', 'noah', 'lea'],
    },
    {
        id: 'mobile',
        name: 'Mobile app 2.0',
        description: 'Offline mode, widgets and a faster start-up.',
        icon: 'mobile',
        color: 'tonal',
        members: ['maya', 'omar', 'yuki', 'noah'],
    },
    {
        id: 'launch',
        name: 'Q4 launch',
        description: 'Press kit, launch email and the event on the 12th.',
        icon: 'rocket_launch',
        color: 'warning',
        members: ['lea', 'yuki'],
    },
    {
        id: 'infra',
        name: 'Infrastructure',
        description: 'Move the API to the new cluster before December.',
        icon: 'dns',
        color: 'success',
        members: ['omar', 'maya'],
    },
]

export const projectNames = Object.fromEntries(
    projects.map((p) => [p.id, p.name])
)

export const personNames = Object.fromEntries(
    Object.values(people).map((p) => [p.id, p.name])
)

export const dueLabels: Record<Due, string> = {
    overdue: 'Overdue',
    today: 'Today',
    week: 'This week',
    later: 'Later',
}

export const priorityLabels: Record<Priority, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
}

export const priorityColors: Record<Priority, ComponentColor> = {
    high: 'error',
    medium: 'warning',
    low: 'success',
}

let nextId = 100
export const newId = () => `t${nextId++}`

export const initialTasks: Task[] = [
    {
        id: 't1',
        title: 'Fix the checkout button on Safari',
        description:
            'The button does nothing on Safari 17 when the cart has a coupon applied.',
        project: 'web',
        assignee: 'maya',
        due: 'overdue',
        priority: 'high',
        done: false,
        tags: ['bug'],
    },
    {
        id: 't2',
        title: 'Review the pricing page copy',
        description: 'Lea shared a draft in the doc. Comments by end of day.',
        project: 'web',
        assignee: 'maya',
        due: 'today',
        priority: 'medium',
        done: false,
        tags: ['writing'],
    },
    {
        id: 't3',
        title: 'Offline sync: conflict resolution',
        description:
            'Decide what wins when the same task is edited on two devices offline.',
        project: 'mobile',
        assignee: 'omar',
        due: 'today',
        priority: 'high',
        done: false,
        tags: ['design', 'backend'],
    },
    {
        id: 't4',
        title: 'Book the venue for the launch event',
        description: 'Three options shortlisted. Need a deposit by Friday.',
        project: 'launch',
        assignee: 'yuki',
        due: 'week',
        priority: 'medium',
        done: false,
        tags: [],
    },
    {
        id: 't5',
        title: 'Home screen widget mockups',
        description: 'Small and medium sizes, light and dark.',
        project: 'mobile',
        assignee: 'maya',
        due: 'week',
        priority: 'low',
        done: false,
        tags: ['design'],
    },
    {
        id: 't6',
        title: 'Load test the new cluster',
        description: 'Replay last Black Friday traffic at 2x.',
        project: 'infra',
        assignee: 'omar',
        due: 'week',
        priority: 'high',
        done: false,
        tags: ['backend'],
    },
    {
        id: 't7',
        title: 'Write the launch email',
        description: 'Short, one screenshot, one link.',
        project: 'launch',
        assignee: 'lea',
        due: 'later',
        priority: 'medium',
        done: false,
        tags: ['writing'],
    },
    {
        id: 't8',
        title: 'Migrate docs to the new site',
        description: '',
        project: 'web',
        assignee: 'noah',
        due: 'later',
        priority: 'low',
        done: false,
        tags: [],
    },
    {
        id: 't9',
        title: 'Set up error tracking',
        description: 'Done, alerts go to #eng-alerts.',
        project: 'infra',
        assignee: 'maya',
        due: 'today',
        priority: 'medium',
        done: true,
        tags: ['backend'],
    },
    {
        id: 't10',
        title: 'New app icon',
        description: '',
        project: 'mobile',
        assignee: 'yuki',
        due: 'week',
        priority: 'low',
        done: true,
        tags: ['design'],
    },
    {
        id: 't11',
        title: 'Hero illustration',
        description: '',
        project: 'web',
        assignee: 'lea',
        due: 'week',
        priority: 'medium',
        done: true,
        tags: ['design'],
    },
]

export const initialNotifications: Notification[] = [
    {
        id: 'n1',
        from: 'noah',
        text: 'commented on "Fix the checkout button on Safari": I can reproduce it on iOS too.',
        time: '5 min ago',
        unread: true,
    },
    {
        id: 'n2',
        from: 'lea',
        text: 'assigned you "Review the pricing page copy".',
        time: '1 hour ago',
        unread: true,
    },
    {
        id: 'n3',
        from: 'omar',
        text: 'mentioned you in "Offline sync: conflict resolution".',
        time: '3 hours ago',
        unread: true,
    },
    {
        id: 'n4',
        from: 'yuki',
        text: 'completed "New app icon".',
        time: 'Yesterday',
        unread: false,
    },
    {
        id: 'n5',
        from: 'lea',
        text: 'added you to Q4 launch.',
        time: 'Monday',
        unread: false,
    },
]
