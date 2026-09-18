import { Theme } from './types'

export function themeToCssVariables(theme: Theme): Record<string, string> {
    const cssVars: Record<string, string> = {}

    for (const [key, value] of Object.entries(theme)) {
        const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        cssVars[`--avl-color-${kebabKey}`] = value
    }

    return cssVars
}
