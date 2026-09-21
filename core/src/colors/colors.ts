export type ComponentColor =
    'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'container'

export type ComponentFillType = 'filled' | 'outlined' | 'text'

export function colorClass(
    color: ComponentColor = 'primary',
    fillType: ComponentFillType = 'filled'
) {
    return `avl-color-${color} avl-fill-${fillType} `
}
