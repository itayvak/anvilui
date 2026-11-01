import { createContext, useContext, useLayoutEffect, useRef } from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import type { MaterialSymbol } from 'material-symbols'
import { ColorProps, colorClass } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { mergeRefs, withClass } from '../../utils'
import './toggle-group.css'

type ToggleGroupCommonProps = ColorProps & {
    /** @default 'normal' */
    size?: 'small' | 'normal' | 'big'
}

export type ToggleGroupProps<Value = any> = ToggleGroupCommonProps &
    (
        | (BaseRadioGroup.Props<Value> & {
              /**
               * Let several segments be on at once. `value` is then an array
               * of strings. @default false
               */
              multiple?: false
          })
        | (BaseToggleGroup.Props<string> & { multiple: true })
    )

// Items render as radios or as toggles depending on the group
const MultipleContext = createContext(false)

/**
 * A segmented control: buttons in a row. By default exactly one is selected,
 * with a pill that stretches over to it. With `multiple`, each one toggles on
 * and off. Use it for 2-5 short options; for longer lists or forms, use
 * `RadioGroup` or checkboxes.
 */
export function ToggleGroup<Value>({
    size = 'normal',
    color,
    fillType,
    multiple = false,
    children,
    className,
    ref,
    ...props
}: ToggleGroupProps<Value>) {
    const groupRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)

    // The pill follows whichever radio has [data-checked]. Watching the DOM
    // covers controlled, uncontrolled and resizes without mirroring state.
    useLayoutEffect(() => {
        const group = groupRef.current
        const indicator = indicatorRef.current
        if (!group || !indicator) return
        let previousLeft: number | null = null

        const place = () => {
            const checked = group.querySelector<HTMLElement>(
                '.avl-toggle-group-item[data-checked]'
            )
            indicator.style.opacity = checked ? '1' : '0'
            if (!checked) return
            const left = checked.offsetLeft
            // The leading edge moves first and the trailing one follows, so
            // the pill stretches toward the new option, then catches up
            if (previousLeft != null && left !== previousLeft) {
                indicator.dataset.direction =
                    left > previousLeft ? 'forward' : 'backward'
            }
            previousLeft = left
            indicator.style.left = `${left}px`
            indicator.style.right = `${group.clientWidth - left - checked.offsetWidth}px`
        }

        place()
        // only slide after the first placement, so it doesn't fly in from 0
        const frame = requestAnimationFrame(() =>
            group.setAttribute('data-ready', '')
        )

        const mutations = new MutationObserver(place)
        mutations.observe(group, {
            subtree: true,
            childList: true,
            attributeFilter: ['data-checked'],
        })
        const resizes = new ResizeObserver(place)
        resizes.observe(group)

        return () => {
            cancelAnimationFrame(frame)
            mutations.disconnect()
            resizes.disconnect()
        }
    }, [multiple])

    const classes = withClass(
        'avl-toggle-group ' +
            colorClass(color, fillType) +
            `avl-toggle-group-size-${size}`,
        // Its state type depends on which group renders; both take a string
        className as string | undefined
    )

    return (
        <MultipleContext value={multiple}>
            {multiple ? (
                <BaseToggleGroup
                    {...(props as BaseToggleGroup.Props<string>)}
                    multiple
                    ref={ref}
                    className={classes}
                >
                    {children}
                </BaseToggleGroup>
            ) : (
                <BaseRadioGroup
                    {...(props as BaseRadioGroup.Props<Value>)}
                    ref={mergeRefs(groupRef, ref)}
                    className={classes}
                >
                    <div
                        ref={indicatorRef}
                        className="avl-toggle-group-indicator"
                        aria-hidden
                    />
                    {children}
                </BaseRadioGroup>
            )}
        </MultipleContext>
    )
}

export type ToggleGroupItemProps<Value = any> = BaseRadio.Root.Props<Value> & {
    /** Material Symbol shown before the label. */
    startIcon?: MaterialSymbol
    /** Material Symbol shown after the label. */
    endIcon?: MaterialSymbol
}

/**
 * One option in a `ToggleGroup`. Requires a `value` (a string when the
 * group is `multiple`).
 */
export function ToggleGroupItem<Value>({
    startIcon,
    endIcon,
    children,
    className,
    value,
    ...props
}: ToggleGroupItemProps<Value>) {
    const multiple = useContext(MultipleContext)
    const classes = withClass(
        'avl-toggle-group-item',
        className as string | undefined
    )
    const content = (
        <>
            {startIcon && <Icon name={startIcon} />}
            {children}
            {endIcon && <Icon name={endIcon} />}
        </>
    )

    if (multiple) {
        return (
            <BaseToggle
                {...(props as BaseToggle.Props)}
                value={String(value)}
                className={classes}
            >
                {/* Grows in when pressed, so it's clear which ones are on */}
                <Icon name="check" className="avl-toggle-group-check" />
                {content}
            </BaseToggle>
        )
    }

    return (
        <BaseRadio.Root
            {...props}
            value={value}
            nativeButton
            render={<button />}
            className={classes}
        >
            {content}
        </BaseRadio.Root>
    )
}
