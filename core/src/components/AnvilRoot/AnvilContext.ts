import { createContext, Dispatch, SetStateAction } from 'react'
import { Theme } from '../../themes/types'
import { DesignTokens } from '../../tokens/types'

export type ColorType = 'light' | 'dark'

type AnvilContextValues = {
    colorMode: 'light' | 'dark'
    setColorMode: Dispatch<SetStateAction<ColorType>>
    darkTheme: Theme
    lightTheme: Theme
    tokens: DesignTokens
}

export const AnvilContext = createContext<AnvilContextValues | null>(null)
