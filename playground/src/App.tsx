import { useState } from 'react'
import {
    AnvilRoot,
    AppBar,
    IconButton,
    NavigationList,
    NavigationListItem,
    Typography,
} from 'anvilui'
import type { DesignTokens } from 'anvilui'
import { ColorModeToggle } from './ColorModeToggle'
import { getStoredTokens, storeTokens } from './tokens'
import { TokensPanel } from './TokensPanel'
import {
    getStoredPalette,
    paletteNames,
    palettes,
    storePalette,
    type PaletteName,
} from './palettes'
import { playgrounds } from './playgrounds'
import { demos } from './demos'
import { DemosPage } from './DemosPage'
import './playground.css'

const names = Object.keys(playgrounds).sort()

// The URL hash keeps the current playground across reloads
const fromHash = () => {
    const hash = decodeURIComponent(location.hash.slice(1))
    return names.includes(hash) ? hash : names[0]
}

// No router: the Vite dev server serves index.html for every path, so the
// page is picked from the URL once on load and links do full navigations.
const path = window.location.pathname.replace(/\/+$/, '')
const demoSlug = path.match(/^\/demos\/([^/]+)$/)?.[1]
const onDemos = path === '/demos' || demoSlug !== undefined

export default function App() {
    const [name, setName] = useState(fromHash)
    const Playground = playgrounds[name]
    const [tokens, setTokens] = useState(getStoredTokens)
    const [tokensOpen, setTokensOpen] = useState(false)
    const [palette, setPalette] = useState(getStoredPalette)

    const changePalette = (next: PaletteName) => {
        setPalette(next)
        storePalette(next)
    }

    const changeTokens = (next: DesignTokens) => {
        setTokens(next)
        storeTokens(next)
    }

    return (
        <AnvilRoot
            storageKey="anvilui-playground-color-mode"
            tokens={tokens}
            lightTheme={palettes[palette].light}
            darkTheme={palettes[palette].dark}
        >
            {/* Demos are whole apps with their own bars, so no playground header */}
            {demoSlug === undefined && (
                <AppBar
                    label="AnvilUI Playground"
                    labelAs="h1"
                    className="pg-header"
                    color="surface"
                    fillType="filled"
                    end={
                        <div className="pg-header-end">
                            <nav className="pg-nav" aria-label="Sections">
                                <a
                                    href="/"
                                    aria-current={onDemos ? undefined : 'page'}
                                >
                                    Components
                                </a>
                                <a
                                    href="/demos"
                                    aria-current={onDemos ? 'page' : undefined}
                                >
                                    Demos
                                </a>
                            </nav>
                            <label>
                                <Typography>Palette:</Typography>
                                <select
                                    value={palette}
                                    onChange={(e) =>
                                        changePalette(
                                            e.target.value as PaletteName
                                        )
                                    }
                                >
                                    {paletteNames.map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <IconButton
                                icon="tune"
                                aria-label="Edit design tokens"
                                aria-pressed={tokensOpen}
                                fillType={tokensOpen ? 'filled' : 'text'}
                                onClick={() => setTokensOpen(!tokensOpen)}
                            />
                            <ColorModeToggle />
                        </div>
                    }
                />
            )}
            {demoSlug === undefined && tokensOpen && (
                <TokensPanel
                    tokens={tokens}
                    onTokensChange={changeTokens}
                    onClose={() => setTokensOpen(false)}
                />
            )}
            {demoSlug !== undefined ? (
                <DemoView slug={demoSlug} />
            ) : onDemos ? (
                <main className="pg-main">
                    <DemosPage />
                </main>
            ) : (
                <div className="pg-layout">
                    <NavigationList
                        aria-label="Components"
                        className="pg-sidebar"
                    >
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
            )}
        </AnvilRoot>
    )
}

function DemoView({ slug }: { slug: string }) {
    const demo = demos[slug]
    if (!demo) {
        return (
            <main className="pg-main">
                <Typography>
                    No demo called "{slug}". <a href="/demos">Back to demos</a>
                </Typography>
            </main>
        )
    }
    const Demo = demo.component
    // Full width and the rest of the screen's height, like a real app
    return (
        <div className="pg-demo">
            <Demo />
        </div>
    )
}
