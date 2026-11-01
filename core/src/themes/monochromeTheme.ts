import { baseDarkTheme, baseLightTheme } from './baseTheme'
import { Theme } from './types'

// Black and white with neutral greys. Error, warning and success keep the
// base theme's hues so they still read as status colors.

export const monochromeLightTheme: Theme = {
    ...baseLightTheme,
    background: '#FFFFFF',
    onBackground: '#111111',
    container: '#EEEEEE',
    onContainer: '#111111',
    containerLow: '#F6F6F6',
    onContainerLow: '#474747',
    outline: '#C8C8C8',
    primary: '#000000',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E2E2E2',
    onPrimaryContainer: '#1B1B1B',
    tonal: '#E8E8E8',
    onTonal: '#3B3B3B',
    tonalContainer: '#E8E8E8',
    onTonalContainer: '#1B1B1B',
    inverseSurface: '#2A2A2A',
    inverseOnSurface: '#F2F2F2',
    inversePrimary: '#FFFFFF',
}

export const monochromeDarkTheme: Theme = {
    ...baseDarkTheme,
    background: '#0F0F0F',
    onBackground: '#E8E8E8',
    container: '#2A2A2A',
    onContainer: '#E8E8E8',
    containerLow: '#1A1A1A',
    onContainerLow: '#E8E8E8',
    outline: '#8E8E8E',
    primary: '#FFFFFF',
    onPrimary: '#000000',
    primaryContainer: '#3A3A3A',
    onPrimaryContainer: '#EDEDED',
    tonal: '#3F3F3F',
    onTonal: '#E2E2E2',
    tonalContainer: '#3F3F3F',
    onTonalContainer: '#E2E2E2',
    inverseSurface: '#E8E8E8',
    inverseOnSurface: '#2A2A2A',
    inversePrimary: '#000000',
}
