import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { withClass } from '../../utils'
import { checkProp } from '../../dev'
import './checkbox.css'

export type CheckboxProps = BaseCheckbox.Root.Props

// Both paths have the same commands, so CSS can morph one into the other
const CHECK = 'M5 12.5 L9.5 17 L19 7.5'
const DASH = 'M6 12 L12 12 L18 12'

/**
 * A checkbox. State: `checked` / `defaultChecked` / `onCheckedChange`, plus
 * `indeterminate`. It has no `label` prop: wrap it in a `<label>` with the text.
 *
 * @example
 * <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
 *     <Checkbox checked={agreed} onCheckedChange={setAgreed} />
 *     I agree to the terms
 * </label>
 */
export function Checkbox({ className, ...props }: CheckboxProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkProp(
            props,
            'label',
            'Checkbox',
            'Wrap it in a <label> with the text instead.',
            '<label>\n    <Checkbox name="terms" />\n    I agree to the terms\n</label>',
            'checkbox.md'
        )
    }
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
