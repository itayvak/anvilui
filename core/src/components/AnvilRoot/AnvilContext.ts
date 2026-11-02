import {
    createContext,
    Dispatch,
    RefObject,
    SetStateAction,
    useContext,
} from 'react'
import { Theme } from '../../themes/types'
import { DesignTokens } from '../../tokens/types'

/** The mode actually shown. */
export type ColorType = 'light' | 'dark'
/** What the user picked; `'system'` follows the OS setting live. */
export type ColorModeSetting = ColorType | 'system'

type AnvilContextValues = {
    /** The mode being shown, with `'system'` already resolved. */
    colorMode: ColorType
    /** What was picked, which may be `'system'`. */
    colorModeSetting: ColorModeSetting
    setColorMode: Dispatch<SetStateAction<ColorModeSetting>>
    darkTheme: Theme
    lightTheme: Theme
    tokens: DesignTokens
    // The element that carries the theme variables. Portaled components (menus,
    // dialogs, ...) render into it, since `body` sits outside the theme.
    rootRef: RefObject<HTMLDivElement | null>
}

export const AnvilContext = createContext<AnvilContextValues | null>(null)

/** The current color mode, its setter, themes and tokens. Must be used inside `AnvilRoot`. */
export function useAnvil() {
    const avl = useContext(AnvilContext)
    if (!avl) throw new Error('useAnvil must be used inside AnvilRoot')
    return avl
}
