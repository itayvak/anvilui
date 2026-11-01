import { useContext, type ReactElement, type ReactNode } from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { withClass } from '../../utils'
import './tooltip.css'

export type TooltipProps = Omit<BaseTooltip.Root.Props, 'children'> &
    Pick<BaseTooltip.Trigger.Props, 'delay' | 'closeDelay'> &
    Pick<
        BaseTooltip.Positioner.Props,
        'side' | 'align' | 'sideOffset' | 'alignOffset'
    > &
    Pick<BaseTooltip.Popup.Props, 'className'> & {
        /** Text shown in the tooltip. Keep it short; nothing in it can be clicked. */
        label: ReactNode
        /**
         * The element the tooltip describes. It must take a ref and pass its
         * props through, as the library's components do.
         */
        children: ReactElement
    }

/** A short hint shown on hover or keyboard focus. `className` goes on the bubble. */
export function Tooltip({
    label,
    children,
    delay,
    closeDelay,
    side,
    align,
    sideOffset,
    alignOffset,
    className,
    ...props
}: TooltipProps) {
    const avl = useContext(AnvilContext)

    return (
        <BaseTooltip.Root {...props}>
            <BaseTooltip.Trigger
                render={children}
                delay={delay}
                closeDelay={closeDelay}
            />
            {/* Into the AnvilRoot, not body, so the popup sees the theme variables */}
            <BaseTooltip.Portal container={avl?.rootRef}>
                <BaseTooltip.Positioner
                    className="avl-tooltip-positioner"
                    side={side}
                    align={align}
                    sideOffset={sideOffset ?? 4}
                    alignOffset={alignOffset}
                >
                    <BaseTooltip.Popup
                        className={withClass('avl-tooltip', className)}
                    >
                        {label}
                    </BaseTooltip.Popup>
                </BaseTooltip.Positioner>
            </BaseTooltip.Portal>
        </BaseTooltip.Root>
    )
}
