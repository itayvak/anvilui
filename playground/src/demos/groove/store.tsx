import { createContext, useContext, useEffect, useState } from 'react'
import type { ThemePair } from 'anvilui'
import { albumById, vibeTheme, vibes } from './data'

export type Page = 'discover' | 'liked' | 'wrapped'

const isPage = (v: string): v is Page =>
    v === 'discover' || v === 'liked' || v === 'wrapped'

const pageFromHash = (): Page => {
    const hash = window.location.hash.slice(1)
    return isPage(hash) ? hash : 'discover'
}

// The page lives in the URL hash, so reloads and back/forward work
function usePage() {
    const [page, setPage] = useState(pageFromHash)
    useEffect(() => {
        const onChange = () => setPage(pageFromHash())
        window.addEventListener('hashchange', onChange)
        return () => window.removeEventListener('hashchange', onChange)
    }, [])
    return page
}

/** The album page that's open, and the card it morphed out of. */
export type OpenAlbum = { id: string; morphId: string }

export type Player = {
    albumId: string
    track: number
    playing: boolean
    /** Seconds into the track */
    position: number
}

export type HomeVibe =
    | { kind: 'preset'; name: string }
    | { kind: 'photo'; theme: ThemePair; url: string }

export function useGrooveState() {
    const page = usePage()
    const [album, setAlbum] = useState<OpenAlbum | null>(null)
    const [vibe, setVibe] = useState<HomeVibe>({
        kind: 'preset',
        name: vibes[0].name,
    })
    const [matchAlbum, setMatchAlbum] = useState(true)
    const [likedAlbums, setLikedAlbums] = useState<string[]>(['velvet-moon'])
    // "albumId:trackIndex"
    const [likedTracks, setLikedTracks] = useState<string[]>([
        'deep-current:2',
        'moss-garden:0',
        'sunset-arcade:1',
    ])
    const [player, setPlayer] = useState<Player>({
        albumId: 'deep-current',
        track: 2,
        playing: false,
        position: 74,
    })

    // Fake playback: one tick a second, then on to the next track
    useEffect(() => {
        if (!player.playing) return
        const timer = setInterval(() => {
            setPlayer((p) => {
                const tracks = albumById(p.albumId).tracks
                if (p.position + 1 < tracks[p.track].seconds)
                    return { ...p, position: p.position + 1 }
                return {
                    ...p,
                    track: (p.track + 1) % tracks.length,
                    position: 0,
                }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [player.playing])

    const toggle = (list: string[], item: string) =>
        list.includes(item) ? list.filter((i) => i !== item) : [...list, item]

    return {
        page,
        setPage: (next: Page) => {
            setAlbum(null)
            window.location.hash = next
        },
        album,
        setAlbum,
        vibe,
        setVibe,
        matchAlbum,
        setMatchAlbum,
        likedAlbums,
        toggleAlbumLike: (id: string) =>
            setLikedAlbums((list) => toggle(list, id)),
        likedTracks,
        setLikedTracks,
        toggleTrackLike: (key: string) =>
            setLikedTracks((list) => toggle(list, key)),
        player,
        setPlayer,
        play: (albumId: string, track: number) =>
            setPlayer({ albumId, track, playing: true, position: 0 }),
        togglePlaying: () => setPlayer((p) => ({ ...p, playing: !p.playing })),
        skip: (by: 1 | -1) =>
            setPlayer((p) => {
                const count = albumById(p.albumId).tracks.length
                return {
                    ...p,
                    track: (p.track + by + count) % count,
                    position: 0,
                }
            }),
        seek: (position: number) => setPlayer((p) => ({ ...p, position })),
        /** The picked vibe's colors, worn everywhere but album pages */
        homeTheme: (vibe.kind === 'photo'
            ? vibe.theme
            : vibeTheme(vibe.name)) satisfies ThemePair,
    }
}

export type GrooveState = ReturnType<typeof useGrooveState>

export const GrooveContext = createContext<GrooveState | null>(null)

export function useGroove() {
    return useContext(GrooveContext)!
}
