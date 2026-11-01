import {
    CSSProperties,
    Dispatch,
    ReactNode,
    SetStateAction,
    useRef,
    useState,
} from 'react'
import { Toast } from '@base-ui/react/toast'
import { Tooltip } from '@base-ui/react/tooltip'
import { SnackbarViewport } from '../Snackbar/Snackbar'
import { AnvilContext, ColorType } from './AnvilContext'
import { baseDarkTheme, baseLightTheme } from '../../themes/baseTheme'
import { Theme } from '../../themes/types'
import { themeToCssVariables } from '../../themes/toCssVariables'
import { DesignTokens } from '../../tokens/types'
import { baseDesignTokens } from '../../tokens/baseTokens'
import { tokensToCssVariables } from '../../tokens/toCssVariables'
import '../../colors/colors.css'
import './global.css'

export type AnvilRootProps = {
    children: ReactNode
    /** Controlled color mode. Pair with `onColorModeChange`. */
    colorMode?: ColorType
    /** Starting color mode when `colorMode` isn't controlled. */
    defaultColorMode?: ColorType
    onColorModeChange?: (colorMode: ColorType) => void
    lightTheme?: Theme
    darkTheme?: Theme
    tokens?: DesignTokens
}

export function AnvilRoot(props: AnvilRootProps) {
    const [internalColorMode, setInternalColorMode] = useState<ColorType>(
        props.defaultColorMode || 'light'
    )
    const colorMode = props.colorMode ?? internalColorMode
    const setColorMode: Dispatch<SetStateAction<ColorType>> = (next) => {
        const value = typeof next === 'function' ? next(colorMode) : next
        setInternalColorMode(value)
        props.onColorModeChange?.(value)
    }
    const tokens = props.tokens || baseDesignTokens
    const lightTheme = props.lightTheme || baseLightTheme
    const darkTheme = props.darkTheme || baseDarkTheme
    const activeTheme = colorMode === 'light' ? lightTheme : darkTheme
    const rootRef = useRef<HTMLDivElement>(null)

    const cssVars = {
        ...tokensToCssVariables(tokens),
        ...themeToCssVariables(activeTheme),
    }

    return (
        <AnvilContext
            value={{
                colorMode,
                setColorMode,
                tokens,
                lightTheme,
                darkTheme,
                rootRef,
            }}
        >
            <div
                ref={rootRef}
                className="avl-root"
                style={cssVars as CSSProperties}
            >
                {/* Lets the pointer move between tooltips without waiting
                    out the open delay each time */}
                <Tooltip.Provider>
                    {/* Up to 3 snackbars stack; a 4th pushes the oldest out */}
                    <Toast.Provider limit={3}>
                        {props.children}
                        <SnackbarViewport />
                    </Toast.Provider>
                </Tooltip.Provider>
            </div>
        </AnvilContext>
    )
}
