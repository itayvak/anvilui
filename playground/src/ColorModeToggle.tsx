import { useContext, useEffect } from 'react'
import { AnvilContext, IconButton } from 'anvilui'
import { storeColorMode } from './colorMode'

export function ColorModeToggle() {
    const avl = useContext(AnvilContext)
    if (!avl) throw new Error('ColorModeToggle must be used inside AnvilRoot')

    const { colorMode, setColorMode } = avl
    const isDark = colorMode === 'dark'

    useEffect(() => {
        storeColorMode(colorMode)
    }, [colorMode])

    return (
        <IconButton
            icon={isDark ? 'light_mode' : 'dark_mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            fillType="text"
            onClick={() => setColorMode(isDark ? 'light' : 'dark')}
        />
    )
}
