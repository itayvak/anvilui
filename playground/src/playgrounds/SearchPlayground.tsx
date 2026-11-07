import { useState } from 'react'
import { Search, SearchItem, Typography } from 'anvilui'
import { Section } from '../ui'

const fruits = [
    'Apple',
    'Apricot',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Dragon fruit with a very long name that has to be cut off',
    'Grape',
    'Kiwi',
    'Lemon',
    'Mango',
    'Orange',
    'Peach',
    'Pear',
    'Pineapple',
    'Strawberry',
    'Watermelon',
]

const recent = ['Weather tomorrow', 'Pasta recipes', 'Flights to Rome']

export function SearchPlayground() {
    const [query, setQuery] = useState('')

    return (
        <>
            <Section title="Filters as you type, with an empty message">
                <Search
                    items={fruits}
                    aria-label="Search fruits"
                    placeholder="Search fruits"
                    empty="No fruits found"
                >
                    {(fruit) => (
                        <SearchItem key={fruit} value={fruit}>
                            {fruit}
                        </SearchItem>
                    )}
                </Search>
            </Section>
            <Section title="Recent searches, opens on click">
                <Search
                    items={recent}
                    openOnInputClick
                    aria-label="Search"
                    placeholder="Search"
                >
                    {(item) => (
                        <SearchItem key={item} value={item} startIcon="history">
                            {item}
                        </SearchItem>
                    )}
                </Search>
            </Section>
            <Section title="Controlled">
                <Typography type="caption">Query: “{query}”</Typography>
                <Search
                    items={fruits}
                    value={query}
                    onValueChange={setQuery}
                    aria-label="Search fruits"
                    placeholder="Search fruits"
                >
                    {(fruit) => (
                        <SearchItem key={fruit} value={fruit}>
                            {fruit}
                        </SearchItem>
                    )}
                </Search>
            </Section>
            <Section title="Colors, on a surface panel">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--avl-spacing-x3)',
                        padding: 'var(--avl-spacing-x4)',
                        borderRadius: 'var(--avl-radius-large)',
                        backgroundColor: 'var(--avl-color-surface)',
                    }}
                >
                    {(['surface', 'container'] as const).map((color) => (
                        <Search
                            key={color}
                            color={color}
                            items={fruits}
                            aria-label={`Search fruits, ${color}`}
                            placeholder={`color="${color}"`}
                        >
                            {(fruit) => (
                                <SearchItem key={fruit} value={fruit}>
                                    {fruit}
                                </SearchItem>
                            )}
                        </Search>
                    ))}
                </div>
            </Section>
            <Section title="Disabled">
                <Search
                    items={fruits}
                    disabled
                    aria-label="Search fruits"
                    placeholder="Search fruits"
                >
                    {(fruit) => (
                        <SearchItem key={fruit} value={fruit}>
                            {fruit}
                        </SearchItem>
                    )}
                </Search>
            </Section>
        </>
    )
}
