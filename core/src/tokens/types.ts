export type DesignTokens = {
    spacing: number
    font: Font
    fontSize: FontSize
    radius: BorderRadius
    outlineSize: string
    ease: Ease
}

export type Ease = {
    out: string
    in: string
}

export type Font = {
    main: string
    title: string
    mono: string
}

export type FontSize = {
    body: string
    caption: string
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
    full: '1000px'
}
