import { useRef } from 'react'
import {
    Avatar,
    BottomSheet,
    BottomSheetClose,
    BottomSheetDescription,
    BottomSheetPopup,
    BottomSheetTitle,
    Button,
    Divider,
    HoldButton,
    Icon,
    List,
    ListItem,
    Select,
    SelectItem,
} from 'anvilui'
import {
    dueLabels,
    people,
    priorityLabels,
    projectNames,
    type Due,
    type Priority,
    type Task,
} from './data'

export function TaskSheet({
    task,
    open,
    onOpenChange,
    onChange,
    onDelete,
}: {
    task: Task | undefined
    open: boolean
    onOpenChange: (open: boolean) => void
    onChange: (change: Partial<Task>) => void
    onDelete: () => void
}) {
    // Keep showing the task while the sheet slides away after it's deleted
    const last = useRef(task)
    if (task) last.current = task
    const shown = task ?? last.current

    return (
        <BottomSheet open={open && shown != null} onOpenChange={onOpenChange}>
            <BottomSheetPopup className="tf-sheet">
                {shown && (
                    <>
                        <BottomSheetTitle>{shown.title}</BottomSheetTitle>
                        <BottomSheetDescription>
                            {shown.description || 'No notes yet.'}
                        </BottomSheetDescription>

                        <List>
                            <ListItem
                                start={<Icon name="folder" />}
                                label={projectNames[shown.project]}
                                description="Project"
                            />
                            <ListItem
                                start={
                                    <Avatar
                                        size="small"
                                        name={people[shown.assignee].name}
                                    />
                                }
                                label={people[shown.assignee].name}
                                description="Assignee"
                            />
                        </List>

                        <div className="tf-form-row">
                            <Select
                                label="Due"
                                items={dueLabels}
                                value={shown.due}
                                onValueChange={(value) =>
                                    value && onChange({ due: value as Due })
                                }
                            >
                                {Object.entries(dueLabels).map(
                                    ([id, label]) => (
                                        <SelectItem key={id} value={id}>
                                            {label}
                                        </SelectItem>
                                    )
                                )}
                            </Select>
                            <Select
                                label="Priority"
                                items={priorityLabels}
                                value={shown.priority}
                                onValueChange={(value) =>
                                    value &&
                                    onChange({ priority: value as Priority })
                                }
                            >
                                {Object.entries(priorityLabels).map(
                                    ([id, label]) => (
                                        <SelectItem key={id} value={id}>
                                            {label}
                                        </SelectItem>
                                    )
                                )}
                            </Select>
                        </div>

                        <Divider />

                        <div className="tf-sheet-actions">
                            <HoldButton
                                color="error"
                                fillType="outlined"
                                startIcon="delete"
                                onConfirm={onDelete}
                            >
                                Hold to delete
                            </HoldButton>
                            <span className="tf-spacer" />
                            <BottomSheetClose
                                render={<Button fillType="text" />}
                            >
                                Close
                            </BottomSheetClose>
                            <BottomSheetClose
                                render={
                                    <Button
                                        startIcon={
                                            shown.done ? 'undo' : 'check'
                                        }
                                    />
                                }
                                onClick={() => onChange({ done: !shown.done })}
                            >
                                {shown.done ? 'Reopen' : 'Mark as done'}
                            </BottomSheetClose>
                        </div>
                    </>
                )}
            </BottomSheetPopup>
        </BottomSheet>
    )
}
