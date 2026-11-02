import { useRef, useState, type FormEvent } from 'react'
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogClose,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    FAB,
    Field,
    FieldDescription,
    FieldError,
    FilterChip,
    Input,
    InputChip,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Textarea,
    Typography,
} from 'anvilui'
import type { DialogProps } from 'anvilui'
import {
    dueLabels,
    me,
    newId,
    personNames,
    priorityLabels,
    projectNames,
    projects,
    type Due,
    type Priority,
    type Task,
} from './data'

type DialogHandle = NonNullable<
    NonNullable<DialogProps['actionsRef']>['current']
>

const suggestedTags = ['bug', 'design', 'writing', 'backend']
const dueOptions: Due[] = ['today', 'week', 'later']

// The "New task" FAB and the dialog it grows into
export function NewTaskDialog({
    showButton,
    onCreate,
}: {
    showButton: boolean
    onCreate: (task: Task) => void
}) {
    const dialog = useRef<DialogHandle>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [project, setProject] = useState(projects[0].id)
    const [assignee, setAssignee] = useState(me.id)
    const [due, setDue] = useState<Due>('today')
    const [priority, setPriority] = useState<Priority>('medium')
    const [tags, setTags] = useState<string[]>([])
    const [tagDraft, setTagDraft] = useState('')
    const [saving, setSaving] = useState(false)

    const reset = () => {
        setTitle('')
        setDescription('')
        setDue('today')
        setPriority('medium')
        setTags([])
        setTagDraft('')
    }

    const addTag = (tag: string) => {
        const clean = tag.trim().replace(/^#/, '').toLowerCase()
        if (clean && !tags.includes(clean)) setTags([...tags, clean])
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        setSaving(true)
        // Pretend to talk to a server
        setTimeout(() => {
            onCreate({
                id: newId(),
                title: title.trim(),
                description,
                project,
                assignee,
                due,
                priority,
                done: false,
                tags,
            })
            setSaving(false)
            // Through Base UI rather than a controlled `open`, so it
            // shrinks back into the FAB
            dialog.current?.close()
            reset()
        }, 700)
    }

    return (
        <Dialog morph actionsRef={dialog}>
            {showButton && (
                <DialogTrigger
                    render={
                        <FAB className="tf-fab" icon="add" label="New task" />
                    }
                />
            )}
            <DialogPopup className="tf-new-task">
                <form onSubmit={submit} className="tf-form">
                    <DialogTitle>New task</DialogTitle>

                    <Field validationMode="onBlur">
                        <Input
                            label="Title"
                            required
                            autoFocus
                            value={title}
                            onValueChange={setTitle}
                        />
                        <FieldError match="valueMissing">
                            Give the task a title
                        </FieldError>
                    </Field>

                    <Field>
                        <Textarea
                            label="Notes"
                            rows={3}
                            value={description}
                            onValueChange={setDescription}
                        />
                        <FieldDescription>Optional</FieldDescription>
                    </Field>

                    <div className="tf-form-row">
                        <Select
                            label="Project"
                            items={projectNames}
                            value={project}
                            onValueChange={(value) =>
                                value && setProject(value)
                            }
                        >
                            {projects.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Assignee"
                            items={personNames}
                            value={assignee}
                            onValueChange={(value) =>
                                value && setAssignee(value)
                            }
                        >
                            {Object.entries(personNames).map(([id, name]) => (
                                <SelectItem key={id} value={id}>
                                    {name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <fieldset className="tf-fieldset">
                        <legend>
                            <Typography as="span" type="caption">
                                Due
                            </Typography>
                        </legend>
                        <div className="tf-chip-row">
                            {dueOptions.map((option) => (
                                <FilterChip
                                    key={option}
                                    pressed={due === option}
                                    onPressedChange={() => setDue(option)}
                                >
                                    {dueLabels[option]}
                                </FilterChip>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="tf-fieldset">
                        <legend>
                            <Typography as="span" type="caption">
                                Priority
                            </Typography>
                        </legend>
                        <RadioGroup
                            value={priority}
                            onValueChange={(value) =>
                                setPriority(value as Priority)
                            }
                            className="tf-radio-row"
                        >
                            {(['high', 'medium', 'low'] as const).map((p) => (
                                <label key={p} className="tf-radio">
                                    <Radio value={p} />
                                    <Typography as="span">
                                        {priorityLabels[p]}
                                    </Typography>
                                </label>
                            ))}
                        </RadioGroup>
                    </fieldset>

                    <fieldset className="tf-fieldset">
                        <legend>
                            <Typography as="span" type="caption">
                                Tags
                            </Typography>
                        </legend>
                        <div className="tf-chip-row">
                            {tags.map((tag) => (
                                <InputChip
                                    key={tag}
                                    startIcon="tag"
                                    removeLabel={`Remove ${tag}`}
                                    onRemove={() =>
                                        setTags(tags.filter((t) => t !== tag))
                                    }
                                >
                                    {tag}
                                </InputChip>
                            ))}
                            <Input
                                size="small"
                                label="Add a tag"
                                className="tf-tag-input"
                                value={tagDraft}
                                onValueChange={setTagDraft}
                                onKeyDown={(event) => {
                                    if (event.key !== 'Enter') return
                                    // Enter adds the tag rather than submitting
                                    event.preventDefault()
                                    addTag(tagDraft)
                                    setTagDraft('')
                                }}
                            />
                        </div>
                        <div className="tf-chip-row">
                            {suggestedTags
                                .filter((tag) => !tags.includes(tag))
                                .map((tag) => (
                                    <Chip
                                        key={tag}
                                        type="button"
                                        startIcon="add"
                                        onClick={() => addTag(tag)}
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                        </div>
                    </fieldset>

                    <DialogActions>
                        <DialogClose
                            render={<Button fillType="text" type="button" />}
                        >
                            Cancel
                        </DialogClose>
                        <Button type="submit" loading={saving}>
                            {saving ? 'Creating' : 'Create task'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogPopup>
        </Dialog>
    )
}
