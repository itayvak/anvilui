// Development-only checks for setup mistakes. Each message says what's
// wrong, shows the fix, and names the doc page in the installed package.
// Every call site is wrapped in `process.env.NODE_ENV !== 'production'`,
// which bundlers replace, so all of this drops out of production builds.

const reported = new Set<string>()

/** Logs once per distinct message, so a list of 100 items logs one error. */
export function devError(message: string, fix: string, doc: string) {
    const text =
        `[anvilui] ${message}\n\nFix:\n${fix}\n\n` +
        `Docs: node_modules/anvilui/docs/${doc}`
    if (reported.has(text)) return
    reported.add(text)
    console.error(text)
}

/** Base UI's `render` prop replaces Radix-style `asChild`. */
export function checkAsChild(
    props: object,
    component: string,
    doc: string,
    fix = `<${component} render={<Button />}>Open</${component}>`
) {
    if (!('asChild' in props)) return
    devError(
        `<${component}> has no \`asChild\` prop. AnvilUI uses Base UI's \`render\` prop instead.`,
        fix,
        doc
    )
}

/** A prop name borrowed from another library (`variant`, `label`, ...). */
export function checkProp(
    props: object,
    prop: string,
    component: string,
    instead: string,
    fix: string,
    doc: string
) {
    if (!(prop in props)) return
    devError(`<${component}> has no \`${prop}\` prop. ${instead}`, fix, doc)
}

export const POPUP_OUTSIDE_ROOT =
    'Its popup portals to <body>, outside the theme, so it shows unstyled.'
export const OUTSIDE_ROOT =
    'The theme variables only exist inside AnvilRoot, so it shows without colors, spacing or fonts.'

/** Components need AnvilRoot for the theme and as the portal target. */
export function checkRoot(
    found: boolean,
    component: string,
    reason = POPUP_OUTSIDE_ROOT
) {
    if (found) return
    devError(
        `<${component}> is rendered outside <AnvilRoot>. ${reason}`,
        `import { AnvilRoot } from 'anvilui'\nimport 'anvilui/styles.css'\n\n<AnvilRoot>\n    <App />\n</AnvilRoot>`,
        'setup.md'
    )
}

/** For controls with no visible text: their name must come from aria-label. */
export function checkName(
    props: { 'aria-label'?: unknown; 'aria-labelledby'?: unknown },
    component: string,
    example: string,
    doc: string
) {
    if (props['aria-label'] || props['aria-labelledby']) return
    devError(
        `<${component}> has no accessible name. It shows no text, so screen readers need an \`aria-label\`.`,
        example,
        doc
    )
}
