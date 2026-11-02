import { cx } from '../../utils'
import './split-button.css'

export type SplitButtonProps = React.ComponentProps<'div'>

export function SplitButton({ className, ...props }: SplitButtonProps) {
    return (
        <div
            role="group"
            {...props}
            className={cx('avl-split-button', className)}
        />
    )
}
