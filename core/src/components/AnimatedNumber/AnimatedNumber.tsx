import { useMemo, type CSSProperties } from 'react'
import { cx } from '../../utils'
import './animated-number.css'

export type AnimatedNumberProps = Omit<
    React.ComponentProps<'span'>,
    'children'
> & {
    /** The number to show. Digits roll to the new value when it changes. */
    value: number
    /** How to format the number: decimals, currency, percent, compact, ... */
    format?: Intl.NumberFormatOptions
    /** Locale for formatting. @default the browser's */
    locales?: Intl.LocalesArgument
}

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * A number whose digits roll like an odometer when `value` changes.
 * Screen readers hear the formatted number, not the individual digits.
 */
export function AnimatedNumber({
    value,
    format,
    locales,
    className,
    ...props
}: AnimatedNumberProps) {
    const text = useMemo(
        // Latin digits, so every digit gets a rolling column
        () =>
            new Intl.NumberFormat(locales, {
                ...format,
                numberingSystem: 'latn',
            }).format(value),
        [value, format, locales]
    )
    const chars = [...text]

    return (
        <span {...props} className={cx('avl-animated-number', className)}>
            <span className="avl-animated-number-label">{text}</span>
            <span aria-hidden="true">
                {chars.map((char, i) => {
                    // Keyed from the right, so the ones stay the ones when
                    // the number grows a digit (99 -> 100 rolls, not rebuilds)
                    const fromEnd = chars.length - i
                    const digit = digits.indexOf(char)
                    if (digit === -1)
                        return <span key={`s${fromEnd}`}>{char}</span>
                    return (
                        <span
                            key={`d${fromEnd}`}
                            className="avl-animated-number-digit"
                        >
                            {/* Invisible, sizes the column to one digit */}
                            <span className="avl-animated-number-sizer">
                                {char}
                            </span>
                            <span
                                className="avl-animated-number-strip"
                                style={
                                    { '--avl-digit': digit } as CSSProperties
                                }
                            >
                                {digits.map((d) => (
                                    <span key={d}>{d}</span>
                                ))}
                            </span>
                        </span>
                    )
                })}
            </span>
        </span>
    )
}
