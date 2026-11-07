import { useState } from 'react'
import {
    AnvilRoot,
    AppBar,
    Button,
    IconButton,
    NavigationList,
    NavigationListItem,
    Search,
    Select,
    SelectItem,
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
    const [query, setQuery] = useState('')
    const shownNames = names.filter((n) =>
        n.toLowerCase().includes(query.trim().toLowerCase())
    )

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
                                <Button
                                    render={<a href="/" />}
                                    nativeButton={false}
                                    fillType={onDemos ? 'text' : 'filled'}
                                    color="tonal"
                                    aria-current={onDemos ? undefined : 'page'}
                                >
                                    Components
                                </Button>
                                <Button
                                    render={<a href="/demos" />}
                                    nativeButton={false}
                                    fillType={onDemos ? 'filled' : 'text'}
                                    color="tonal"
                                    aria-current={onDemos ? 'page' : undefined}
                                >
                                    Demos
                                </Button>
                            </nav>
                            <Select
                                label="Palette"
                                size="small"
                                className="pg-select"
                                value={palette}
                                onValueChange={(next) =>
                                    next && changePalette(next)
                                }
                            >
                                {paletteNames.map((n) => (
                                    <SelectItem key={n} value={n}>
                                        {n}
                                    </SelectItem>
                                ))}
                            </Select>
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
                    <div className="pg-sidebar">
                        <Search
                            aria-label="Search components"
                            placeholder="Search components"
                            color="container"
                            className="pg-sidebar-search"
                            items={[]}
                            value={query}
                            onValueChange={setQuery}
                        >
                            {() => null}
                        </Search>
                        <NavigationList
                            aria-label="Components"
                            className="pg-sidebar-list"
                        >
                            {shownNames.map((n) => (
                                <NavigationListItem
                                    key={n}
                                    label={n}
                                    href={`#${n}`}
                                    active={n === name}
                                    onClick={() => setName(n)}
                                />
                            ))}
                        </NavigationList>
                        {shownNames.length === 0 && (
                            <Typography className="pg-sidebar-empty">
                                No components match "{query.trim()}".
                            </Typography>
                        )}
                    </div>
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
                <Typography>No demo called "{slug}".</Typography>
                <Button
                    render={<a href="/demos" />}
                    nativeButton={false}
                    fillType="text"
                    startIcon="arrow_back"
                >
                    Back to demos
                </Button>
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
