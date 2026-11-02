export type DesignTokens = {
    spacing: number
    font: Font
    fontSize: FontSize
    radius: BorderRadius
    outlineSize: string
    /** Opacity of disabled controls. */
    disabledOpacity: string
    fontWeight: FontWeight
    shadow: Shadow
    ease: Ease
    easeLength: EaseLength
}

export type Ease = {
    /** Springy, with a slight overshoot: buttons, popups, small things. */
    out: string
    in: string
    /** No overshoot: things that slide across or in from the screen edge. */
    smooth: string
    /**
     * A spring that overshoots and wobbles before settling: playful moments
     * like the slider's squish. Pair with a longer duration.
     */
    bounce: string
}

export type EaseLength = {
    short: string
    normal: string
    slow: string
}

export type FontWeight = {
    regular: string
    medium: string
    semibold: string
    bold: string
}

/** Elevation. Use `var(--avl-color-shadow)` so the color follows the theme. */
export type Shadow = {
    small: string
    medium: string
    large: string
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
