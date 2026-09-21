import { createContext, Dispatch, RefObject, SetStateAction } from 'react'
import { Theme } from '../../themes/types'
import { DesignTokens } from '../../tokens/types'

export type ColorType = 'light' | 'dark'

type AnvilContextValues = {
    colorMode: 'light' | 'dark'
    setColorMode: Dispatch<SetStateAction<ColorType>>
    darkTheme: Theme
    lightTheme: Theme
    tokens: DesignTokens
    // The element that carries the theme variables. Portaled components (menus,
    // dialogs, ...) render into it, since `body` sits outside the theme.
    rootRef: RefObject<HTMLDivElement | null>
}

export const AnvilContext = createContext<AnvilContextValues | null>(null)
