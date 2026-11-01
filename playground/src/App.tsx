import { useState } from 'react'
import { AnvilRoot, IconButton, Typography } from 'anvilui'
import type { DesignTokens } from 'anvilui'
import { ColorModeToggle } from './ColorModeToggle'
import { getStoredColorMode } from './colorMode'
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

const names = Object.keys(playgrounds)

// No router: the Vite dev server serves index.html for every path, so the
// page is picked from the URL once on load and links do full navigations.
const path = window.location.pathname.replace(/\/+$/, '')
const demoSlug = path.match(/^\/demos\/([^/]+)$/)?.[1]
const onDemos = path === '/demos' || demoSlug !== undefined

export default function App() {
    const [name, setName] = useState(names[0])
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
            defaultColorMode={getStoredColorMode()}
            tokens={tokens}
            lightTheme={palettes[palette].light}
            darkTheme={palettes[palette].dark}
        >
            {/* Demos are whole apps with their own bars, so no playground header */}
            {demoSlug === undefined && (
                <header className="pg-header">
                    <div className="pg-header-start">
                        <nav className="pg-nav">
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
                        {!onDemos && (
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
                        )}
                    </div>
                    <div className="pg-header-end">
                        <label>
                            <Typography>Palette:</Typography>
                            <select
                                value={palette}
                                onChange={(e) =>
                                    changePalette(e.target.value as PaletteName)
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
                </header>
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
            ) : (
                <main className="pg-main">
                    {onDemos ? <DemosPage /> : <Playground />}
                </main>
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
