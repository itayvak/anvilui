import { baseDesignTokens, type DesignTokens } from 'anvilui'

const storageKey = 'anvilui-playground-tokens'

// Stored edits are laid over the base tokens one category at a time, so a
// token added to the library later still gets its default.
export function getStoredTokens(): DesignTokens {
    try {
        const stored = JSON.parse(localStorage.getItem(storageKey) ?? '{}')
        const tokens: Record<string, unknown> = { ...baseDesignTokens }
        for (const [key, base] of Object.entries(baseDesignTokens)) {
            if (!(key in stored)) continue
            tokens[key] =
                typeof base === 'object'
                    ? { ...base, ...stored[key] }
                    : stored[key]
        }
        return tokens as DesignTokens
    } catch {
        // Blocked storage or a broken value: start from the defaults.
        return baseDesignTokens
    }
}

export function storeTokens(tokens: DesignTokens) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(tokens))
    } catch {
        // Not being able to remember the tokens is not worth surfacing.
    }
}
