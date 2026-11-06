/**
 * A color role from the theme. `primary` is the brand color, `tonal` a
 * softer accent for selected and secondary actions, `container` the neutral
 * one (use it for "secondary" or "default" buttons), and `surface` the
 * background of navigation and popups. There is no `secondary`, `danger` or
 * `destructive`: use `tonal` or `container`, and `error`.
 */
export type ComponentColor =
    | 'primary'
    | 'tonal'
    | 'success'
    | 'warning'
    | 'error'
    | 'container'
    | 'surface'

/**
 * How a color is applied. Takes the place of the `variant` prop other
 * libraries use.
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
