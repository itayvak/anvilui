import { useState } from 'react'
import { NavigationBar, NavigationBarItem } from 'anvilui'
import type { MaterialSymbol } from 'material-symbols'
import { Section } from '../ui'

const pages: { icon: MaterialSymbol; label: string }[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'search', label: 'Search' },
    { icon: 'favorite', label: 'Favorites' },
    { icon: 'person', label: 'A long profile label' },
]

export function NavigationBarPlayground() {
    const [current, setCurrent] = useState('Home')

    return (
        <>
            <Section title="Four destinations">
                {/* Phone width, so it looks like it would on a phone */}
                <NavigationBar style={{ maxWidth: 412 }} aria-label="Main">
                    {pages.map((page) => (
                        <NavigationBarItem
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
                </NavigationBar>
            </Section>
            <Section title="Three destinations">
                <NavigationBar style={{ maxWidth: 412 }} aria-label="Library">
                    <NavigationBarItem
                        icon="music_note"
                        label="Music"
                        href="#"
                        active
                    />
                    <NavigationBarItem
                        icon="podcasts"
                        label="Podcasts"
                        href="#"
                    />
                    <NavigationBarItem
                        icon="menu_book"
                        label="Books"
                        href="#"
                    />
                </NavigationBar>
            </Section>
        </>
    )
}
