import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react'
import { Toast } from '@base-ui/react/toast'
import { Tooltip } from '@base-ui/react/tooltip'
import { SnackbarViewport } from '../Snackbar/Snackbar'
import { AnvilContext, ColorModeSetting, ColorType } from './AnvilContext'
import { baseDarkTheme, baseLightTheme } from '../../themes/baseTheme'
import { Theme } from '../../themes/types'
import { themeToCssVariables } from '../../themes/toCssVariables'
import { DesignTokens } from '../../tokens/types'
import { baseDesignTokens } from '../../tokens/baseTokens'
import { tokensToCssVariables } from '../../tokens/toCssVariables'
import { cx } from '../../utils'
import '../../colors/colors.css'
import './global.css'

export type AnvilRootProps = {
    children: ReactNode
    /** Extra classes for the root element, e.g. to make it fill the viewport. */
    className?: string
    /** Controlled color mode. Pair with `onColorModeChange`. */
    colorMode?: ColorModeSetting
    /**
     * Starting color mode when `colorMode` isn't controlled and nothing is
     * saved under `storageKey`. `'system'` follows the OS setting live.
     * @default 'system'
     */
    defaultColorMode?: ColorModeSetting
    /** Called whenever the color mode is changed. */
    onColorModeChange?: (colorMode: ColorModeSetting) => void
    /**
     * When set, the color mode is saved in `localStorage` under this key and
     * restored on the next visit. With server rendering, a small inline script
     * applies it before the first paint, so there's no flash (a strict CSP
     * must allow inline scripts for that).
     */
    storageKey?: string
    /** Colors used in light mode. @default baseLightTheme */
    lightTheme?: Theme
    /** Colors used in dark mode. @default baseDarkTheme */
    darkTheme?: Theme
    /**
     * Spacing, radius, font, motion and shadow tokens. Categories you pass
     * replace the base ones; the rest keep their defaults.
     * @default baseDesignTokens
     */
    tokens?: Partial<DesignTokens>
}

const isSetting = (v: unknown): v is ColorModeSetting =>
    v === 'light' || v === 'dark' || v === 'system'

function readStored(key: string): ColorModeSetting | undefined {
    try {
        const stored = localStorage.getItem(key)
        if (isSetting(stored)) return stored
    } catch {
        // Storage can be blocked (private mode, disabled cookies)
    }
}

const darkQuery = '(prefers-color-scheme: dark)'

function subscribeToOs(onChange: () => void) {
    const query = matchMedia(darkQuery)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
}

const getOsMode = (): ColorType =>
    matchMedia(darkQuery).matches ? 'dark' : 'light'

const declarations = (vars: Record<string, string>) =>
    Object.entries(vars)
        .map(([name, value]) => `${name}:${value};`)
        .join('')

/**
 * Provides the theme to everything inside it. Only the root's own box is
 * themed; to color the whole page, make it fill the viewport via `className`.
 */
export function AnvilRoot(props: AnvilRootProps) {
    // Server and first client render agree on this; the saved value is
    // applied right after (and before paint by the inline script on SSR)
    const [internalSetting, setInternalSetting] = useState<ColorModeSetting>(
        props.defaultColorMode ?? 'system'
    )
    const setting = props.colorMode ?? internalSetting
    const osMode = useSyncExternalStore<ColorType>(
        subscribeToOs,
        getOsMode,
        () => 'light'
    )
    const colorMode: ColorType = setting === 'system' ? osMode : setting

    // Function updates resolve against this, so two calls in one tick both apply
    const latestSetting = useRef(setting)
    latestSetting.current = setting

    useLayoutEffect(() => {
        if (!props.storageKey) return
        const stored = readStored(props.storageKey)
        if (stored) {
            latestSetting.current = stored
            setInternalSetting(stored)
        }
    }, [props.storageKey])

    const setColorMode: Dispatch<SetStateAction<ColorModeSetting>> = (next) => {
        const value =
            typeof next === 'function' ? next(latestSetting.current) : next
        latestSetting.current = value
        setInternalSetting(value)
        props.onColorModeChange?.(value)
        if (props.storageKey) {
            try {
                localStorage.setItem(props.storageKey, value)
            } catch {
                // Not being able to remember the mode is not worth surfacing
            }
        }
    }

    const tokens: DesignTokens = { ...baseDesignTokens, ...props.tokens }
    const lightTheme = props.lightTheme || baseLightTheme
    const darkTheme = props.darkTheme || baseDarkTheme
    const rootRef = useRef<HTMLDivElement>(null)

    // The colors live in CSS, not inline styles, so the right mode shows
    // before any JavaScript runs: `system` resolves through a media query,
    // and a saved mode is set on data-color-mode by the inline script below
    const id = useId()
    const root = `[data-avl-root="${id}"]`
    const light = `color-scheme:light;${declarations(themeToCssVariables(lightTheme))}`
    const dark = `color-scheme:dark;${declarations(themeToCssVariables(darkTheme))}`
    const css =
        `${root}{${declarations(tokensToCssVariables(tokens))}${light}}` +
        `${root}[data-color-mode="dark"]{${dark}}` +
        `@media ${darkQuery}{${root}[data-color-mode="system"]{${dark}}}`

    const restoreScript =
        props.storageKey && props.colorMode === undefined
            ? `try{var m=localStorage.getItem(${JSON.stringify(props.storageKey)});` +
              `if(m==='light'||m==='dark'||m==='system')document.currentScript.parentElement.dataset.colorMode=m}catch(e){}`
            : undefined

    return (
        <AnvilContext
            value={{
                colorMode,
                colorModeSetting: setting,
                setColorMode,
                tokens,
                lightTheme,
                darkTheme,
                rootRef,
            }}
        >
            <div
                ref={rootRef}
                className={cx('avl-root', props.className)}
                data-avl-root={id}
                data-color-mode={setting}
                // The inline script may change data-color-mode before hydration
                suppressHydrationWarning
            >
                {restoreScript && (
                    <script
                        // Only server HTML needs it to run; on the client a
                        // non-JS type keeps React from warning about it
                        type={
                            typeof window === 'undefined'
                                ? undefined
                                : 'text/plain'
                        }
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{ __html: restoreScript }}
                    />
                )}
                <style>{css}</style>
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
