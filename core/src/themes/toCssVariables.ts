import { Theme } from './types'

export function themeToCssVariables(theme: Theme): Record<string, string> {
    const cssVars: Record<string, string> = {}

    // The inverse, shadow and scrim roles are optional; themes without them get the page's
    // colors swapped, so existing themes keep working
    const filled: Theme = {
        inverseSurface: theme.onBackground,
        inverseOnSurface: theme.background,
        inversePrimary: `color-mix(in srgb, ${theme.primary} 55%, ${theme.background})`,
        shadow: 'rgb(0 0 0 / 0.3)',
        scrim: 'rgb(0 0 0 / 0.4)',
        ...theme,
    }

    for (const [key, value] of Object.entries(filled)) {
        if (value === undefined) continue
        const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        cssVars[`--avl-color-${kebabKey}`] = value
    }

    return cssVars
}
