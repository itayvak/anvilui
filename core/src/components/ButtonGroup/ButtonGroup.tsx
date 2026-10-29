import { cx } from '../../utils'
import './button-group.css'

export type ButtonGroupProps = React.ComponentProps<'div'>

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
    return (
        <div
            role="group"
            {...props}
            className={cx('avl-button-group', className)}
        />
    )
}
