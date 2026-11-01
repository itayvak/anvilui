import {
    baseDarkTheme,
    baseLightTheme,
    monochromeDarkTheme,
    monochromeLightTheme,
} from 'anvilui'
import type { Theme } from 'anvilui'
import {
    arcadeDarkTheme,
    arcadeLightTheme,
    candyDarkTheme,
    candyLightTheme,
    oceanDarkTheme,
    oceanLightTheme,
    sunsetDarkTheme,
    sunsetLightTheme,
} from './themes'

export const palettes = {
    Purple: { light: baseLightTheme, dark: baseDarkTheme },
    'Black & white': { light: monochromeLightTheme, dark: monochromeDarkTheme },
    Candy: { light: candyLightTheme, dark: candyDarkTheme },
    Ocean: { light: oceanLightTheme, dark: oceanDarkTheme },
    Sunset: { light: sunsetLightTheme, dark: sunsetDarkTheme },
    Arcade: { light: arcadeLightTheme, dark: arcadeDarkTheme },
} satisfies Record<string, { light: Theme; dark: Theme }>

export type PaletteName = keyof typeof palettes
export const paletteNames = Object.keys(palettes) as PaletteName[]

const storageKey = 'anvilui-playground-palette'

export function getStoredPalette(): PaletteName {
    try {
        const stored = localStorage.getItem(storageKey)
        if (stored && stored in palettes) return stored as PaletteName
    } catch {
        // Storage can be blocked (private mode, disabled cookies).
    }
    return 'Purple'
}

export function storePalette(palette: PaletteName) {
    try {
        localStorage.setItem(storageKey, palette)
    } catch {
        // Not being able to remember the palette is not worth surfacing.
    }
}
