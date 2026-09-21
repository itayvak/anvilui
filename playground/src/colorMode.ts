import type { ColorType } from 'anvilui'

const storageKey = 'anvilui-playground-color-mode'

export function getStoredColorMode(): ColorType {
    try {
        const stored = localStorage.getItem(storageKey)
        if (stored === 'light' || stored === 'dark') return stored
    } catch {
        // Storage can be blocked (private mode, disabled cookies).
    }
    return 'light'
}

export function storeColorMode(colorMode: ColorType) {
    try {
        localStorage.setItem(storageKey, colorMode)
    } catch {
        // Not being able to remember the mode is not worth surfacing.
    }
}
