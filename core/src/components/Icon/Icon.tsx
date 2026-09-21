import type { MaterialSymbol } from 'material-symbols'
import 'material-symbols/rounded.css'
import './icon.css'

export type IconProps = Omit<React.ComponentProps<'span'>, 'children'> & {
    name: MaterialSymbol
}

export function Icon({ name, ...props }: IconProps) {
    const labelled = props['aria-label'] || props['aria-labelledby']

    return (
        <span
            aria-hidden={labelled ? undefined : true}
            role={labelled ? 'img' : undefined}
            {...props}
            className="avl-icon material-symbols-rounded"
        >
            {name}
        </span>
    )
}
