import type { MaterialSymbol } from 'material-symbols'
import { createTheme, type ThemePair } from 'anvilui'

export type Mood = 'chill' | 'hype' | 'focus' | 'dreamy'

export const moods: { id: Mood; label: string }[] = [
    { id: 'chill', label: 'Chill' },
    { id: 'hype', label: 'Hype' },
    { id: 'focus', label: 'Focus' },
    { id: 'dreamy', label: 'Dreamy' },
]

export type Track = { title: string; seconds: number }

export type Album = {
    id: string
    title: string
    artist: string
    year: number
    mood: Mood
    /** Brand color of the album. The app re-themes to it on the album page. */
    color: string
    /** Second color for the cover gradient */
    accent: string
    icon: MaterialSymbol
    fresh?: boolean
    likes: number
    tracks: Track[]
}

const t = (title: string, minutes: number, seconds: number): Track => ({
    title,
    seconds: minutes * 60 + seconds,
})

export const albums: Album[] = [
    {
        id: 'sunset-arcade',
        title: 'Sunset Arcade',
        artist: 'Pixel Tides',
        year: 2026,
        mood: 'hype',
        color: '#E8590C',
        accent: '#F783AC',
        icon: 'sports_esports',
        fresh: true,
        likes: 12840,
        tracks: [
            t('Insert Coin', 3, 12),
            t('Neon Highscore', 3, 48),
            t('Boss Level Love', 4, 5),
            t('Continue? (9…8…7)', 2, 57),
            t('Credits Roll', 5, 21),
        ],
    },
    {
        id: 'moss-garden',
        title: 'Moss Garden',
        artist: 'Lumen & Fern',
        year: 2025,
        mood: 'chill',
        color: '#2B8A3E',
        accent: '#A9E34B',
        icon: 'eco',
        likes: 8311,
        tracks: [
            t('Morning Dew', 4, 2),
            t('Slow Roots', 3, 33),
            t('Rain on Leaves', 5, 10),
            t('Greenhouse', 3, 41),
        ],
    },
    {
        id: 'deep-current',
        title: 'Deep Current',
        artist: 'Abyssal',
        year: 2026,
        mood: 'focus',
        color: '#1971C2',
        accent: '#66D9E8',
        icon: 'waves',
        fresh: true,
        likes: 20467,
        tracks: [
            t('Descent', 6, 1),
            t('Pressure', 4, 44),
            t('Bioluminescence', 5, 37),
            t('Trench', 7, 2),
            t('Surface Tension', 4, 18),
        ],
    },
    {
        id: 'velvet-moon',
        title: 'Velvet Moon',
        artist: 'Nova Lark',
        year: 2024,
        mood: 'dreamy',
        color: '#7048E8',
        accent: '#E599F7',
        icon: 'dark_mode',
        likes: 15502,
        tracks: [
            t('Lullaby for Satellites', 4, 26),
            t('Cloud Static', 3, 15),
            t('Half Asleep', 4, 50),
            t('Orbit', 3, 59),
        ],
    },
    {
        id: 'citrus-riot',
        title: 'Citrus Riot',
        artist: 'The Zest',
        year: 2026,
        mood: 'hype',
        color: '#F08C00',
        accent: '#FFE066',
        icon: 'local_fire_department',
        fresh: true,
        likes: 9930,
        tracks: [
            t('Squeeze', 2, 41),
            t('Pulp Fiction (Not That One)', 3, 3),
            t('Vitamin Sea', 3, 28),
            t('Sour Patch', 2, 55),
        ],
    },
    {
        id: 'paper-planes',
        title: 'Paper Planes',
        artist: 'Origami Club',
        year: 2025,
        mood: 'chill',
        color: '#C2255C',
        accent: '#FFA8A8',
        icon: 'flight',
        likes: 6120,
        tracks: [
            t('Fold Here', 3, 20),
            t('Tailwind', 3, 52),
            t('Window Seat', 4, 14),
            t('Landing Gear', 3, 7),
        ],
    },
    {
        id: 'quiet-hours',
        title: 'Quiet Hours',
        artist: 'Desk Lamp',
        year: 2024,
        mood: 'focus',
        color: '#5C7CFA',
        accent: '#B197FC',
        icon: 'local_cafe',
        likes: 11208,
        tracks: [
            t('Pomodoro', 25, 0),
            t('Inbox Zero', 4, 30),
            t('Second Coffee', 3, 45),
            t('Deep Work', 6, 12),
        ],
    },
    {
        id: 'starlight-motel',
        title: 'Starlight Motel',
        artist: 'Vacancy',
        year: 2026,
        mood: 'dreamy',
        color: '#0C8599',
        accent: '#FCC2D7',
        icon: 'nightlife',
        likes: 7745,
        tracks: [
            t('Neon Sign', 3, 58),
            t('Pool at 2 AM', 4, 33),
            t('Ice Machine', 3, 11),
            t('Checkout Time', 5, 2),
        ],
    },
]

export const albumById = (id: string) => albums.find((a) => a.id === id)!

// Built once: createTheme does color math
const albumThemes = new Map<string, ThemePair>(
    albums.map((a) => [a.id, createTheme(a.color, { tonal: a.accent })])
)
export const albumTheme = (id: string) => albumThemes.get(id)!

export type Vibe = { name: string; color: string; tonal: string }

export const vibes: Vibe[] = [
    { name: 'Grape soda', color: '#6750A4', tonal: '#B4A0E5' },
    { name: 'Bubblegum', color: '#D6336C', tonal: '#FCC2D7' },
    { name: 'Lagoon', color: '#0B7285', tonal: '#63E6BE' },
    { name: 'Tangerine', color: '#E8590C', tonal: '#FFD43B' },
    { name: 'Matcha', color: '#5C940D', tonal: '#C0EB75' },
    { name: 'Midnight', color: '#364FC7', tonal: '#91A7FF' },
]

const vibeThemes = new Map<string, ThemePair>(
    vibes.map((v) => [v.name, createTheme(v.color, { tonal: v.tonal })])
)
export const vibeTheme = (name: string) => vibeThemes.get(name)!

export const friends = [
    'Maya Chen',
    'Leo Okafor',
    'Priya Raman',
    'Jonas Berg',
    'Sofia Alvarez',
    'Kenji Watanabe',
    'Amara Diallo',
]

export const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds))
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export type Period = '2026' | '2025' | 'all'

export type Stats = {
    minutes: number
    songs: number
    artists: number
    /** Share of listening per genre, in percent */
    genres: Record<string, number>
    topAlbum: string
    topMinutes: number
}

// Made-up listening stats for the Wrapped page
export const wrapped: Record<Period, Stats> = {
    '2026': {
        minutes: 48213,
        songs: 3172,
        artists: 412,
        genres: { Ambient: 38, Synthwave: 27, 'Lo-fi': 19, 'Dream pop': 16 },
        topAlbum: 'deep-current',
        topMinutes: 6204,
    },
    '2025': {
        minutes: 39577,
        songs: 2604,
        artists: 355,
        genres: { Ambient: 21, Synthwave: 44, 'Lo-fi': 25, 'Dream pop': 10 },
        topAlbum: 'sunset-arcade',
        topMinutes: 5110,
    },
    all: {
        minutes: 162940,
        songs: 9815,
        artists: 1187,
        genres: { Ambient: 29, Synthwave: 31, 'Lo-fi': 24, 'Dream pop': 16 },
        topAlbum: 'velvet-moon',
        topMinutes: 18342,
    },
}
