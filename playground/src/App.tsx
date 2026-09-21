import { useState } from 'react'
import { AnvilRoot, Typography } from 'anvilui'
import { ColorModeToggle } from './ColorModeToggle'
import { getStoredColorMode } from './colorMode'
import { playgrounds } from './playgrounds'
import './playground.css'

const names = Object.keys(playgrounds)

export default function App() {
    const [name, setName] = useState(names[0])
    const Playground = playgrounds[name]
    // AnvilRoot only reads its colorMode prop on mount, so read storage once.
    const [initialColorMode] = useState(getStoredColorMode)

    return (
        <AnvilRoot colorMode={initialColorMode}>
            <header className="pg-header">
                <label>
                    <Typography>Component:</Typography>
                    <select
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                        {names.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>
                <ColorModeToggle />
            </header>
            <main className="pg-main">
                <Playground />
            </main>
        </AnvilRoot>
    )
}
