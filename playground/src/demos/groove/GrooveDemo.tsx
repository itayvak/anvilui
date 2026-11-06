import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import type { MaterialSymbol } from 'material-symbols'
import {
    AnvilRoot,
    AppBar,
    Avatar,
    Button,
    createThemeFromImage,
    Divider,
    FABMenu,
    FABMenuItem,
    Icon,
    IconButton,
    ListItem,
    morph,
    NavigationBar,
    NavigationBarItem,
    NavigationRail,
    NavigationRailItem,
    NavigationRailToggle,
    Popover,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
    Switch,
    Tooltip,
    Typography,
    useAnvil,
    useConfetti,
    useSnackbar,
} from 'anvilui'
import { albumById, albums, albumTheme, vibes } from './data'
import { GrooveContext, useGroove, useGrooveState, type Page } from './store'
import { DiscoverPage } from './DiscoverPage'
import { AlbumPage } from './AlbumPage'
import { LikedPage } from './LikedPage'
import { WrappedPage } from './WrappedPage'
import { PlayerBar, useSpaceToPlay } from './Player'
import './groove.css'

const pages: { id: Page; label: string; icon: MaterialSymbol }[] = [
    { id: 'discover', label: 'Discover', icon: 'explore' },
    { id: 'liked', label: 'Liked', icon: 'favorite' },
    { id: 'wrapped', label: 'Wrapped', icon: 'stars' },
]

export function GrooveDemo() {
    // The demo has its own AnvilRoot so it can re-theme itself live (album
    // colors, vibes, photos) without touching the playground around it.
    // Color mode and tokens still follow the playground's.
    const outer = useAnvil()
    const groove = useGrooveState()
    const theme =
        groove.album && groove.matchAlbum
            ? albumTheme(groove.album.id)
            : groove.homeTheme

    return (
        <AnvilRoot
            className="gr-root"
            colorMode={outer.colorModeSetting}
            onColorModeChange={outer.setColorMode}
            tokens={outer.tokens}
            lightTheme={theme.light}
            darkTheme={theme.dark}
        >
            <GrooveContext value={groove}>
                <GrooveApp />
            </GrooveContext>
        </AnvilRoot>
    )
}

function GrooveApp() {
    const g = useGroove()
    const main = useRef<HTMLElement>(null)
    const savedScroll = useRef(0)
    useSpaceToPlay(g.togglePlaying)

    // Album pages open at the top; going back returns to where you were.
    // A layout effect, so it lands before the morph takes its "after" shot.
    useLayoutEffect(() => {
        savedScroll.current = 0
        if (main.current) main.current.scrollTop = 0
    }, [g.page])
    useLayoutEffect(() => {
        if (!main.current) return
        main.current.scrollTop = g.album ? 0 : savedScroll.current
    }, [g.album])

    const back = () => {
        if (!g.album) return
        morph(g.album.morphId, () => g.setAlbum(null))
    }

    const title = g.album
        ? albumById(g.album.id).title
        : pages.find((p) => p.id === g.page)!.label

    const navItem = (p: (typeof pages)[number]) => ({
        icon: p.icon,
        label: p.label,
        active: g.page === p.id,
        href: `#${p.id}`,
        // Also leaves an open album when its page is already the current one
        onClick: () => g.setAlbum(null),
    })

    return (
        <div className="gr-app">
            <NavigationRail
                aria-label="Main"
                className="gr-wide-only"
                defaultExpanded={false}
            >
                <NavigationRailToggle aria-label="Menu" />
                {pages.map((p) => (
                    <NavigationRailItem key={p.id} {...navItem(p)} />
                ))}
            </NavigationRail>

            <div className="gr-main">
                <AppBar
                    label={title}
                    labelAs="h1"
                    start={
                        g.album ? (
                            <IconButton
                                icon="arrow_back"
                                aria-label="Back"
                                fillType="text"
                                color="container"
                                onClick={back}
                            />
                        ) : (
                            <span className="gr-logo" aria-hidden>
                                <Icon name="album" />
                            </span>
                        )
                    }
                    end={
                        <>
                            <VibePicker />
                            <ColorModeButton />
                            <Avatar
                                size="small"
                                name="Sam Rivera"
                                className="gr-me"
                            />
                        </>
                    }
                />

                <div className="gr-stage">
                    <main
                        ref={main}
                        className="gr-content"
                        onScroll={(e) => {
                            if (!g.album)
                                savedScroll.current = e.currentTarget.scrollTop
                        }}
                    >
                        {g.album ? (
                            <AlbumPage
                                key={g.album.id}
                                id={g.album.id}
                                morphId={g.album.morphId}
                            />
                        ) : g.page === 'discover' ? (
                            <DiscoverPage />
                        ) : g.page === 'liked' ? (
                            <LikedPage />
                        ) : (
                            <WrappedPage />
                        )}
                    </main>
                    {!g.album && g.page === 'discover' && <CreateMenu />}
                </div>

                <PlayerBar />

                <NavigationBar aria-label="Main" className="gr-narrow-only">
                    {pages.map((p) => (
                        <NavigationBarItem key={p.id} {...navItem(p)} />
                    ))}
                </NavigationBar>
            </div>
        </div>
    )
}

function CreateMenu() {
    const g = useGroove()
    const fire = useConfetti()
    const snackbar = useSnackbar()
    return (
        <div className="gr-fab">
            <FABMenu icon="add" aria-label="Create">
                <FABMenuItem
                    icon="playlist_add"
                    onClick={() =>
                        snackbar.show({ message: 'New playlist: “Untitled 7”' })
                    }
                >
                    New playlist
                </FABMenuItem>
                <FABMenuItem
                    icon="groups"
                    onClick={() => {
                        fire()
                        snackbar.show({
                            message: 'Jam started. Invite link copied',
                        })
                    }}
                >
                    Start a jam
                </FABMenuItem>
                <FABMenuItem
                    icon="casino"
                    color="tonal"
                    onClick={() => {
                        const album =
                            albums[Math.floor(Math.random() * albums.length)]
                        g.play(album.id, 0)
                        snackbar.show({
                            message: `Feeling lucky: ${album.title}`,
                        })
                    }}
                >
                    Surprise me
                </FABMenuItem>
            </FABMenu>
        </div>
    )
}

// Theme swaps crossfade instead of snapping
function crossfade(update: () => void) {
    if (
        !document.startViewTransition ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        update()
        return
    }
    document.startViewTransition(() => flushSync(update))
}

function VibePicker() {
    const g = useGroove()
    const snackbar = useSnackbar()
    const file = useRef<HTMLInputElement>(null)
    const [busy, setBusy] = useState(false)

    const fromPhoto = async (picked: File) => {
        setBusy(true)
        try {
            const theme = await createThemeFromImage(picked)
            if (g.vibe.kind === 'photo') URL.revokeObjectURL(g.vibe.url)
            crossfade(() =>
                g.setVibe({
                    kind: 'photo',
                    theme,
                    url: URL.createObjectURL(picked),
                })
            )
            snackbar.show({ message: 'Remixed the colors from your photo' })
        } catch {
            snackbar.show({ message: "Couldn't read that image" })
        } finally {
            setBusy(false)
        }
    }

    return (
        <Popover morph>
            <Tooltip label="Change the vibe">
                <PopoverTrigger
                    render={
                        <IconButton
                            icon="palette"
                            fillType="text"
                            color="container"
                            aria-label="Change the vibe"
                        />
                    }
                />
            </Tooltip>
            <PopoverPopup align="end" className="gr-vibe-popup">
                <PopoverTitle>Pick a vibe</PopoverTitle>
                <div className="gr-swatches" role="group" aria-label="Vibes">
                    {vibes.map((v) => (
                        <Tooltip key={v.name} label={v.name}>
                            <button
                                type="button"
                                className="gr-swatch"
                                aria-label={v.name}
                                aria-pressed={
                                    g.vibe.kind === 'preset' &&
                                    g.vibe.name === v.name
                                }
                                style={
                                    {
                                        '--gr-swatch-a': v.color,
                                        '--gr-swatch-b': v.tonal,
                                    } as CSSProperties
                                }
                                onClick={() =>
                                    crossfade(() =>
                                        g.setVibe({
                                            kind: 'preset',
                                            name: v.name,
                                        })
                                    )
                                }
                            />
                        </Tooltip>
                    ))}
                    {g.vibe.kind === 'photo' && (
                        <button
                            type="button"
                            className="gr-swatch"
                            aria-label="Your photo"
                            aria-pressed
                            style={{
                                backgroundImage: `url(${g.vibe.url})`,
                            }}
                        />
                    )}
                </div>
                <Button
                    fillType="outlined"
                    startIcon="add_photo_alternate"
                    loading={busy}
                    onClick={() => file.current?.click()}
                >
                    Remix from a photo
                </Button>
                <input
                    ref={file}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        const picked = e.target.files?.[0]
                        if (picked) fromPhoto(picked)
                        e.target.value = ''
                    }}
                />
                <Divider />
                <ListItem
                    label="Match album colors"
                    description="Album pages wear their cover's colors"
                    end={
                        <Switch
                            checked={g.matchAlbum}
                            onCheckedChange={(on) =>
                                crossfade(() => g.setMatchAlbum(on))
                            }
                        />
                    }
                    render={<label />}
                />
                <Typography type="caption" className="gr-muted">
                    Every color comes from one seed through createTheme.
                </Typography>
            </PopoverPopup>
        </Popover>
    )
}

function ColorModeButton() {
    const { colorMode, setColorMode } = useAnvil()
    const dark = colorMode === 'dark'
    return (
        <Tooltip label={dark ? 'Light mode' : 'Dark mode'}>
            <IconButton
                icon={dark ? 'light_mode' : 'dark_mode'}
                aria-label={
                    dark ? 'Switch to light mode' : 'Switch to dark mode'
                }
                fillType="text"
                color="container"
                onClick={() => setColorMode(dark ? 'light' : 'dark')}
            />
        </Tooltip>
    )
}
