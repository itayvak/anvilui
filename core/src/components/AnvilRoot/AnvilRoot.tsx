import { CSSProperties, ReactNode, useState } from 'react'
import { AnvilContext, ColorType } from './AnvilContext'
import { baseDarkTheme, baseLightTheme } from '../../themes/baseTheme'
import { Theme } from '../../themes/types'
import { themeToCssVariables } from '../../themes/toCssVariables'
import { DesignTokens } from '../../tokens/types'
import { baseDesignTokens } from '../../tokens/baseTokens'
import { tokensToCssVariables } from '../../tokens/toCssVariables'
import './global.css'

export type AnvilRootProps = {
    children: ReactNode
    colorMode?: ColorType
    lightTheme: Theme | null
    darkTheme: Theme | null
    tokens: DesignTokens | null
}

export function AnvilRoot(props: AnvilRootProps) {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>(
        props.colorMode || 'light'
    )
    const tokens = props.tokens || baseDesignTokens
    const lightTheme = props.lightTheme || baseLightTheme
    const darkTheme = props.darkTheme || baseDarkTheme
    const activeTheme = colorMode === 'light' ? lightTheme : darkTheme

    const cssVars = {
        ...tokensToCssVariables(tokens),
        ...themeToCssVariables(activeTheme),
    }

    console.log(cssVars)

    return (
        <AnvilContext
            value={{
                colorMode,
                setColorMode,
                tokens,
                lightTheme,
                darkTheme,
            }}
        >
            <div className="avl-root" style={cssVars as CSSProperties}>
                {props.children}
            </div>
        </AnvilContext>
    )
}
