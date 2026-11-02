import { Theme } from './types'

export function themeToCssVariables(theme: Theme): Record<string, string> {
    const cssVars: Record<string, string> = {}

    // The inverse, shadow and scrim roles are optional; themes without them get the page's
    // colors swapped, so existing themes keep working
    // Themes written before the rename still work: their surfaceVariant
    // pair stands in for surface
    const { surfaceVariant, onSurfaceVariant, ...rest } = theme
    const filled: Theme = {
        inverseSurface: theme.onBackground,
        inverseOnSurface: theme.background,
        inversePrimary: `color-mix(in srgb, ${theme.primary} 55%, ${theme.background})`,
        shadow: 'rgb(0 0 0 / 0.3)',
        scrim: 'rgb(0 0 0 / 0.4)',
        ...rest,
        surface: rest.surface ?? surfaceVariant,
        onSurface: rest.onSurface ?? onSurfaceVariant,
    }

    for (const [key, value] of Object.entries(filled)) {
        if (value === undefined) continue
        const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        cssVars[`--avl-color-${kebabKey}`] = value
    }

    // The old variable names, for custom CSS written before the rename
    cssVars['--avl-color-surface-variant'] = 'var(--avl-color-surface)'
    cssVars['--avl-color-on-surface-variant'] = 'var(--avl-color-on-surface)'

    return cssVars
}
