export type ThemeMode = 'light' | 'dark'

export type Theme = {
    background: string
    onBackground: string
    container: string
    onContainer: string
    surfaceVariant: string
    onSurfaceVariant: string
    outline: string
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
}
