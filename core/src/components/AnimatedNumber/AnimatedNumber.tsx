import {
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type TransitionEvent,
} from 'react'
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
// 0-9 three times. A digit rests in the middle copy, so it can roll past
// 9 into the next 0 (or back past 0 into 9) and still have digits to show.
const strip = [...digits, ...digits, ...digits]
const HOME = 10

/**
 * A number whose digits roll like an odometer when `value` changes.
 * Screen readers hear the formatted number, not the individual digits.
 *
 * @example
 * <AnimatedNumber value={price} format={{ style: 'currency', currency: 'USD' }} />
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

    // Which way the digits roll: forward when the number goes up
    const [previous, setPrevious] = useState(value)
    const [direction, setDirection] = useState<1 | -1>(1)
    if (value !== previous) {
        setPrevious(value)
        setDirection(value > previous ? 1 : -1)
    }

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
                        <Digit
                            key={`d${fromEnd}`}
                            digit={digit}
                            direction={direction}
                        />
                    )
                })}
            </span>
        </span>
    )
}

// One rolling column. `position` is where the strip sits (0-29); it rolls
// the short way round in `direction`, then quietly jumps back to the same
// digit in the middle copy so the next roll has room either way.
function Digit(props: { digit: number; direction: 1 | -1 }) {
    const { digit, direction } = props
    const ref = useRef<HTMLSpanElement>(null)
    const [shown, setShown] = useState(digit)
    const [position, setPosition] = useState(HOME + digit)

    if (digit !== shown) {
        const steps =
            direction > 0
                ? (digit - shown + 10) % 10
                : -((shown - digit + 10) % 10)
        let next = position + steps
        // Changes too quick to settle in between can run off the strip
        if (next < 0 || next >= strip.length) next = HOME + digit
        setShown(digit)
        setPosition(next)
    }

    const settle = (event: TransitionEvent) => {
        const el = ref.current
        if (!el || event.target !== el) return
        const home = HOME + shown
        if (position === home) return
        // Same digit one copy over, so the jump can't be seen. No
        // transition for it, and a reflow so the browser doesn't animate it.
        el.style.transition = 'none'
        el.style.setProperty('--avl-digit', String(home))
        void el.offsetHeight
        el.style.transition = ''
        setPosition(home)
    }

    return (
        <span className="avl-animated-number-digit">
            {/* Invisible, sizes the column to one digit */}
            <span className="avl-animated-number-sizer">{digit}</span>
            <span
                ref={ref}
                className="avl-animated-number-strip"
                style={{ '--avl-digit': position } as CSSProperties}
                onTransitionEnd={settle}
            >
                {strip.map((d, i) => (
                    <span key={i}>{d}</span>
                ))}
            </span>
        </span>
    )
}
