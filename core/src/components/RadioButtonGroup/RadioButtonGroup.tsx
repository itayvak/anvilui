import { useLayoutEffect, useRef } from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import type { MaterialSymbol } from 'material-symbols'
import { ColorProps, colorClass } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { mergeRefs, withClass } from '../../utils'
import './radio-button-group.css'

export type RadioButtonGroupProps<Value = any> = BaseRadioGroup.Props<Value> &
    ColorProps & {
        /** @default 'normal' */
        size?: 'small' | 'normal' | 'big'
    }

/**
 * A segmented control: buttons in a row where exactly one is selected, with a
 * pill that slides to it. Use it for 2-5 short options; for longer lists or
 * forms, use `RadioGroup`.
 */
export function RadioButtonGroup<Value>({
    size = 'normal',
    color,
    fillType,
    children,
    className,
    ref,
    ...props
}: RadioButtonGroupProps<Value>) {
    const groupRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)

    // The pill follows whichever radio has [data-checked]. Watching the DOM
    // covers controlled, uncontrolled and resizes without mirroring state.
    useLayoutEffect(() => {
        const group = groupRef.current
        const indicator = indicatorRef.current
        if (!group || !indicator) return

        const place = () => {
            const checked = group.querySelector<HTMLElement>(
                '.avl-radio-button[data-checked]'
            )
            indicator.style.opacity = checked ? '1' : '0'
            if (!checked) return
            indicator.style.width = `${checked.offsetWidth}px`
            indicator.style.transform = `translateX(${checked.offsetLeft}px)`
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
    }, [])

    return (
        <BaseRadioGroup
            {...props}
            ref={mergeRefs(groupRef, ref)}
            className={withClass(
                'avl-radio-button-group ' +
                    colorClass(color, fillType) +
                    `avl-radio-button-group-size-${size}`,
                className
            )}
        >
            <div
                ref={indicatorRef}
                className="avl-radio-button-group-indicator"
                aria-hidden
            />
            {children}
        </BaseRadioGroup>
    )
}

export type RadioButtonProps<Value = any> = BaseRadio.Root.Props<Value> & {
    /** Material Symbol shown before the label. */
    startIcon?: MaterialSymbol
    /** Material Symbol shown after the label. */
    endIcon?: MaterialSymbol
}

/** One option in a `RadioButtonGroup`. Requires a `value`. */
export function RadioButton<Value>({
    startIcon,
    endIcon,
    children,
    className,
    ...props
}: RadioButtonProps<Value>) {
    return (
        <BaseRadio.Root
            {...props}
            nativeButton
            render={<button />}
            className={withClass('avl-radio-button', className)}
        >
            {startIcon && <Icon name={startIcon} />}
            {children}
            {endIcon && <Icon name={endIcon} />}
        </BaseRadio.Root>
    )
}
