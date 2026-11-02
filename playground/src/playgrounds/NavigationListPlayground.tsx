import { useState } from 'react'
import { NavigationList, NavigationListItem, Typography } from 'anvilui'
import { Section } from '../ui'

const pages = [
    'Getting started',
    'Installation',
    'Theming',
    'Dark mode',
    'A page with a very long title that gets cut off',
    'Changelog',
]

export function NavigationListPlayground() {
    const [current, setCurrent] = useState(pages[0])

    return (
        <Section title="Docs sidebar">
            <div style={{ display: 'flex', border: '1px dashed gray' }}>
                <NavigationList aria-label="Docs" style={{ width: 260 }}>
                    {pages.map((page) => (
                        <NavigationListItem
                            key={page}
                            label={page}
                            href="#"
                            active={current === page}
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrent(page)
                            }}
                        />
                    ))}
                </NavigationList>
                <Typography style={{ padding: 16 }}>Page: {current}</Typography>
            </div>
        </Section>
    )
}
