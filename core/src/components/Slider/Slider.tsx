import type { ReactNode } from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { SquigglyWave, type WaveSpan } from '../SquigglyWave/SquigglyWave'
import { cx, withClass } from '../../utils'
import '../Tooltip/tooltip.css'
import './slider.css'

export type SliderProps<
    Value extends number | readonly number[] = number | readonly number[],
> = BaseSlider.Root.Props<Value> & {
    /** Show the value in a bubble above the handle while it's dragged or focused. @default true */
    showValue?: boolean
    /**
     * Thin track with the selected part drawn as a moving wave, like a
     * squiggly `Progress`. Horizontal only. @default false
     */
    squiggly?: boolean
} &
    // Something has to name the slider for screen readers
    (
        | {
              /** Visible label above the slider. */
              label: ReactNode
              'aria-label'?: never
          }
        | {
              label?: never
              /** Accessible name, when there's no visible `label`. */
              'aria-label': string
          }
    )

/**
 * Pass an array as `value` / `defaultValue` for a range with several handles.
 * `orientation="vertical"` is 160px tall by default; set a height via `className`.
 */
export function Slider<Value extends number | readonly number[]>({
    label,
    'aria-label': ariaLabel,
    showValue = true,
    squiggly = false,
    className,
    ...props
}: SliderProps<Value>) {
    const initial = props.value ?? props.defaultValue
    const thumbCount = Array.isArray(initial) ? initial.length : 1
    const wavy = squiggly && props.orientation !== 'vertical'

    return (
        <BaseSlider.Root
            {...(props as BaseSlider.Root.Props<Value>)}
            className={withClass(
                cx(
                    'avl-slider',
                    thumbCount > 1 && 'avl-slider-range',
                    wavy && 'avl-slider-squiggly'
                ),
                className
            )}
        >
            {label != null && (
                <BaseSlider.Label className="avl-slider-label">
                    {label}
                </BaseSlider.Label>
            )}
            <BaseSlider.Control className="avl-slider-control">
                <BaseSlider.Track className="avl-slider-track">
                    {wavy ? (
                        <SquigglyWave span={handleSpan} />
                    ) : (
                        // Clips the track pieces to the rounded track, without
                        // also clipping the handles, which are taller
                        <div className="avl-slider-rail">
                            <BaseSlider.Indicator className="avl-slider-indicator" />
                            {/* The indicator's ::before and ::after draw the
                                selected part and the part after it. A range
                                needs a third piece, before its first handle. */}
                            {thumbCount > 1 && (
                                <BaseSlider.Indicator className="avl-slider-indicator-start" />
                            )}
                        </div>
                    )}
                    {Array.from({ length: thumbCount }, (_, i) => (
                        <BaseSlider.Thumb
                            key={i}
                            index={i}
                            aria-label={ariaLabel}
                            className="avl-slider-thumb"
                            // Base UI marks every handle as dragging, so mark
                            // the one being moved: only its track pinches
                            render={(thumbProps, state) => (
                                <div
                                    {...thumbProps}
                                    data-active={
                                        state.activeThumbIndex === i
                                            ? ''
                                            : undefined
                                    }
                                />
                            )}
                        >
                            {showValue && (
                                <BaseSlider.Value className="avl-tooltip avl-slider-value">
                                    {(formatted) => formatted[i]}
                                </BaseSlider.Value>
                            )}
                        </BaseSlider.Thumb>
                    ))}
                </BaseSlider.Track>
            </BaseSlider.Control>
        </BaseSlider.Root>
    )
}

// Squiggly: the wave runs between the handles (or from the start to the only
// one), and the track fills the rest, each stopping a gap short of a handle.
// Measures the handles every frame, so it follows a drag exactly.
function handleSpan(width: number, gap: number, svg: SVGSVGElement): WaveSpan {
    const box = svg.getBoundingClientRect()
    const centers = Array.from(
        svg.parentElement?.querySelectorAll('.avl-slider-thumb') ?? [],
        (thumb) => {
            const rect = thumb.getBoundingClientRect()
            return rect.left + rect.width / 2 - box.left
        }
    )
    if (centers.length === 0) return { from: 0, to: 0, snap: true }

    const first = centers[0]
    const last = centers[centers.length - 1]
    const range = centers.length > 1
    return {
        from: range ? first + gap : 0,
        to: last - gap,
        rest: range
            ? [
                  [0, first - gap],
                  [last + gap, width],
              ]
            : [[last + gap, width]],
        dot: last + gap < width - gap,
        snap: true,
    }
}
