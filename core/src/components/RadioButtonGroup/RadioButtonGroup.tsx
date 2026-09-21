import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { Button, ButtonProps } from '../Button/Button'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import './radio-button-group.css'

export type RadioButtonGroupProps<Value = any> = BaseRadioGroup.Props<Value>

export function RadioButtonGroup<Value>(props: RadioButtonGroupProps<Value>) {
    return <BaseRadioGroup {...props} render={<ButtonGroup />} />
}

export type RadioButtonProps<Value = any> = BaseRadio.Root.Props<Value> &
    Pick<ButtonProps, 'size' | 'fillType' | 'color' | 'startIcon' | 'endIcon'>

export function RadioButton<Value>({
    size,
    fillType,
    color = 'primary',
    startIcon,
    endIcon,
    ...props
}: RadioButtonProps<Value>) {
    return (
        <BaseRadio.Root
            {...props}
            nativeButton
            render={(radioProps) => (
                <Button
                    {...radioProps}
                    size={size}
                    fillType={fillType}
                    color={color}
                    startIcon={startIcon}
                    endIcon={endIcon}
                />
            )}
        />
    )
}
