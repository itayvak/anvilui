import { useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { NavigationRail, NavigationRailItem } from 'anvilui'
import { Section } from '../ui'

const pages: { icon: MaterialSymbol; label: string }[] = [
    { icon: 'person', label: 'My Profile' },
    { icon: 'photo', label: 'Photos' },
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
