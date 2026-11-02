import { useState } from 'react'
import { AnvilRoot, AppBar, NavigationList, NavigationListItem } from 'anvilui'
import { ColorModeToggle } from './ColorModeToggle'
import { playgrounds } from './playgrounds'
import './playground.css'

const names = Object.keys(playgrounds).sort()

// The URL hash keeps the current playground across reloads
const fromHash = () => {
    const hash = decodeURIComponent(location.hash.slice(1))
    return names.includes(hash) ? hash : names[0]
}

export default function App() {
    const [name, setName] = useState(fromHash)
    const Playground = playgrounds[name]

    return (
        <AnvilRoot storageKey="anvilui-playground-color-mode">
            <AppBar
                label="AnvilUI Playground"
                labelAs="h1"
                className="pg-header"
                color="surface"
                fillType="filled"
                end={<ColorModeToggle />}
            />
            <div className="pg-layout">
                <NavigationList aria-label="Components" className="pg-sidebar">
                    {names.map((n) => (
                        <NavigationListItem
                            key={n}
                            label={n}
                            href={`#${n}`}
                            active={n === name}
                            onClick={() => setName(n)}
                        />
                    ))}
                </NavigationList>
                <main className="pg-main">
                    <Playground />
                </main>
            </div>
        </AnvilRoot>
    )
}
