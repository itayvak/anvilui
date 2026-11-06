import type { MaterialSymbol } from 'material-symbols'
import 'material-symbols/rounded.css'
import { cx } from '../../utils'
import './icon.css'

export type IconProps = Omit<React.ComponentProps<'span'>, 'children'> & {
    /**
     * Material Symbols (Rounded) name in snake_case, e.g. `'home'`,
     * `'arrow_back'`, `'more_vert'`. Browse them at fonts.google.com/icons.
     */
    name: MaterialSymbol
}

/**
 * A Material Symbols icon. It's hidden from screen readers unless you give
 * it an `aria-label`. Size follows `font-size`, color follows `color`.
 * Other components take icon names directly (`startIcon="add"`), so you
 * rarely need this.
 *
 * @example
 * <Icon name="favorite" />
 * <Icon name="warning" aria-label="Warning" style={{ fontSize: 32 }} />
 */
export function Icon({ name, ...props }: IconProps) {
    const labelled = props['aria-label'] || props['aria-labelledby']

    return (
        <span
            aria-hidden={labelled ? undefined : true}
            role={labelled ? 'img' : undefined}
            {...props}
            className={cx('avl-icon material-symbols-rounded', props.className)}
        >
            {name}
        </span>
    )
}
