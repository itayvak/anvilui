import { useEffect, useRef, useState } from 'react'
import { IconButton } from '../IconButton/IconButton'
import { cx } from '../../utils'
import { fromIso, toIso } from '../../datetime'
import './calendar.css'

export type CalendarProps = Omit<
    React.ComponentProps<'div'>,
    'defaultValue' | 'onChange'
> & {
    /** The picked date as `"YYYY-MM-DD"` (like `<input type="date">`), or `null` for none. */
    value?: string | null
    /** Starting date when `value` isn't controlled. @default null */
    defaultValue?: string | null
    /** Called with the picked `"YYYY-MM-DD"`. */
    onValueChange?: (value: string) => void
}

// 0 = Sunday. Intl.Locale's week info isn't in every browser yet.
function localeWeekStart(): number {
    try {
        const locale = new Intl.Locale(navigator.language) as Intl.Locale & {
            getWeekInfo?: () => { firstDay: number }
            weekInfo?: { firstDay: number }
        }
        const info = locale.getWeekInfo?.() ?? locale.weekInfo
        return info ? info.firstDay % 7 : 0
    } catch {
        return 0
    }
}

/**
 * A month grid to pick a date from. Arrow keys move by day and week, Page
 * Up/Down by month (with Shift, by year), Home/End to the ends of the week.
 * The first weekday and all names follow the user's locale.
 */
export function Calendar({
    value: valueProp,
    defaultValue = null,
    onValueChange,
    className,
    ...props
}: CalendarProps) {
    const [internal, setInternal] = useState(defaultValue)
    const selected = fromIso(valueProp !== undefined ? valueProp : internal)
    const [focused, setFocused] = useState(() => {
        const now = new Date()
        return (
            selected ??
            new Date(now.getFullYear(), now.getMonth(), now.getDate())
        )
    })
    const [weekStart] = useState(localeWeekStart)
    const dayRef = useRef<HTMLButtonElement>(null)
    const moveFocus = useRef(false)
    const year = focused.getFullYear()
    const month = focused.getMonth()

    // Keyboard moves take focus along; the arrow buttons leave it where it is
    useEffect(() => {
        if (moveFocus.current) dayRef.current?.focus()
        moveFocus.current = false
    }, [focused])

    const go = (d: Date, focus = true) => {
        moveFocus.current = focus
        setFocused(d)
    }

    // Same day in another month, or its last day if that's shorter
    const shiftMonths = (n: number, focus = false) => {
        const first = new Date(year, month + n, 1)
        const last = new Date(first.getFullYear(), first.getMonth() + 1, 0)
        go(
            new Date(
                first.getFullYear(),
                first.getMonth(),
                Math.min(focused.getDate(), last.getDate())
            ),
            focus
        )
    }

    const select = (d: Date) => {
        const iso = toIso(d)
        setInternal(iso)
        setFocused(d)
        onValueChange?.(iso)
    }

    const today = toIso(new Date())
    const selectedIso = selected && toIso(selected)
    const focusedIso = toIso(focused)

    const offset = (new Date(year, month, 1).getDay() - weekStart + 7) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = [
        ...Array<null>(offset).fill(null),
        ...Array.from(
            { length: daysInMonth },
            (_, i) => new Date(year, month, i + 1)
        ),
    ]
    while (cells.length % 7) cells.push(null)
    const weeks = Array.from({ length: cells.length / 7 }, (_, i) =>
        cells.slice(i * 7, i * 7 + 7)
    )

    // 1 Jan 2023 was a Sunday
    const weekdays = Array.from(
        { length: 7 },
        (_, i) => new Date(2023, 0, 1 + ((weekStart + i) % 7))
    )
    const weekdayShort = new Intl.DateTimeFormat(undefined, {
        weekday: 'narrow',
    })
    const weekdayLong = new Intl.DateTimeFormat(undefined, { weekday: 'long' })
    const dayName = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' })
    const monthName = new Intl.DateTimeFormat(undefined, { month: 'short' })
    const monthYear = new Intl.DateTimeFormat(undefined, {
        month: 'long',
        year: 'numeric',
    })

    const onKeyDown = (e: React.KeyboardEvent) => {
        const steps: Record<string, number> = {
            ArrowLeft: -1,
            ArrowRight: 1,
            ArrowUp: -7,
            ArrowDown: 7,
        }
        const day = focused.getDate()
        const intoWeek = (focused.getDay() - weekStart + 7) % 7
        if (e.key in steps) go(new Date(year, month, day + steps[e.key]))
        else if (e.key === 'PageUp') shiftMonths(e.shiftKey ? -12 : -1, true)
        else if (e.key === 'PageDown') shiftMonths(e.shiftKey ? 12 : 1, true)
        else if (e.key === 'Home') go(new Date(year, month, day - intoWeek))
        else if (e.key === 'End') go(new Date(year, month, day + 6 - intoWeek))
        else return
        e.preventDefault()
    }

    return (
        <div {...props} className={cx('avl-calendar', className)}>
            <div className="avl-calendar-header">
                <div className="avl-calendar-nav">
                    <IconButton
                        icon="chevron_left"
                        fillType="text"
                        color="container"
                        aria-label="Previous month"
                        onClick={() => shiftMonths(-1)}
                    />
                    <span className="avl-calendar-nav-label" aria-live="polite">
                        {monthName.format(focused)}
                    </span>
                    <IconButton
                        icon="chevron_right"
                        fillType="text"
                        color="container"
                        aria-label="Next month"
                        onClick={() => shiftMonths(1)}
                    />
                </div>
                <div className="avl-calendar-nav">
                    <IconButton
                        icon="chevron_left"
                        fillType="text"
                        color="container"
                        aria-label="Previous year"
                        onClick={() => shiftMonths(-12)}
                    />
                    <span className="avl-calendar-nav-label" aria-live="polite">
                        {year}
                    </span>
                    <IconButton
                        icon="chevron_right"
                        fillType="text"
                        color="container"
                        aria-label="Next year"
                        onClick={() => shiftMonths(12)}
                    />
                </div>
            </div>
            <table
                className="avl-calendar-grid"
                role="grid"
                aria-label={monthYear.format(focused)}
                onKeyDown={onKeyDown}
            >
                <thead>
                    <tr>
                        {weekdays.map((d) => (
                            <th
                                key={d.getDay()}
                                scope="col"
                                abbr={weekdayLong.format(d)}
                                className="avl-calendar-weekday"
                            >
                                {weekdayShort.format(d)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, w) => (
                        <tr key={w}>
                            {week.map((d, i) => {
                                if (!d) return <td key={i} />
                                const iso = toIso(d)
                                const isFocused = iso === focusedIso
                                return (
                                    <td
                                        key={i}
                                        role="gridcell"
                                        aria-selected={iso === selectedIso}
                                    >
                                        <button
                                            ref={isFocused ? dayRef : undefined}
                                            type="button"
                                            className="avl-calendar-day"
                                            tabIndex={isFocused ? 0 : -1}
                                            aria-label={dayName.format(d)}
                                            aria-current={
                                                iso === today
                                                    ? 'date'
                                                    : undefined
                                            }
                                            data-selected={
                                                iso === selectedIso || undefined
                                            }
                                            onClick={() => select(d)}
                                        >
                                            {d.getDate()}
                                        </button>
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
