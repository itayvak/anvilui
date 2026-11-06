import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { withClass } from '../../utils'
import { checkProp } from '../../dev'
import './radio-group.css'

export type RadioGroupProps<Value = any> = BaseRadioGroup.Props<Value>

/**
 * A group of `Radio`s where exactly one is picked. State: `value` /
 * `defaultValue` / `onValueChange` on the group; each `Radio` has a `value`.
 * Give the group an `aria-label` or `aria-labelledby`.
 *
 * @example
 * <RadioGroup aria-label="Plan" defaultValue="free">
 *     <label><Radio value="free" /> Free</label>
 *     <label><Radio value="pro" /> Pro</label>
 * </RadioGroup>
 */
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

/** One option in a `RadioGroup`. Needs a `value`. Wrap it in a `<label>` with its text. */
export function Radio<Value>({ className, ...props }: RadioProps<Value>) {
    if (process.env.NODE_ENV !== 'production') {
        checkProp(
            props,
            'label',
            'Radio',
            'Wrap it in a <label> with the text instead.',
            '<label>\n    <Radio value="pro" />\n    Pro\n</label>',
            'radio-group.md'
        )
    }
    return (
        <BaseRadio.Root
            {...props}
            className={withClass('avl-radio', className)}
        >
            <BaseRadio.Indicator className="avl-radio-indicator" />
        </BaseRadio.Root>
    )
}
