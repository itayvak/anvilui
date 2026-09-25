import { Dispatch, SetStateAction, useLayoutEffect, useRef } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { IconButton } from '../IconButton/IconButton'
import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import './navigation-rail.css'
import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography/Typography'

export type NavigationRailProps<Value extends string = string> = Omit<
    React.ComponentProps<'div'>,
    'onChange' | 'defaultValue'
> & {
    hasExpandButton?: boolean
    expanded?: boolean
    setExpanded?: Dispatch<SetStateAction<boolean>>
    value?: ToggleGroup.Props<Value>['value']
    defaultValue?: ToggleGroup.Props<Value>['defaultValue']
    onValueChange?: ToggleGroup.Props<Value>['onValueChange']
}

const FLIP_ID = 'avl-navigation-rail-flip'

type FlipPart = {
    el: HTMLElement
    /** ancestor that is animated too, whose transform this one compounds with */
    parent?: HTMLElement
    fade?: boolean
}

function collectParts(rail: HTMLElement): FlipPart[] {
    const parts: FlipPart[] = []
    const button = rail.querySelector<HTMLElement>(
        '.avl-navigation-rail-expand-button'
    )
    if (button) parts.push({ el: button })

    for (const item of rail.querySelectorAll<HTMLElement>(
        '.avl-navigation-rail-item'
    )) {
        parts.push({ el: item })
        const icon = item.querySelector<HTMLElement>(
            '.avl-navigation-rail-item-icon'
        )
        const text = item.querySelector<HTMLElement>(
            '.avl-navigation-rail-item-text'
        )
        if (icon) parts.push({ el: icon, parent: item })
        // the label re-wraps between the two layouts, so it cross-fades on top
        // of the move instead of visibly reflowing
        if (text) parts.push({ el: text, parent: item, fade: true })
    }
    return parts
}

export function NavigationRail<Value extends string = string>({
    hasExpandButton,
    expanded: expandedProp,
    setExpanded,
    value,
    defaultValue,
    onValueChange,
    children,
    ...props
}: NavigationRailProps<Value>) {
    const expanded = expandedProp === null ? true : expandedProp
    const railRef = useRef<HTMLDivElement>(null)
    const lastRects = useRef(new Map<HTMLElement, DOMRect>())

    // FLIP: the collapsed and expanded layouts differ in ways CSS cannot
    // interpolate (flex-direction, text wrapping), so the new layout is applied
    // at once and every moved piece is animated back from where it just was.
    useLayoutEffect(() => {
        const rail = railRef.current
        if (!rail) return

        const style = getComputedStyle(rail)
        const duration =
            parseFloat(
                style.getPropertyValue('--avl-navigation-rail-duration')
            ) || 0
        const easing =
            style.getPropertyValue('--avl-navigation-rail-ease').trim() ||
            'ease'

        const before = lastRects.current
        const after = new Map<HTMLElement, DOMRect>()
        const parts = collectParts(rail)

        // measure everything first: cancelling a running flip changes layout
        // ponytail: toggling mid-flight restarts from the resting layout (small
        // pop). Read the live transforms here if that ever shows up in use.
        for (const { el } of parts) {
            for (const animation of el.getAnimations()) {
                if (animation.id === FLIP_ID) animation.cancel()
            }
            after.set(el, el.getBoundingClientRect())
        }
        lastRects.current = after

        if (!before.size || !duration) return

        for (const { el, parent, fade } of parts) {
            const from = before.get(el)
            if (!from) continue
            const to = after.get(el)!
            let x = from.left - to.left
            let y = from.top - to.top

            const parentFrom = parent && before.get(parent)
            if (parentFrom) {
                // this transform compounds with the parent's, so take it back out
                const parentTo = after.get(parent)!
                x -= parentFrom.left - parentTo.left
                y -= parentFrom.top - parentTo.top
            }
            if (!x && !y && !fade) continue

            el.animate(
                [
                    {
                        transform: `translate(${x}px, ${y}px)`,
                        opacity: fade ? 0 : 1,
                    },
                    { transform: 'none', opacity: 1 },
                ],
                { duration, easing, id: FLIP_ID }
            )
        }
    }, [expanded])

    return (
        <div
            {...props}
            ref={railRef}
            className="avl-navigation-rail"
            data-expanded={expanded}
        >
            <div className="avl-navigation-rail-content">
                {hasExpandButton && (
                    <IconButton
                        className="avl-navigation-rail-expand-button"
                        icon={expanded ? 'menu_open' : 'menu'}
                        aria-label={expanded ? 'Close Menu' : 'Expand Menu'}
                        fillType="text"
                        color="container"
                        data-expanded={expanded}
                        onClick={() => setExpanded && setExpanded((p) => !p)}
                    />
                )}
                <ToggleGroup
                    className="avl-navigation-rail-item-list"
                    value={value}
                    defaultValue={defaultValue}
                    onValueChange={onValueChange}
                >
                    {children}
                </ToggleGroup>
            </div>
        </div>
    )
}

export type NavigationRailItemProps<Value extends string = string> =
    Toggle.Props<Value> & {
        icon: MaterialSymbol
        title: string
    }

export function NavigationRailItem<Value extends string = string>({
    icon,
    title,
    className,
    ...props
}: NavigationRailItemProps<Value>) {
    return (
        <Toggle
            {...props}
            className={'avl-navigation-rail-item ' + (className ?? '')}
        >
            <Icon name={icon} className="avl-navigation-rail-item-icon" />
            <Typography className="avl-navigation-rail-item-text">
                {title}
            </Typography>
        </Toggle>
    )
}
