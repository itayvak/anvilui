import { useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { NavigationRail, NavigationRailItem } from 'anvilui'
import { Section } from '../ui'

const pages: { icon: MaterialSymbol; label: string; count?: number }[] = [
    { icon: 'person', label: 'My Profile' },
    { icon: 'inbox', label: 'Inbox', count: 12 },
    { icon: 'photo', label: 'Photos', count: 1250 },
    { icon: 'settings', label: 'Settings' },
    { icon: 'help', label: 'Help and feedback' },
]

export function NavigationRailPlayground() {
    const [current, setCurrent] = useState('My Profile')

    return (
        <Section title="Navigation Rail">
            <NavigationRail hasExpandButton aria-label="Main">
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
        </Section>
    )
}
