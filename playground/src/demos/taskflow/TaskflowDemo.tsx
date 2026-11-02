import { useEffect, useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuGroup,
    MenuItem,
    MenuPopup,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuTrigger,
    NavigationBar,
    NavigationBarItem,
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
    Tooltip,
    Typography,
    useSnackbar,
} from 'anvilui'
import { initialNotifications, initialTasks, me, people } from './data'
import { TasksPage } from './TasksPage'
import { ProjectsPage } from './ProjectsPage'
import { InboxPage } from './InboxPage'
import { SettingsPage } from './SettingsPage'
import './taskflow.css'

type Page = 'tasks' | 'projects' | 'inbox' | 'settings'

const pages: { id: Page; label: string; icon: MaterialSymbol }[] = [
    { id: 'tasks', label: 'My tasks', icon: 'task_alt' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
]

function pageFromHash(): Page {
    const hash = window.location.hash.slice(1)
    return pages.some((p) => p.id === hash) ? (hash as Page) : 'tasks'
}

// The current page lives in the URL hash, so reloads and back/forward work
function usePage() {
    const [page, setPage] = useState(pageFromHash)
    useEffect(() => {
        const onChange = () => setPage(pageFromHash())
        window.addEventListener('hashchange', onChange)
        return () => window.removeEventListener('hashchange', onChange)
    }, [])
    return page
}

export function TaskflowDemo() {
    const page = usePage()
    const snackbar = useSnackbar()
    const [tasks, setTasks] = useState(initialTasks)
    const [notifications, setNotifications] = useState(initialNotifications)
    const unread = notifications.filter((n) => n.unread).length
    const title = pages.find((p) => p.id === page)!.label

    return (
        <div className="tf-app">
            <NavigationRail
                aria-label="Main"
                className="tf-wide-only"
                defaultExpanded={false}
            >
                <NavigationRailToggle aria-label="Menu" />
                {pages.map((p) => (
                    <NavigationRailItem
                        key={p.id}
                        href={`#${p.id}`}
                        icon={p.icon}
                        label={p.label}
                        active={page === p.id}
                    />
                ))}
            </NavigationRail>

            <div className="tf-main">
                <NavigationDrawer>
                    <AppBar
                        label={title}
                        labelAs="h1"
                        start={
                            <span className="tf-narrow-only">
                                <NavigationDrawerTrigger
                                    render={
                                        <IconButton
                                            icon="menu"
                                            fillType="text"
                                            color="container"
                                            aria-label="Open navigation"
                                        />
                                    }
                                />
                            </span>
                        }
                        end={
                            <>
                                <NotificationsButton
                                    unread={unread}
                                    notifications={notifications}
                                />
                                <AppMenu
                                    onAction={(message) =>
                                        snackbar.show({ message })
                                    }
                                />
                                <AccountButton />
                            </>
                        }
                    />
                    <NavigationDrawerPopup>
                        <NavigationDrawerTitle>Taskflow</NavigationDrawerTitle>
                        {pages.map((p) => (
                            <NavigationDrawerItem
                                key={p.id}
                                href={`#${p.id}`}
                                icon={p.icon}
                                label={p.label}
                                active={page === p.id}
                                end={
                                    p.id === 'inbox' && unread > 0
                                        ? unread
                                        : undefined
                                }
                            />
                        ))}
                    </NavigationDrawerPopup>
                </NavigationDrawer>

                <main className="tf-content">
                    {page === 'tasks' && (
                        <TasksPage tasks={tasks} setTasks={setTasks} />
                    )}
                    {page === 'projects' && <ProjectsPage tasks={tasks} />}
                    {page === 'inbox' && (
                        <InboxPage
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                    )}
                    {page === 'settings' && <SettingsPage />}
                </main>

                <NavigationBar aria-label="Main" className="tf-narrow-only">
                    {pages.map((p) => (
                        <NavigationBarItem
                            key={p.id}
                            href={`#${p.id}`}
                            icon={p.icon}
                            label={p.label}
                            active={page === p.id}
                        />
                    ))}
                </NavigationBar>
            </div>
        </div>
    )
}

function NotificationsButton({
    unread,
    notifications,
}: {
    unread: number
    notifications: typeof initialNotifications
}) {
    return (
        <Popover>
            {/* The badge is hidden from screen readers, so the count is in
                the button's name too */}
            <Badge count={unread}>
                <Tooltip label="Notifications">
                    <PopoverTrigger
                        render={
                            <IconButton
                                icon="notifications"
                                fillType="text"
                                color="container"
                                aria-label={`Notifications, ${unread} unread`}
                            />
                        }
                    />
                </Tooltip>
            </Badge>
            <PopoverPopup align="end" className="tf-notifications-popup">
                <PopoverTitle>Notifications</PopoverTitle>
                <List>
                    {notifications.slice(0, 3).map((n) => (
                        <ListItem
                            key={n.id}
                            start={
                                <Avatar
                                    size="small"
                                    name={people[n.from].name}
                                />
                            }
                            label={people[n.from].name}
                            description={n.text}
                        />
                    ))}
                </List>
                <PopoverClose
                    render={<Button fillType="text" />}
                    onClick={() => (window.location.hash = 'inbox')}
                >
                    See all
                </PopoverClose>
            </PopoverPopup>
        </Popover>
    )
}

function AppMenu({ onAction }: { onAction: (message: string) => void }) {
    return (
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
                <MenuGroup>
                    <MenuItem
                        startIcon="keyboard"
                        onClick={() =>
                            onAction('Press ? anywhere for shortcuts')
                        }
                    >
                        Keyboard shortcuts
                    </MenuItem>
                    <MenuItem
                        startIcon="help"
                        onClick={() => onAction('Opening the help center…')}
                    >
                        Help
                    </MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuSubmenu>
                        <MenuSubmenuTrigger startIcon="swap_horiz">
                            Switch workspace
                        </MenuSubmenuTrigger>
                        <MenuPopup>
                            <MenuItem endIcon="check">Acme Inc.</MenuItem>
                            <MenuItem
                                onClick={() => onAction('Switched to Personal')}
                            >
                                Personal
                            </MenuItem>
                            <MenuItem
                                startIcon="add"
                                onClick={() =>
                                    onAction('New workspace created')
                                }
                            >
                                New workspace
                            </MenuItem>
                        </MenuPopup>
                    </MenuSubmenu>
                    <MenuItem
                        startIcon="logout"
                        onClick={() =>
                            onAction('This is a demo, so you stay in')
                        }
                    >
                        Sign out
                    </MenuItem>
                </MenuGroup>
            </MenuPopup>
        </Menu>
    )
}

function AccountButton() {
    return (
        <Popover morph>
            <PopoverTrigger className="tf-avatar-button" aria-label="Account">
                <Avatar size="small" name={me.name} />
            </PopoverTrigger>
            <PopoverPopup align="end" className="tf-account-popup">
                <Avatar size="big" name={me.name} />
                <PopoverTitle>{me.name}</PopoverTitle>
                <Typography type="caption">{me.email}</Typography>
                <Divider />
                <PopoverClose
                    render={<Button fillType="outlined" startIcon="settings" />}
                    onClick={() => (window.location.hash = 'settings')}
                >
                    Account settings
                </PopoverClose>
            </PopoverPopup>
        </Popover>
    )
}
