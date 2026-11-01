import { useState } from 'react'
import {
    Chip,
    FilterChip,
    InputChip,
    Switch,
    Typography,
    useSnackbar,
} from 'anvilui'
import { Row, Section } from '../ui'

const sizes = ['Small', 'Medium', 'Large', 'Extra large']

export function ChipPlayground() {
    const snackbar = useSnackbar()
    const [disabled, setDisabled] = useState(false)
    const [selected, setSelected] = useState<string[]>(['Medium'])
    const [people, setPeople] = useState(['Alice', 'Bob', 'Charlie'])

    return (
        <>
            <Section title="Chip (assist, suggestion)">
                <Row>
                    <label className="pg-checkbox">
                        <Switch
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                        <Typography type="caption">disabled</Typography>
                    </label>
                </Row>
                <Row>
                    <Chip
                        disabled={disabled}
                        startIcon="event"
                        onClick={() => snackbar.show({ message: 'Added' })}
                    >
                        Add to calendar
                    </Chip>
                    <Chip disabled={disabled} startIcon="directions">
                        Directions
                    </Chip>
                    <Chip disabled={disabled}>Sounds good!</Chip>
                </Row>
            </Section>
            <Section title="FilterChip">
                <Row>
                    {sizes.map((size) => (
                        <FilterChip
                            key={size}
                            disabled={disabled}
                            pressed={selected.includes(size)}
                            onPressedChange={(on) =>
                                setSelected((s) =>
                                    on
                                        ? [...s, size]
                                        : s.filter((x) => x !== size)
                                )
                            }
                        >
                            {size}
                        </FilterChip>
                    ))}
                </Row>
                <Typography>selected: {selected.join(', ')}</Typography>
            </Section>
            <Section title="InputChip">
                <Row>
                    {people.map((name) => (
                        <InputChip
                            key={name}
                            disabled={disabled}
                            startIcon="person"
                            removeLabel={`Remove ${name}`}
                            onRemove={() =>
                                setPeople((p) => p.filter((x) => x !== name))
                            }
                        >
                            {name}
                        </InputChip>
                    ))}
                    {people.length === 0 && (
                        <Chip
                            onClick={() =>
                                setPeople(['Alice', 'Bob', 'Charlie'])
                            }
                        >
                            Reset
                        </Chip>
                    )}
                </Row>
            </Section>
        </>
    )
}
