import type { CSSProperties, ReactNode } from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { SquigglyWave, type WaveSpan } from '../SquigglyWave/SquigglyWave'
import { cx, withClass } from '../../utils'
import './progress.css'

export type ProgressProps = BaseProgress.Root.Props & {
    /** A bar, or a ring. @default 'linear' */
    type?: 'linear' | 'circular'
    /** Draw the filled part of a linear bar as a moving wave. @default false */
    squiggly?: boolean
} & (
        | {
              /** Visible label above the indicator. */
              label: ReactNode
              'aria-label'?: never
          }
        | {
              label?: never
              /** Accessible name, when there's no visible `label`. */
              'aria-label': string
          }
    )

// Circle drawn with pathLength=100, so dash lengths are percentages.
// Round caps stick out past each dash end, so the gap has to cover them too.
const RING_GAP = 8

/** Pass `value={null}` while the amount of work is unknown. */
export function Progress({
    type = 'linear',
    squiggly = false,
    label,
    className,
    style,
    children,
    ...props
}: ProgressProps) {
    const { value, min = 0, max = 100 } = props
    const fraction =
        value == null
            ? 0
            : Math.min(1, Math.max(0, (value - min) / (max - min)))
    const pct = fraction * 100
    // No filled part yet: the ring is whole, without a gap
    const ringGap = pct > 0 ? RING_GAP : 0

    return (
        <BaseProgress.Root
            {...props}
            className={withClass(
                cx(
                    'avl-progress',
                    `avl-progress-${type}`,
                    squiggly && type === 'linear' && 'avl-progress-squiggly'
                ),
                className
            )}
            // Base UI's style may be a function of state; keep both forms working
            style={(state) =>
                ({
                    '--avl-progress-fraction': fraction,
                    ...(typeof style === 'function' ? style(state) : style),
                }) as CSSProperties
            }
        >
            {label != null && (
                <BaseProgress.Label className="avl-progress-label">
                    {label}
                </BaseProgress.Label>
            )}
            {type === 'linear' ? (
                <BaseProgress.Track className="avl-progress-track">
                    {squiggly ? (
                        <SquigglyWave
                            span={(width, gap, _svg, now) =>
                                value == null
                                    ? loadingSpan(width, gap, now)
                                    : // Fill up to the value; .avl-progress-rest
                                      // draws the track one gap after it
                                      { from: 0, to: fraction * width }
                            }
                        />
                    ) : (
                        <BaseProgress.Indicator className="avl-progress-indicator" />
                    )}
                    <span className="avl-progress-rest" />
                </BaseProgress.Track>
            ) : (
                <BaseProgress.Track
                    className="avl-progress-ring"
                    render={<svg viewBox="0 0 48 48" />}
                >
                    <circle
                        className="avl-progress-ring-rest"
                        cx="24"
                        cy="24"
                        r="20"
                        pathLength={100}
                        strokeDasharray={`${Math.max(0, 100 - pct - 2 * ringGap)} 100`}
                        strokeDashoffset={-(pct + ringGap)}
                    />
                    <circle
                        className="avl-progress-ring-indicator"
                        cx="24"
                        cy="24"
                        r="20"
                        pathLength={100}
                        strokeDasharray={
                            value == null ? '25 100' : `${pct} 100`
                        }
                    />
                </BaseProgress.Track>
            )}
            {children}
        </BaseProgress.Root>
    )
}

// Unknown duration: a wave segment 40% wide sweeps from off the start to off
// the end, and the track is drawn around it with a gap on each side
function loadingSpan(width: number, gap: number, now: number): WaveSpan {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const period = reduced ? 4000 : 1500
    const segment = width * 0.4
    const left = -segment + ((now % period) / period) * (width + segment)
    const from = Math.max(0, left)
    const to = Math.min(width, left + segment)
    const visible = to - from > 0
    return {
        from,
        to,
        rest: visible
            ? [
                  [0, from - gap],
                  [to + gap, width],
              ]
            : [[0, width]],
        snap: true,
    }
}
