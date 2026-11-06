import { useId, type ReactNode } from 'react'
import { Separator } from '@base-ui/react/separator'
import { SquigglyWave } from '../SquigglyWave/SquigglyWave'
import { cx, withClass } from '../../utils'
import './divider.css'

/**
 * A thin line between groups of content. `orientation="vertical"` stretches
 * to the height of its row, so put it in a flex row.
 */
export type DividerProps = Separator.Props & {
    /** Text in the middle of the line, with the line on both sides. */
    label?: ReactNode
    /**
     * Draw the line as a wave, like squiggly Progress. @default false
     */
    squiggly?: boolean
}

/**
 * A thin line between groups of content. Renders a separator `<div>`.
 *
 * @example
 * <Divider />
 * <Divider label="or" />
 * <div style={{ display: 'flex' }}>A<Divider orientation="vertical" />B</div>
 */
export function Divider({
    label,
    squiggly = false,
    className,
    ...props
}: DividerProps) {
    const labelId = useId()
    const hasLabel = label != null
    const vertical = props.orientation === 'vertical'
    // Pseudo-elements can't hold the wave, so squiggly lines are real elements
    const wave = squiggly && (
        <span className="avl-divider-wave">
            <SquigglyWave
                still
                vertical={vertical}
                span={(width) => ({ from: 0, to: width, snap: true })}
            />
        </span>
    )

    return (
        <Separator
            // A separator's contents are hidden from screen readers, so name
            // it after the label instead
            aria-labelledby={hasLabel ? labelId : undefined}
            {...props}
            className={withClass(
                cx(
                    'avl-divider',
                    hasLabel && 'avl-divider-labeled',
                    squiggly && 'avl-divider-squiggly'
                ),
                className
            )}
        >
            {wave}
            {hasLabel && (
                <span id={labelId} className="avl-divider-label">
                    {label}
                </span>
            )}
            {hasLabel && wave}
        </Separator>
    )
}
