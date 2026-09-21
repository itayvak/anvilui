import type {
    ComponentColor,
    ComponentFillType,
    IconProps,
    TypographyType,
} from 'anvilui'

export const colors: ComponentColor[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'container',
]

export const fillTypes: ComponentFillType[] = ['filled', 'outlined', 'text']

export const typographyTypes: TypographyType[] = [
    'body',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
]

export const sampleIcons: IconProps['name'][] = [
    'home',
    'search',
    'settings',
    'favorite',
    'delete',
    'add',
    'close',
    'check',
    'star',
    'menu',
]
