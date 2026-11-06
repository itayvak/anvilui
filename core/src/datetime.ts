// Date and time helpers for Calendar, DateInput and TimePicker. Kept free of
// React and CSS imports, so they can be run and checked in plain Node.

const pad = (n: number, length = 2) => String(n).padStart(length, '0')

export const toIso = (d: Date) =>
    `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// new Date() rolls 31 Feb over into March; reject that instead
export function makeDate(y: number, m: number, d: number): Date | null {
    const date = new Date(y, m, d)
    return date.getFullYear() === y &&
        date.getMonth() === m &&
        date.getDate() === d
        ? date
        : null
}

export function fromIso(value: string | null | undefined): Date | null {
    const match = value ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) : null
    return match ? makeDate(+match[1], +match[2] - 1, +match[3]) : null
}

export type DateField = 'year' | 'month' | 'day'

// Which order the locale writes year, month and day in
export const fieldOrder = (fmt: Intl.DateTimeFormat) =>
    fmt
        .formatToParts(new Date(2000, 10, 22))
        .filter(
            (p) => p.type === 'year' || p.type === 'month' || p.type === 'day'
        )
        .map((p) => p.type as DateField)

// "MM/DD/YYYY" in the locale's order and separators
export function placeholderFor(fmt: Intl.DateTimeFormat) {
    const hint = { year: 'YYYY', month: 'MM', day: 'DD' }
    return fmt
        .formatToParts(new Date(2000, 10, 22))
        .map((p) =>
            p.type === 'literal'
                ? p.value
                : (hint[p.type as keyof typeof hint] ?? '')
        )
        .join('')
}

// Any separator works; the year needs all 4 digits so "26" isn't guessed
export function parseTyped(text: string, order: DateField[]) {
    const numbers = text.match(/\d+/g)
    if (numbers?.length !== 3) return null
    const parts = Object.fromEntries(order.map((type, i) => [type, numbers[i]]))
    if (parts.year.length !== 4) return null
    return makeDate(+parts.year, +parts.month - 1, +parts.day)
}

export type Time = { h: number; m: number }

// "HH:mm" (or "H:mm") to hours and minutes
export function parseTime(value: string | null | undefined): Time | null {
    const match = value ? /^(\d{1,2}):(\d{2})/.exec(value) : null
    return match ? { h: +match[1] % 24, m: +match[2] % 60 } : null
}
