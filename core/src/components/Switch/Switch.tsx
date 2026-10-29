import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { withClass } from '../../utils'
import './switch.css'

export type SwitchProps = BaseSwitch.Root.Props

export function Switch({ className, ...props }: SwitchProps) {
    return (
        <BaseSwitch.Root
            {...props}
            className={withClass('avl-switch', className)}
        >
            <BaseSwitch.Thumb className="avl-switch-thumb" />
        </BaseSwitch.Root>
    )
}
