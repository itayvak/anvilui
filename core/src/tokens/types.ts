export type DesignTokens = {
    spacing: number
    font: Font
    fontSize: FontSize
    radius: BorderRadius
    outlineSize: string
    ease: Ease
    easeLength: EaseLength
}

export type Ease = {
    /** Springy, with a slight overshoot: buttons, popups, small things. */
    out: string
    in: string
    /** No overshoot: things that slide across or in from the screen edge. */
    smooth: string
}

export type EaseLength = {
    short: string
    normal: string
    slow: string
}

export type Font = {
    main: string
    title: string
    mono: string
}

export type FontSize = {
    body: string
    caption: string
    labelSmall: string
    label: string
    labelLarge: string
    h1: string
    h2: string
    h3: string
    h4: string
    h5: string
    h6: string
}

export type BorderRadius = {
    small: string
    medium: string
    large: string
    button: string
    full: string
}
