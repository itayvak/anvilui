import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import './checkbox.css'

export type CheckboxProps = BaseCheckbox.Root.Props

export function Checkbox({ className, ...props }: CheckboxProps) {
    return (
        <BaseCheckbox.Root
            {...props}
            className={withClass('avl-checkbox', className)}
        >
            <BaseCheckbox.Indicator className="avl-checkbox-indicator">
                <Icon name={props.indeterminate ? 'remove' : 'check'} />
            </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
    )
}
