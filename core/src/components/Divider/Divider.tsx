import { Separator } from '@base-ui/react/separator'
import { withClass } from '../../utils'
import './divider.css'

/**
 * A thin line between groups of content. `orientation="vertical"` stretches
 * to the height of its row, so put it in a flex row.
 */
export type DividerProps = Separator.Props

export function Divider({ className, ...props }: DividerProps) {
    return (
        <Separator {...props} className={withClass('avl-divider', className)} />
    )
}
