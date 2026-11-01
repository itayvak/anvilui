import type { ComponentType } from 'react'
import { TaskflowDemo } from './taskflow/TaskflowDemo'
import { AMailDemo } from './amail/AMailDemo'

export type Demo = {
    title: string
    description: string
    component: ComponentType
}

// One entry per demo page. The key is its URL: /demos/<key>.
export const demos: Record<string, Demo> = {
    taskflow: {
        title: 'Taskflow',
        description:
            'A task manager app: navigation, lists, forms, dialogs, sheets and snackbars working together',
        component: TaskflowDemo,
    },
    amail: {
        title: 'AMail',
        description:
            'An email client: folders, a message list with bulk actions, a reading pane, compose and settings',
        component: AMailDemo,
    },
}
