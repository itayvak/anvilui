import { IconButton, useAnvil } from 'anvilui'

export function ColorModeToggle() {
    const { colorMode, setColorMode } = useAnvil()
    const isDark = colorMode === 'dark'

    return (
        <IconButton
            icon={isDark ? 'light_mode' : 'dark_mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            fillType="text"
            onClick={() => setColorMode(isDark ? 'light' : 'dark')}
        />
    )
}
