import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import './radio-group.css'

export type RadioGroupProps<Value = any> = BaseRadioGroup.Props<Value>

export function RadioGroup<Value>(props: RadioGroupProps<Value>) {
    return <BaseRadioGroup {...props} className="avl-radio-group" />
}

export type RadioProps<Value = any> = BaseRadio.Root.Props<Value>

export function Radio<Value>(props: RadioProps<Value>) {
    return (
        <BaseRadio.Root {...props} className="avl-radio">
            <BaseRadio.Indicator className="avl-radio-indicator" />
        </BaseRadio.Root>
    )
}
