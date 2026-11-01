import { useState, type Dispatch, type SetStateAction } from 'react'
import {
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    Divider,
    FilterChip,
    Icon,
    IconButton,
    Input,
    List,
    ListItem,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    Progress,
    Select,
    SelectItem,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    FloatingToolbar,
    FloatingToolbarButton,
    FloatingToolbarSeparator,
    Typography,
    useSnackbar,
} from 'anvilui'
import {
    dueLabels,
    me,
    people,
    priorityColors,
    priorityLabels,
    projectNames,
    type Due,
    type Task,
} from './data'
import { NewTaskDialog } from './NewTaskDialog'
import { TaskSheet } from './TaskSheet'

type Sort = 'due' | 'priority'

const dueOrder: Due[] = ['overdue', 'today', 'week', 'later']
const priorityRank = { high: 0, medium: 1, low: 2 }
const projectFilter = { all: 'All projects', ...projectNames }

export function TasksPage({
    tasks,
    setTasks,
}: {
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
}) {
    const snackbar = useSnackbar()
    const [tab, setTab] = useState<'open' | 'done'>('open')
    const [search, setSearch] = useState('')
    const [project, setProject] = useState('all')
    const [highOnly, setHighOnly] = useState(false)
    const [mineOnly, setMineOnly] = useState(false)
    const [sort, setSort] = useState<Sort>('due')
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [sheetTaskId, setSheetTaskId] = useState<string | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)

    const done = tasks.filter((t) => t.done).length
    const dueToday = tasks.filter(
        (t) => !t.done && t.assignee === me.id && t.due === 'today'
    ).length

    const visible = tasks
        .filter((t) => t.done === (tab === 'done'))
        .filter((t) => project === 'all' || t.project === project)
        .filter((t) => !highOnly || t.priority === 'high')
        .filter((t) => !mineOnly || t.assignee === me.id)
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))

    const update = (ids: Iterable<string>, change: Partial<Task>) => {
        const set = new Set(ids)
        setTasks((all) =>
            all.map((t) => (set.has(t.id) ? { ...t, ...change } : t))
        )
    }

    const remove = (ids: Iterable<string>) => {
        const set = new Set(ids)
        const before = tasks
        setTasks((all) => all.filter((t) => !set.has(t.id)))
        setSelected(new Set())
        snackbar.show({
            message:
                set.size === 1 ? 'Task deleted' : `${set.size} tasks deleted`,
            action: { label: 'Undo', onClick: () => setTasks(before) },
        })
    }

    const toggleDone = (ids: string[]) => {
        const markDone = tab === 'open'
        update(ids, { done: markDone })
        setSelected(new Set())
        snackbar.show({
            message: `${ids.length} ${ids.length === 1 ? 'task' : 'tasks'} ${markDone ? 'completed' : 'reopened'}`,
            action: {
                label: 'Undo',
                onClick: () => update(ids, { done: !markDone }),
            },
        })
    }

    const toggleSelected = (id: string, on: boolean) => {
        setSelected((prev) => {
            const next = new Set(prev)
            if (on) next.add(id)
            else next.delete(id)
            return next
        })
    }

    const openTask = (id: string) => {
        setSheetTaskId(id)
        setSheetOpen(true)
    }

    const row = (task: Task) => (
        <TaskRow
            key={task.id}
            task={task}
            selected={selected.has(task.id)}
            onSelectedChange={(on) => toggleSelected(task.id, on)}
            onOpen={() => openTask(task.id)}
        />
    )

    const list = (items: Task[]) => {
        if (items.length === 0) return <EmptyState tab={tab} />
        if (sort === 'priority') {
            return (
                <List>
                    {[...items]
                        .sort(
                            (a, b) =>
                                priorityRank[a.priority] -
                                priorityRank[b.priority]
                        )
                        .map(row)}
                </List>
            )
        }
        return dueOrder.map((due) => {
            const group = items.filter((t) => t.due === due)
            if (group.length === 0) return null
            return (
                <section key={due} className="tf-task-group">
                    <Divider label={dueLabels[due]} />
                    <List>{group.map(row)}</List>
                </section>
            )
        })
    }

    return (
        <div className="tf-page">
            <Card className="tf-summary" color="container">
                <div className="tf-summary-text">
                    <Typography type="h5" as="h2">
                        Good morning, {me.name.split(' ')[0]}
                    </Typography>
                    <Typography>
                        {dueToday === 0
                            ? 'Nothing due today. Nice.'
                            : `You have ${dueToday} ${dueToday === 1 ? 'task' : 'tasks'} due today.`}
                    </Typography>
                </div>
                <Progress
                    className="tf-summary-progress"
                    label={`${done} of ${tasks.length} done this week`}
                    value={tasks.length ? (done / tasks.length) * 100 : 0}
                    squiggly
                />
            </Card>

            <Tabs
                value={tab}
                onValueChange={(value) => {
                    setTab(value)
                    setSelected(new Set())
                }}
            >
                <TabsList>
                    <TabsTab value="open" icon="radio_button_unchecked">
                        Open
                    </TabsTab>
                    <TabsTab value="done" icon="task_alt">
                        Done
                    </TabsTab>
                </TabsList>

                <div className="tf-filters">
                    <Input
                        size="small"
                        label="Search tasks"
                        type="search"
                        value={search}
                        onValueChange={setSearch}
                        className="tf-search"
                    />
                    <Select
                        size="small"
                        items={projectFilter}
                        value={project}
                        onValueChange={(value) => setProject(value ?? 'all')}
                        aria-label="Project"
                    >
                        {Object.entries(projectFilter).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                                {name}
                            </SelectItem>
                        ))}
                    </Select>
                    <FilterChip
                        pressed={mineOnly}
                        onPressedChange={setMineOnly}
                    >
                        Assigned to me
                    </FilterChip>
                    <FilterChip
                        pressed={highOnly}
                        onPressedChange={setHighOnly}
                    >
                        High priority
                    </FilterChip>
                    <Menu>
                        <MenuTrigger
                            render={
                                <Button
                                    fillType="text"
                                    color="container"
                                    size="small"
                                    startIcon="sort"
                                />
                            }
                        >
                            {sort === 'due' ? 'By due date' : 'By priority'}
                        </MenuTrigger>
                        <MenuPopup>
                            <MenuItem
                                startIcon="event"
                                endIcon={sort === 'due' ? 'check' : undefined}
                                onClick={() => setSort('due')}
                            >
                                Due date
                            </MenuItem>
                            <MenuItem
                                startIcon="flag"
                                endIcon={
                                    sort === 'priority' ? 'check' : undefined
                                }
                                onClick={() => setSort('priority')}
                            >
                                Priority
                            </MenuItem>
                        </MenuPopup>
                    </Menu>
                </div>

                <TabsPanel value="open">{list(visible)}</TabsPanel>
                <TabsPanel value="done">{list(visible)}</TabsPanel>
            </Tabs>

            {selected.size > 0 && (
                <div className="tf-dock">
                    <FloatingToolbar aria-label="Selected tasks" inverseColor>
                        <Typography as="span" className="tf-toolbar-count">
                            {selected.size} selected
                        </Typography>
                        <FloatingToolbarButton
                            fillType="filled"
                            icon={tab === 'open' ? 'done_all' : 'undo'}
                            aria-label={
                                tab === 'open' ? 'Mark as done' : 'Reopen'
                            }
                            onClick={() => toggleDone([...selected])}
                        />
                        <FloatingToolbarButton
                            icon="person_add"
                            aria-label="Assign to me"
                            onClick={() => {
                                update(selected, { assignee: me.id })
                                snackbar.show({ message: 'Assigned to you' })
                            }}
                        />
                        <FloatingToolbarButton
                            icon="today"
                            aria-label="Move to today"
                            onClick={() => {
                                update(selected, { due: 'today' })
                                snackbar.show({ message: 'Moved to today' })
                            }}
                        />
                        <FloatingToolbarSeparator />
                        <FloatingToolbarButton
                            icon="delete"
                            aria-label="Delete"
                            onClick={() => remove(selected)}
                        />
                        <FloatingToolbarButton
                            icon="close"
                            aria-label="Clear selection"
                            onClick={() => setSelected(new Set())}
                        />
                    </FloatingToolbar>
                </div>
            )}

            <NewTaskDialog
                showButton={selected.size === 0}
                onCreate={(task) => {
                    setTasks((all) => [task, ...all])
                    setTab('open')
                    snackbar.show({
                        message: `Created “${task.title}”`,
                        action: {
                            label: 'Open',
                            onClick: () => openTask(task.id),
                        },
                    })
                }}
            />

            <TaskSheet
                task={tasks.find((t) => t.id === sheetTaskId)}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                onChange={(change) =>
                    sheetTaskId && update([sheetTaskId], change)
                }
                onDelete={() => {
                    setSheetOpen(false)
                    if (sheetTaskId) remove([sheetTaskId])
                }}
            />
        </div>
    )
}

function TaskRow({
    task,
    selected,
    onSelectedChange,
    onOpen,
}: {
    task: Task
    selected: boolean
    onSelectedChange: (selected: boolean) => void
    onOpen: () => void
}) {
    const assignee = people[task.assignee]
    return (
        <ListItem
            // A label, so clicking anywhere on the row toggles the checkbox
            render={<label />}
            className="tf-task-row"
            data-done={task.done || undefined}
            start={
                <Checkbox
                    checked={selected}
                    onCheckedChange={onSelectedChange}
                />
            }
            label={task.title}
            description={
                <span className="tf-task-meta">
                    <Badge color={priorityColors[task.priority]} />
                    {priorityLabels[task.priority]}
                    <span aria-hidden>·</span>
                    {projectNames[task.project]}
                    {task.tags.map((tag) => (
                        <span key={tag} className="tf-tag">
                            #{tag}
                        </span>
                    ))}
                </span>
            }
            end={
                <>
                    <Avatar size="small" name={assignee.name} />
                    <IconButton
                        icon="chevron_right"
                        fillType="text"
                        color="container"
                        aria-label={`Open “${task.title}”`}
                        onClick={(event) => {
                            // Don't let the label toggle the checkbox too
                            event.preventDefault()
                            onOpen()
                        }}
                    />
                </>
            }
        />
    )
}

function EmptyState({ tab }: { tab: 'open' | 'done' }) {
    return (
        <div className="tf-empty">
            <Icon name={tab === 'open' ? 'celebration' : 'inventory_2'} />
            <Typography type="h6" as="p">
                {tab === 'open' ? 'All clear' : 'Nothing finished yet'}
            </Typography>
            <Typography type="caption">
                No tasks match these filters.
            </Typography>
        </div>
    )
}
