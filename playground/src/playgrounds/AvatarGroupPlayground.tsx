import { useState } from 'react'
import type { ComponentColor } from 'anvilui'
import {
    Avatar,
    AvatarGroup,
    Card,
    CardContent,
    CardTitle,
    Checkbox,
    Typography,
} from 'anvilui'
import type { AvatarGroupProps } from 'anvilui'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

// Photos from pravatar.cc, like the Avatar playground; the rest use initials
const people: { name: string; img?: number; color?: ComponentColor }[] = [
    { name: 'Ada Lovelace', img: 47 },
    { name: 'Grace Hopper', color: 'tonal' },
    { name: 'Alan Turing', img: 12 },
    { name: 'Katherine Johnson', color: 'success' },
    { name: 'Linus Torvalds', img: 33 },
    { name: 'Margaret Hamilton', color: 'warning' },
    { name: 'Tim Berners-Lee', img: 60 },
    { name: 'Hedy Lamarr', color: 'error' },
    { name: 'Dennis Ritchie', img: 15 },
    { name: 'Radia Perlman' },
    { name: 'Ken Thompson', img: 68 },
    { name: 'Barbara Liskov', color: 'tonal' },
]

// A plain list, not a component: AvatarGroup counts its direct children
function renderPeople(count: number) {
    return people
        .slice(0, count)
        .map((person) => (
            <Avatar
                key={person.name}
                name={person.name}
                color={person.color}
                src={
                    person.img
                        ? `https://i.pravatar.cc/150?img=${person.img}`
                        : undefined
                }
            />
        ))
}

export function AvatarGroupPlayground() {
    const [size, setSize] =
        useState<NonNullable<AvatarGroupProps['size']>>('normal')
    const [max, setMax] = useState(5)
    const [count, setCount] = useState(9)
    const [fan, setFan] = useState(true)

    return (
        <>
            <Section title="Options">
                <Row>
                    <SelectControl
                        label="size"
                        value={size}
                        options={sizes}
                        onChange={setSize}
                    />
                    <RangeControl
                        label="max"
                        value={max}
                        min={1}
                        max={people.length}
                        onChange={setMax}
                    />
                    <RangeControl
                        label="people"
                        value={count}
                        min={1}
                        max={people.length}
                        onChange={setCount}
                    />
                    <label className="pg-checkbox">
                        <Checkbox checked={fan} onCheckedChange={setFan} />
                        <Typography type="caption">fan</Typography>
                    </label>
                </Row>
                <Row>
                    <Typography type="caption">
                        Hover the group to fan it out. Change "people" or "max"
                        to see the counter roll.
                    </Typography>
                </Row>
                <Row>
                    <AvatarGroup
                        aria-label="Team"
                        size={size}
                        max={max}
                        fan={fan}
                    >
                        {renderPeople(count)}
                    </AvatarGroup>
                </Row>
            </Section>
            <Section title="No limit">
                <Row>
                    <AvatarGroup aria-label="Everyone" size={size}>
                        {renderPeople(people.length)}
                    </AvatarGroup>
                </Row>
            </Section>
            <Section title="On a card">
                <Card style={{ width: 300 }}>
                    <CardTitle>Design review</CardTitle>
                    <CardContent>
                        <Typography type="caption">
                            The ring matches the card with
                            --avl-avatar-group-ring.
                        </Typography>
                        <AvatarGroup
                            aria-label="Attendees"
                            max={4}
                            size="small"
                            style={
                                {
                                    '--avl-avatar-group-ring':
                                        'var(--avl-color-container)',
                                    marginTop: 8,
                                } as React.CSSProperties
                            }
                        >
                            {renderPeople(7)}
                        </AvatarGroup>
                    </CardContent>
                </Card>
            </Section>
        </>
    )
}
