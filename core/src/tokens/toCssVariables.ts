import { DesignTokens } from './types'

export function tokensToCssVariables(
    tokens: DesignTokens
): Record<string, string> {
    const cssVars: Record<string, string> = {}

    for (let i = 1; i <= 20; i++) {
        cssVars[`--avl-spacing-x${i}`] = `${tokens.spacing * i}px`
    }

    for (const [category, values] of Object.entries(tokens)) {
        if (category === 'spacing') continue

        for (const [key, value] of Object.entries(values)) {
            cssVars[`--avl-${category}-${key}`] = String(value)
        }
    }

    return cssVars
}
