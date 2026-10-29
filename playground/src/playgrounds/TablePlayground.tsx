import { useState } from 'react'
import {
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from 'anvilui'
import { Labeled, Row, Section } from '../ui'

const people = [
    { name: 'Ada Lovelace', role: 'Engineer', status: 'Active', commits: 1284 },
    { name: 'Grace Hopper', role: 'Admiral', status: 'Away', commits: 932 },
    {
        name: 'A very long name that should wrap onto a second line',
        role: 'Designer',
        status: 'Active',
        commits: 12,
    },
    { name: 'Alan Turing', role: 'Researcher', status: 'Offline', commits: 0 },
]

const numeric = { textAlign: 'end' } as const

export function TablePlayground() {
    const [caption, setCaption] = useState(true)
    const [selected, setSelected] = useState<string[]>([])

    const toggle = (name: string, checked: boolean) =>
        setSelected((s) =>
            checked ? [...s, name] : s.filter((n) => n !== name)
        )

    return (
        <Section title="Table">
            <Row>
                <Labeled label="caption">
                    <Checkbox checked={caption} onCheckedChange={setCaption} />
                </Labeled>
            </Row>
            <Table aria-label={caption ? undefined : 'Team members'}>
                {caption && <TableCaption>Team members</TableCaption>}
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>
                            <Checkbox
                                aria-label="Select all"
                                checked={selected.length === people.length}
                                indeterminate={
                                    selected.length > 0 &&
                                    selected.length < people.length
                                }
                                onCheckedChange={(checked) =>
                                    setSelected(
                                        checked ? people.map((p) => p.name) : []
                                    )
                                }
                            />
                        </TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Role</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell style={numeric}>
                            Commits
                        </TableHeaderCell>
                        <TableHeaderCell aria-label="Actions" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {people.map((p) => (
                        <TableRow key={p.name}>
                            <TableCell>
                                <Checkbox
                                    aria-label={`Select ${p.name}`}
                                    checked={selected.includes(p.name)}
                                    onCheckedChange={(c) => toggle(p.name, c)}
                                />
                            </TableCell>
                            <TableHeaderCell scope="row">
                                {p.name}
                            </TableHeaderCell>
                            <TableCell>{p.role}</TableCell>
                            <TableCell>{p.status}</TableCell>
                            <TableCell style={numeric}>
                                {p.commits.toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    icon="more_vert"
                                    fillType="text"
                                    aria-label={`More actions for ${p.name}`}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
