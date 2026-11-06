import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { withClass } from '../../utils'
import { checkProp } from '../../dev'
import './switch.css'

export type SwitchProps = BaseSwitch.Root.Props

/**
 * An on/off switch. State: `checked` / `defaultChecked` / `onCheckedChange`.
 * It has no `label` prop: wrap it in a `<label>`, or put it in a `ListItem`'s
 * `end` with `render={<label />}`.
 *
 * @example
 * <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
 *     <Switch checked={wifi} onCheckedChange={setWifi} />
 *     Wi-Fi
 * </label>
 */
export function Switch({ className, ...props }: SwitchProps) {
    if (process.env.NODE_ENV !== 'production') {
        checkProp(
            props,
            'label',
            'Switch',
            'Wrap it in a <label> with the text instead.',
            '<label>\n    <Switch defaultChecked />\n    Wi-Fi\n</label>',
            'switch.md'
        )
    }
    return (
        <BaseSwitch.Root
            {...props}
            className={withClass('avl-switch', className)}
        >
            <BaseSwitch.Thumb className="avl-switch-thumb" />
        </BaseSwitch.Root>
    )
}
