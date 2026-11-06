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
    /** Changes the color mode, like a `useState` setter. Saved under `storageKey` if set. */
    setColorMode: Dispatch<SetStateAction<ColorModeSetting>>
    /** The theme used in dark mode. */
    darkTheme: Theme
    /** The theme used in light mode. */
    lightTheme: Theme
    /** The design tokens in use, defaults filled in. */
    tokens: DesignTokens
    // The element that carries the theme variables. Portaled components (menus,
    // dialogs, ...) render into it, since `body` sits outside the theme.
    rootRef: RefObject<HTMLDivElement | null>
}

/** The raw context behind `useAnvil()`: `null` outside AnvilRoot. Prefer `useAnvil()`. */
export const AnvilContext = createContext<AnvilContextValues | null>(null)

/**
 * The current color mode, its setter, themes and tokens. Must be used inside
 * `AnvilRoot`.
 *
 * @example
 * const { colorMode, setColorMode } = useAnvil()
 * <Switch checked={colorMode === 'dark'} onCheckedChange={(dark) => setColorMode(dark ? 'dark' : 'light')} />
 */
export function useAnvil() {
    const avl = useContext(AnvilContext)
    if (!avl)
        throw new Error(
            '[anvilui] useAnvil() was called outside <AnvilRoot>.\n\n' +
                'Fix: call it from a component rendered inside <AnvilRoot>, not in the component that renders AnvilRoot:\n' +
                '<AnvilRoot><App /></AnvilRoot>   // useAnvil() inside App works\n\n' +
                'Docs: node_modules/anvilui/docs/theming.md'
        )
    return avl
}
