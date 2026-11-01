import { useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardTitle,
    Dialog,
    DialogActions,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    Icon,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
    Progress,
    SplitButton,
    ToggleGroup,
    ToggleGroupItem,
    Typography,
    useSnackbar,
} from 'anvilui'
import type { MaterialSymbol } from 'material-symbols'
import { people, projects, type Project, type Task } from './data'

const createOptions: [string, MaterialSymbol][] = [
    ['From a template', 'dashboard_customize'],
    ['Import from CSV', 'upload_file'],
    ['Duplicate a project', 'content_copy'],
]

export function ProjectsPage({ tasks }: { tasks: Task[] }) {
    const snackbar = useSnackbar()
    const [view, setView] = useState<'grid' | 'list'>('grid')

    const stats = (project: Project) => {
        const own = tasks.filter((t) => t.project === project.id)
        const done = own.filter((t) => t.done).length
        return {
            tasks: own,
            done,
            percent: own.length ? Math.round((done / own.length) * 100) : 0,
        }
    }

    return (
        <div className="tf-page">
            <div className="tf-page-header">
                <Typography type="caption">
                    {projects.length} active projects
                </Typography>
                <span className="tf-spacer" />
                <ToggleGroup
                    size="small"
                    color="container"
                    aria-label="View"
                    value={view}
                    onValueChange={(value) => setView(value as 'grid' | 'list')}
                >
                    <ToggleGroupItem value="grid" startIcon="grid_view">
                        Grid
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" startIcon="view_list">
                        List
                    </ToggleGroupItem>
                </ToggleGroup>
                <SplitButton>
                    <Button
                        startIcon="add"
                        onClick={() =>
                            snackbar.show({ message: 'Blank project created' })
                        }
                    >
                        New project
                    </Button>
                    <Menu>
                        <MenuTrigger
                            render={
                                <IconButton
                                    icon="keyboard_arrow_down"
                                    aria-label="More ways to create a project"
                                />
                            }
                        />
                        <MenuPopup align="end">
                            {createOptions.map(([label, icon]) => (
                                <MenuItem
                                    key={label}
                                    startIcon={icon}
                                    onClick={() =>
                                        snackbar.show({ message: label })
                                    }
                                >
                                    {label}
                                </MenuItem>
                            ))}
                        </MenuPopup>
                    </Menu>
                </SplitButton>
            </div>

            {view === 'grid' ? (
                <div className="tf-project-grid">
                    {projects.map((p) => (
                        <ProjectCard key={p.id} project={p} {...stats(p)} />
                    ))}
                </div>
            ) : (
                <List divided>
                    {projects.map((p) => {
                        const s = stats(p)
                        return (
                            <ListItem
                                key={p.id}
                                start={<Avatar icon={p.icon} color={p.color} />}
                                label={p.name}
                                description={p.description}
                                end={
                                    <Typography type="caption">
                                        <Progress
                                            type="inline"
                                            value={s.percent}
                                            aria-label={`${p.name} progress`}
                                        />{' '}
                                        {s.percent}%
                                    </Typography>
                                }
                            />
                        )
                    })}
                </List>
            )}
        </div>
    )
}

function ProjectCard({
    project,
    tasks,
    done,
    percent,
}: {
    project: Project
    tasks: Task[]
    done: number
    percent: number
}) {
    const snackbar = useSnackbar()

    return (
        <Dialog morph>
            <DialogTrigger
                render={<Card clickable className="tf-project-card" />}
            >
                <div className="tf-project-card-header">
                    <Avatar icon={project.icon} color={project.color} />
                    <CardTitle>{project.name}</CardTitle>
                    <Menu>
                        <MenuTrigger
                            render={
                                <IconButton
                                    icon="more_vert"
                                    fillType="text"
                                    color="container"
                                    aria-label={`${project.name} options`}
                                />
                            }
                        />
                        <MenuPopup align="end">
                            <MenuItem
                                startIcon="star"
                                onClick={() =>
                                    snackbar.show({
                                        message: `Starred ${project.name}`,
                                    })
                                }
                            >
                                Star
                            </MenuItem>
                            <MenuItem
                                startIcon="archive"
                                onClick={() =>
                                    snackbar.show({
                                        message: `Archived ${project.name}`,
                                    })
                                }
                            >
                                Archive
                            </MenuItem>
                        </MenuPopup>
                    </Menu>
                </div>
                <CardContent>
                    <Typography>{project.description}</Typography>
                </CardContent>
                <div className="tf-project-card-footer">
                    <div className="tf-avatar-stack">
                        {project.members.map((id) => (
                            <Avatar
                                key={id}
                                size="small"
                                name={people[id].name}
                            />
                        ))}
                    </div>
                    <div className="tf-project-percent">
                        <Typography type="caption">{percent}%</Typography>
                        <Progress
                            type="circular"
                            value={percent}
                            aria-label={`${project.name}: ${done} of ${tasks.length} tasks done`}
                        />
                    </div>
                </div>
            </DialogTrigger>

            <DialogPopup className="tf-project-dialog">
                <DialogTitle>{project.name}</DialogTitle>
                <DialogDescription>{project.description}</DialogDescription>
                <Progress
                    label={`${done} of ${tasks.length} tasks done`}
                    value={percent}
                />
                <List>
                    {tasks.map((t) => (
                        <ListItem
                            key={t.id}
                            start={
                                <Icon
                                    name={
                                        t.done
                                            ? 'check_circle'
                                            : 'radio_button_unchecked'
                                    }
                                />
                            }
                            label={t.title}
                            end={
                                <Avatar
                                    size="small"
                                    name={people[t.assignee].name}
                                />
                            }
                        />
                    ))}
                </List>
                <DialogActions>
                    <DialogClose render={<Button fillType="text" />}>
                        Close
                    </DialogClose>
                    <DialogClose
                        render={<Button startIcon="open_in_new" />}
                        onClick={() => (window.location.hash = 'tasks')}
                    >
                        Open tasks
                    </DialogClose>
                </DialogActions>
            </DialogPopup>
        </Dialog>
    )
}
