import { useId, useRef, useState, type ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import {
    Popover,
    PopoverPopup,
    PopoverTrigger,
    type PopoverProps,
} from '../Popover/Popover'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'
import { cx } from '../../utils'
import { parseTime, type Time } from '../../datetime'
import '../Input/input.css'
import '../Select/select.css'
import './time-picker.css'

export type TimePickerProps = Omit<
    React.ComponentProps<'div'>,
    'children' | 'defaultValue'
> &
    Pick<PopoverProps, 'open' | 'defaultOpen' | 'onOpenChange'> & {
        /**
         * `dial`: tap or drag a clock face, hour then minute.
         * `input`: type into the hour and minute boxes. @default 'dial'
         */
        type?: 'dial' | 'input'
        /** The time as 24-hour `"HH:mm"` (like `<input type="time">`), or `null` for none. */
        value?: string | null
        /** Starting time when `value` isn't controlled. @default null */
        defaultValue?: string | null
        /** Called with the new `"HH:mm"` on every change. */
        onValueChange?: (value: string) => void
        /** 12 shows AM/PM. @default the user's locale */
        hourCycle?: 12 | 24
        /** @default false */
        disabled?: boolean
        /**
         * `small` is shorter, and its label works like a placeholder: it hides
         * once a time is picked. @default 'normal'
         */
        size?: 'small' | 'normal'
        /** Submits the value with a form, as `"HH:mm"`. */
        name?: string
    } & (
        | {
              /** Floating label, like Input's. */
              label: ReactNode
              'aria-label'?: never
          }
        | {
              label?: undefined
              /** Without a visible `label`, the field needs a name for screen readers. */
              'aria-label': string
          }
    )

type Mode = 'hour' | 'minute'

const pad = (n: number) => String(n).padStart(2, '0')

function localeHourCycle(): 12 | 24 {
    const { hour12 } = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
    }).resolvedOptions()
    return hour12 ? 12 : 24
}

const displayHour = (h: number, cycle: 12 | 24) =>
    cycle === 12 ? h % 12 || 12 : h

/**
 * A field that opens a Material 3 time picker. The value is a 24-hour
 * `"HH:mm"` string, the same format as `<input type="time">`.
 */
export function TimePicker({
    type = 'dial',
    value: valueProp,
    defaultValue = null,
    onValueChange,
    hourCycle,
    label,
    'aria-label': ariaLabel,
    disabled,
    size = 'normal',
    name,
    open,
    defaultOpen,
    onOpenChange,
    className,
    ...props
}: TimePickerProps) {
    const [internal, setInternal] = useState(defaultValue)
    const value = valueProp !== undefined ? valueProp : internal
    const time = parseTime(value)
    const cycle = hourCycle ?? localeHourCycle()
    const labelId = useId()
    const valueId = useId()

    const setTime = (t: Time) => {
        const next = `${pad(t.h)}:${pad(t.m)}`
        setInternal(next)
        onValueChange?.(next)
    }

    const shown =
        time &&
        new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hourCycle: cycle === 12 ? 'h12' : 'h23',
        }).format(new Date(2000, 0, 1, time.h, time.m))

    return (
        <Popover
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {/* Same structure and classes as Select, so it looks the same */}
            <div
                {...props}
                className={cx(
                    'avl-input',
                    'avl-select',
                    'avl-time-picker',
                    `avl-input-size-${size}`,
                    label != null && 'avl-input-labeled',
                    className
                )}
            >
                <PopoverTrigger
                    disabled={disabled}
                    className="avl-input-field avl-select-trigger"
                    // select.css rests the label while this is set
                    data-placeholder={time ? undefined : ''}
                    aria-labelledby={`${labelId} ${valueId}`}
                >
                    <span id={valueId} className="avl-select-value">
                        {shown}
                    </span>
                    <Icon name="schedule" className="avl-time-picker-icon" />
                </PopoverTrigger>
                {label != null ? (
                    <span id={labelId} className="avl-input-label">
                        {label}
                    </span>
                ) : (
                    <span id={labelId} hidden>
                        {ariaLabel}
                    </span>
                )}
                <fieldset aria-hidden className="avl-input-outline">
                    <legend>
                        {label != null && size === 'normal' && (
                            <span>{label}</span>
                        )}
                    </legend>
                </fieldset>
                {name != null && (
                    <input type="hidden" name={name} value={value ?? ''} />
                )}
            </div>
            <PopoverPopup aria-labelledby={labelId}>
                <TimePanel
                    type={type}
                    time={time}
                    cycle={cycle}
                    onChange={setTime}
                />
            </PopoverPopup>
        </Popover>
    )
}

// The popup's contents. Mounts on open, so it always starts on the hour.
function TimePanel(props: {
    type: 'dial' | 'input'
    time: Time | null
    cycle: 12 | 24
    onChange: (t: Time) => void
}) {
    const { type, time, cycle, onChange } = props
    const [mode, setMode] = useState<Mode>('hour')
    const pm = time ? time.h >= 12 : false
    const hourText = time ? pad(displayHour(time.h, cycle)) : '--'
    const minuteText = time ? pad(time.m) : '--'

    // Hours typed in 12-hour mode keep the current AM/PM
    const setHour = (shownHour: number) =>
        onChange({
            h: cycle === 12 ? (shownHour % 12) + (pm ? 12 : 0) : shownHour,
            m: time?.m ?? 0,
        })
    const setMinute = (m: number) => onChange({ h: time?.h ?? 0, m })

    return (
        <div className="avl-time-picker-panel">
            <div className="avl-time-picker-header">
                {type === 'dial' ? (
                    <>
                        <button
                            type="button"
                            className="avl-time-picker-box"
                            data-selected={mode === 'hour' || undefined}
                            aria-pressed={mode === 'hour'}
                            aria-label={`Hour ${hourText}`}
                            onClick={() => setMode('hour')}
                        >
                            {hourText}
                        </button>
                        <span className="avl-time-picker-colon" aria-hidden>
                            :
                        </span>
                        <button
                            type="button"
                            className="avl-time-picker-box"
                            data-selected={mode === 'minute' || undefined}
                            aria-pressed={mode === 'minute'}
                            aria-label={`Minute ${minuteText}`}
                            onClick={() => setMode('minute')}
                        >
                            {minuteText}
                        </button>
                    </>
                ) : (
                    <>
                        <SpinInput
                            label="Hour"
                            value={time && displayHour(time.h, cycle)}
                            min={cycle === 12 ? 1 : 0}
                            max={cycle === 12 ? 12 : 23}
                            onChange={setHour}
                        />
                        <span className="avl-time-picker-colon" aria-hidden>
                            :
                        </span>
                        <SpinInput
                            label="Minute"
                            value={time && time.m}
                            min={0}
                            max={59}
                            onChange={setMinute}
                        />
                    </>
                )}
                {cycle === 12 && (
                    <ToggleGroup
                        size="small"
                        fillType="outlined"
                        aria-label="AM or PM"
                        className="avl-time-picker-period"
                        value={time ? (pm ? 'pm' : 'am') : null}
                        onValueChange={(period) =>
                            onChange({
                                h:
                                    ((time?.h ?? 0) % 12) +
                                    (period === 'pm' ? 12 : 0),
                                m: time?.m ?? 0,
                            })
                        }
                    >
                        <ToggleGroupItem value="am">AM</ToggleGroupItem>
                        <ToggleGroupItem value="pm">PM</ToggleGroupItem>
                    </ToggleGroup>
                )}
            </div>
            {type === 'dial' && (
                <Dial
                    mode={mode}
                    time={time}
                    cycle={cycle}
                    onChange={onChange}
                    onHourDone={() => setMode('minute')}
                />
            )}
        </div>
    )
}

// A typeable box. Arrow keys step and wrap; digits commit as soon as they
// make a number in range, so "0" then "9" gives 9.
function SpinInput(props: {
    label: string
    value: number | null
    min: number
    max: number
    onChange: (n: number) => void
}) {
    const { label, value, min, max, onChange } = props
    const [draft, setDraft] = useState<string | null>(null)
    const range = max - min + 1

    return (
        <input
            className="avl-time-picker-box"
            role="spinbutton"
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value ?? undefined}
            inputMode="numeric"
            autoComplete="off"
            placeholder="--"
            value={draft ?? (value == null ? '' : pad(value))}
            onFocus={(e) => e.currentTarget.select()}
            onBlur={() => setDraft(null)}
            onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(-2)
                setDraft(digits)
                const n = Number(digits)
                if (digits && n >= min && n <= max) onChange(n)
            }}
            onKeyDown={(e) => {
                const step =
                    e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0
                if (!step) return
                e.preventDefault()
                setDraft(null)
                onChange(
                    value == null
                        ? min
                        : ((value - min + step + range) % range) + min
                )
            }}
        />
    )
}

// Clock face in a 256-unit square. 24-hour mode puts 12-23 on an inner ring.
const SIZE = 256
const C = SIZE / 2
const OUTER = 100
const INNER = 64
const KNOB = 20

const point = (index: number, of: number, radius: number) => {
    const a = (index / of) * 2 * Math.PI
    return { x: C + radius * Math.sin(a), y: C - radius * Math.cos(a) }
}

// A role="slider": arrow keys step, Enter moves on from the hour
function Dial(props: {
    mode: Mode
    time: Time | null
    cycle: 12 | 24
    onChange: (t: Time) => void
    onHourDone: () => void
}) {
    const { mode, time, cycle, onChange, onHourDone } = props
    const h = time?.h ?? 0
    const m = time?.m ?? 0
    const isHour = mode === 'hour'
    const [dragging, setDragging] = useState(false)

    const labels = Array.from({ length: 12 }, (_, i) =>
        !isHour
            ? [{ value: i * 5, text: pad(i * 5), inner: false }]
            : cycle === 12
              ? [{ value: i, text: String(i || 12), inner: false }]
              : [
                    { value: i, text: i ? String(i) : '00', inner: false },
                    { value: i + 12, text: String(i + 12), inner: true },
                ]
    ).flat()

    const radius = isHour && cycle === 24 && h >= 12 ? INNER : OUTER

    // The hand turns with a CSS transition. Keep the angle continuous
    // (350deg to 360deg, not back to 0deg) so it always takes the short way.
    const target = isHour ? (h % 12) * 30 : m * 6
    const angleRef = useRef<number | null>(null)
    const prev = angleRef.current
    const angle =
        prev == null
            ? target
            : prev + ((((target - prev) % 360) + 540) % 360) - 180
    angleRef.current = angle

    const isSelected = (value: number) =>
        time != null &&
        (isHour ? value === (cycle === 12 ? h % 12 : h) : value === m)

    const pick = (e: React.PointerEvent<SVGSVGElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * SIZE - C
        const y = ((e.clientY - rect.top) / rect.height) * SIZE - C
        // Clockwise from 12 o'clock, 0 to 1
        const turn = (Math.atan2(x, -y) / (2 * Math.PI) + 1) % 1
        if (!isHour) {
            onChange({ h, m: Math.round(turn * 60) % 60 })
            return
        }
        const i = Math.round(turn * 12) % 12
        const inner = cycle === 24 && Math.hypot(x, y) < (OUTER + INNER) / 2
        onChange({
            h: cycle === 12 ? i + (h >= 12 ? 12 : 0) : i + (inner ? 12 : 0),
            m,
        })
    }

    const step = (d: number) =>
        onChange(
            isHour ? { h: (h + d + 24) % 24, m } : { h, m: (m + d + 60) % 60 }
        )

    const valueText = !time
        ? undefined
        : isHour
          ? `${displayHour(h, cycle)}${cycle === 12 ? (h >= 12 ? ' PM' : ' AM') : ''}`
          : `${m} minutes`

    return (
        <svg
            className="avl-time-picker-dial"
            data-dragging={dragging || undefined}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            tabIndex={0}
            role="slider"
            aria-label={isHour ? 'Hour' : 'Minute'}
            aria-valuemin={0}
            aria-valuemax={isHour ? 23 : 59}
            aria-valuenow={time ? (isHour ? h : m) : undefined}
            aria-valuetext={valueText}
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                setDragging(true)
                pick(e)
            }}
            onPointerMove={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) pick(e)
            }}
            onPointerUp={() => {
                setDragging(false)
                if (isHour) onHourDone()
            }}
            onPointerCancel={() => setDragging(false)}
            onKeyDown={(e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowRight') step(1)
                else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft')
                    step(-1)
                else if (e.key === 'Enter' && isHour) onHourDone()
                else return
                e.preventDefault()
            }}
        >
            <circle className="avl-time-picker-dial-face" cx={C} cy={C} r={C} />
            {time && (
                <>
                    <circle
                        className="avl-time-picker-dial-knob"
                        cx={C}
                        cy={C}
                        r={3}
                    />
                    <g
                        className="avl-time-picker-dial-hand"
                        style={{
                            transformOrigin: `${C}px ${C}px`,
                            transform: `rotate(${angle}deg)`,
                        }}
                    >
                        {/* 1 unit tall, stretched to the radius, so its length animates too */}
                        <rect
                            className="avl-time-picker-dial-arm"
                            x={C - 1}
                            y={C - 1}
                            width={2}
                            height={1}
                            style={{
                                transformOrigin: `${C}px ${C}px`,
                                transform: `scaleY(${radius})`,
                            }}
                        />
                        <g
                            className="avl-time-picker-dial-tip"
                            style={{ transform: `translateY(${-radius}px)` }}
                        >
                            <circle
                                className="avl-time-picker-dial-knob"
                                cx={C}
                                cy={C}
                                r={KNOB}
                            />
                            {/* Between labels: a dot marks the exact minute */}
                            {!isHour && m % 5 !== 0 && (
                                <circle
                                    className="avl-time-picker-dial-dot"
                                    cx={C}
                                    cy={C}
                                    r={2}
                                />
                            )}
                        </g>
                    </g>
                </>
            )}
            {labels.map((l) => {
                const p = isHour
                    ? point(l.value % 12, 12, l.inner ? INNER : OUTER)
                    : point(l.value, 60, OUTER)
                return (
                    <text
                        key={l.value}
                        className={cx(
                            'avl-time-picker-dial-label',
                            l.inner && 'avl-time-picker-dial-label-inner'
                        )}
                        data-selected={isSelected(l.value) || undefined}
                        x={p.x}
                        y={p.y}
                        aria-hidden
                    >
                        {l.text}
                    </text>
                )
            })}
        </svg>
    )
}
