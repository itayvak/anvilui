/**
 * A color role from the theme. `container` is the neutral one; `surface` is
 * the background of navigation and popups, like
 * `NavigationRail` and `NavigationList`.
 */
export type ComponentColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'container'
    | 'surface'

/**
 * - `filled`: solid background in the color
 * - `outlined`: transparent with a border, text in the color
 * - `text`: transparent, no border, text in the color
 */
export type ComponentFillType = 'filled' | 'outlined' | 'text'

/** The `color` and `fillType` props shared by colored components. */
export type ColorProps = {
    /** Color role from the theme. @default 'primary' */
    color?: ComponentColor
    /** How the color is applied. @default 'filled' */
    fillType?: ComponentFillType
}

export function colorClass(
    color: ComponentColor = 'primary',
    fillType: ComponentFillType = 'filled'
) {
    return `avl-color-${color} avl-fill-${fillType} `
}
