import { Switch as BaseSwitch } from '@base-ui/react/switch'
import './switch.css'

export type SwitchProps = BaseSwitch.Root.Props

export function Switch(props: SwitchProps) {
    return (
        <BaseSwitch.Root {...props} className="avl-switch">
            <BaseSwitch.Thumb className="avl-switch-thumb" />
        </BaseSwitch.Root>
    )
}
