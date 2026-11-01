import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { withClass } from '../../utils'
import './checkbox.css'

export type CheckboxProps = BaseCheckbox.Root.Props

// Both paths have the same commands, so CSS can morph one into the other
const CHECK = 'M5 12.5 L9.5 17 L19 7.5'
const DASH = 'M6 12 L12 12 L18 12'

export function Checkbox({ className, ...props }: CheckboxProps) {
    return (
        <BaseCheckbox.Root
            {...props}
            className={withClass('avl-checkbox', className)}
        >
            <BaseCheckbox.Indicator className="avl-checkbox-indicator">
                <svg viewBox="0 0 24 24" aria-hidden>
                    <path
                        d={props.indeterminate ? DASH : CHECK}
                        pathLength={1}
                    />
                </svg>
            </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
    )
}
