import { useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import {
    Button,
    NavigationRail,
    NavigationRailItem,
    NavigationRailToggle,
    Typography,
} from 'anvilui'
import { Row, Section } from '../ui'

const pages: { icon: MaterialSymbol; label: string; count?: number }[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'inbox', label: 'Inbox', count: 12 },
    { icon: 'search', label: 'Search', count: 1250 },
    { icon: 'favorite', label: 'Favorites' },
    { icon: 'person', label: 'A very long profile label' },
]

function Demo(props: {
    expanded?: boolean
    defaultExpanded?: boolean
    onExpandedChange?: (expanded: boolean) => void
    /** Leave out the toggle, so the state can't change. */
    locked?: boolean
}) {
    const { locked, ...railProps } = props
    const [current, setCurrent] = useState('Home')

    return (
        <div
            style={{ display: 'flex', height: 420, border: '1px dashed gray' }}
        >
            <NavigationRail aria-label="Main" {...railProps}>
                {!locked && <NavigationRailToggle aria-label="Menu" />}
                {pages.map((page) => (
                    <NavigationRailItem
                        key={page.label}
                        icon={page.icon}
                        label={page.label}
                        end={page.count}
                        href="#"
                        active={current === page.label}
                        onClick={(e) => {
                            e.preventDefault()
                            setCurrent(page.label)
                        }}
                    />
                ))}
            </NavigationRail>
            <Typography style={{ padding: 16 }}>Page: {current}</Typography>
        </div>
    )
}

export function NavigationRailPlayground() {
    const [expanded, setExpanded] = useState(true)

    return (
        <>
            <Section title="Uncontrolled">
                <Demo />
            </Section>
            <Section title="Controlled">
                <Row>
                    <Button onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Collapse' : 'Expand'} from outside
                    </Button>
                </Row>
                <Demo expanded={expanded} onExpandedChange={setExpanded} />
            </Section>
            {/* No toggle + a fixed `expanded`: the rail stays in one state */}
            <Section title="Always collapsed">
                <Demo expanded={false} locked />
            </Section>
            <Section title="Always expanded">
                <Demo expanded locked />
            </Section>
        </>
    )
}
