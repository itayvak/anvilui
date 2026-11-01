import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { withClass } from '../../utils'
import './radio-group.css'

export type RadioGroupProps<Value = any> = BaseRadioGroup.Props<Value>

export function RadioGroup<Value>({
    className,
    ...props
}: RadioGroupProps<Value>) {
    return (
        <BaseRadioGroup
            {...props}
            className={withClass('avl-radio-group', className)}
        />
    )
}

export type RadioProps<Value = any> = BaseRadio.Root.Props<Value>

export function Radio<Value>({ className, ...props }: RadioProps<Value>) {
    return (
        <BaseRadio.Root
            {...props}
            className={withClass('avl-radio', className)}
        >
            <BaseRadio.Indicator className="avl-radio-indicator" />
        </BaseRadio.Root>
    )
}
