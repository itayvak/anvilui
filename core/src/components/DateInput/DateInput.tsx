import {
    useEffect,
    useId,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { IconButton } from '../IconButton/IconButton'
import { Calendar } from '../Calendar/Calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '../Popover/Popover'
import { cx, mergeRefs } from '../../utils'
import {
    fieldOrder,
    fromIso,
    parseTyped,
    placeholderFor,
    toIso,
} from '../../datetime'
import '../Input/input.css'
import './date-input.css'

export type DateInputProps = Omit<
    BaseInput.Props,
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'type'
    | 'size'
    | 'className'
    | 'style'
    | 'placeholder'
> & {
    /** Applied to the outer wrapper, with `className`. */
    style?: CSSProperties
    /** The date as `"YYYY-MM-DD"` (like `<input type="date">`), or `null` for none. */
    value?: string | null
    /** Starting date when `value` isn't controlled. @default null */
    defaultValue?: string | null
    /** Called with the new `"YYYY-MM-DD"`, or `null` once the field is cleared. */
    onValueChange?: (value: string | null) => void
    /**
     * `small` is shorter, and its label works like a placeholder: it hides
     * once there's text. @default 'normal'
     */
    size?: 'small' | 'normal'
    /** Applied to the outer wrapper, so width and margins work as expected. */
    className?: string
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

// The locale's numeric date format, e.g. 10/29/2026 or 29.10.2026
const numericFormat = () =>
    new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

/**
 * A text field for a date, typed in the locale's format (10/29/2026,
 * 29.10.2026, ...) or picked from a calendar. The value is `"YYYY-MM-DD"`,
 * the same format as `<input type="date">`, not a `Date`.
 *
 * @example
 * const [date, setDate] = useState<string | null>(null)
 * <DateInput label="Start date" value={date} onValueChange={setDate} />
 */
export function DateInput({
    value: valueProp,
    defaultValue = null,
    onValueChange,
    label,
    size = 'normal',
    disabled,
    id,
    onBlur,
    className,
    style,
    ref,
    ...props
}: DateInputProps) {
    const [internal, setInternal] = useState(defaultValue)
    const value = valueProp !== undefined ? valueProp : internal
    const date = fromIso(value)
    // What's typed, while it differs from the value
    const [draft, setDraft] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const fieldRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const generatedId = useId()
    const inputId = id ?? generatedId
    const inputRef = useRef<HTMLInputElement>(null)

    // The input shows the locale's text ("11/06/2026"). Forms get the
    // "YYYY-MM-DD" value instead, under whatever name the input has (its own,
    // or a Field's), including `new FormData(form)` and server actions.
    const iso = useRef('')
    iso.current = date ? toIso(date) : ''
    useEffect(() => {
        const form = inputRef.current?.form
        if (!form) return
        const onFormData = (event: FormDataEvent) => {
            const input = inputRef.current
            if (input?.name && !input.disabled)
                event.formData.set(input.name, iso.current)
        }
        form.addEventListener('formdata', onFormData)
        return () => form.removeEventListener('formdata', onFormData)
    }, [])

    const fmt = numericFormat()
    const order = fieldOrder(fmt)
    const invalid =
        draft != null && draft.trim() !== '' && !parseTyped(draft, order)

    const commit = (d: Date | null) => {
        const next = d && toIso(d)
        setInternal(next)
        onValueChange?.(next)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div
                ref={fieldRef}
                style={style}
                className={cx(
                    'avl-input',
                    'avl-date-input',
                    `avl-input-size-${size}`,
                    label != null && 'avl-input-labeled',
                    className
                )}
            >
                <BaseInput
                    {...props}
                    ref={mergeRefs(inputRef, ref)}
                    id={inputId}
                    disabled={disabled}
                    className="avl-input-field"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={placeholderFor(fmt)}
                    aria-invalid={invalid || undefined}
                    value={draft ?? (date ? fmt.format(date) : '')}
                    onChange={(e) => {
                        const text = e.target.value
                        setDraft(text)
                        if (!text.trim()) commit(null)
                        else {
                            const typed = parseTyped(text, order)
                            if (typed) commit(typed)
                        }
                    }}
                    onBlur={(e) => {
                        // Tidy a valid entry into the locale format; keep a bad one to fix
                        if (!invalid) setDraft(null)
                        onBlur?.(e)
                    }}
                />
                {label != null && (
                    <label htmlFor={inputId} className="avl-input-label">
                        {label}
                    </label>
                )}
                <PopoverTrigger
                    disabled={disabled}
                    render={
                        <IconButton
                            icon="calendar_today"
                            fillType="text"
                            color="container"
                            aria-label="Choose date"
                        />
                    }
                />
                <fieldset aria-hidden className="avl-input-outline">
                    <legend>
                        {label != null && size === 'normal' && (
                            <span>{label}</span>
                        )}
                    </legend>
                </fieldset>
            </div>
            <PopoverPopup
                anchor={fieldRef}
                align="start"
                ref={popupRef}
                // the picked day, or today: the one day that's tabbable
                initialFocus={() =>
                    popupRef.current?.querySelector<HTMLElement>(
                        '.avl-calendar-day[tabindex="0"]'
                    ) ?? true
                }
                aria-label="Choose date"
            >
                <Calendar
                    value={date && toIso(date)}
                    onValueChange={(iso) => {
                        commit(fromIso(iso))
                        setDraft(null)
                        setOpen(false)
                    }}
                />
            </PopoverPopup>
        </Popover>
    )
}
