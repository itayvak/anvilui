export type ThemeMode = 'light' | 'dark'

export type Theme = {
    background: string
    onBackground: string
    /** Secondary text on `background`: descriptions, placeholders, hints. */
    onBackgroundMuted: string
    container: string
    onContainer: string
    surface: string
    onSurface: string
    /** Borders of inputs and outlined controls. */
    outline: string
    /** Thin lines between content: dividers, table lines, tab underlines. */
    divider: string
    primary: string
    onPrimary: string
    primaryContainer: string
    onPrimaryContainer: string
    secondary: string
    onSecondary: string
    secondaryContainer: string
    onSecondaryContainer: string
    error: string
    onError: string
    errorContainer: string
    onErrorContainer: string
    warning: string
    onWarning: string
    warningContainer: string
    onWarningContainer: string
    success: string
    onSuccess: string
    successContainer: string
    onSuccessContainer: string
    /**
     * Surfaces that stand out by inverting the page's colors: tooltips,
     * snackbars, the slider's value bubble. Defaults to `onBackground`.
     */
    inverseSurface?: string
    /** Text on `inverseSurface`. Defaults to `background`. */
    inverseOnSurface?: string
    /**
     * Accents on `inverseSurface`, like a snackbar's action. Defaults to
     * `primary` mixed toward `background`, which is readable but approximate.
     */
    inversePrimary?: string
    /** Color of elevation shadows, alpha included. Defaults to black at 30%. */
    shadow?: string
    /** The dimmed backdrop behind dialogs and sheets. Defaults to black at 40%. */
    scrim?: string
}
