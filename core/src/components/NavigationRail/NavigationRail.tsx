import { useLayoutEffect, useRef, useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'
import { IconButton } from '../IconButton/IconButton'
import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography/Typography'
import { cx, mergeRefs } from '../../utils'
import './navigation-rail.css'

export type NavigationRailProps = React.ComponentProps<'nav'> & {
    /** Shows a button that toggles between the collapsed and expanded layouts. */
    hasExpandButton?: boolean
    /** Controlled expanded state. Pair with `onExpandedChange`. */
    expanded?: boolean
    /** Starting state when `expanded` isn't controlled. */
    defaultExpanded?: boolean
    onExpandedChange?: (expanded: boolean) => void
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

/**
 * Side navigation between an app's top-level pages. Fill it with
 * `NavigationRailItem`s and give it an `aria-label` (e.g. "Main").
 */
export function NavigationRail({
    hasExpandButton,
    expanded: expandedProp,
    defaultExpanded = true,
    onExpandedChange,
    children,
    className,
    ref,
    ...props
}: NavigationRailProps) {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const expanded = expandedProp ?? internalExpanded
    const toggleExpanded = () => {
        setInternalExpanded(!expanded)
        onExpandedChange?.(!expanded)
    }
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
            if (fade) {
                // labels don't slide: they stay hidden while the layout moves,
                // then fade in where they land
                el.animate(
                    [
                        { opacity: 0 },
                        { opacity: 0, offset: 0.4 },
                        { opacity: 1 },
                    ],
                    { duration, easing: 'ease-out', id: FLIP_ID }
                )
                continue
            }
            if (!x && !y) continue

            el.animate(
                [
                    { transform: `translate(${x}px, ${y}px)` },
                    { transform: 'none' },
                ],
                { duration, easing, id: FLIP_ID }
            )
        }
    }, [expanded])

    return (
        <nav
            {...props}
            ref={mergeRefs(railRef, ref)}
            className={cx('avl-navigation-rail', className)}
            data-expanded={expanded}
        >
            <div className="avl-navigation-rail-content">
                {hasExpandButton && (
                    <IconButton
                        className="avl-navigation-rail-expand-button"
                        icon={expanded ? 'menu_open' : 'menu'}
                        aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
                        aria-expanded={expanded}
                        fillType="text"
                        color="container"
                        data-expanded={expanded}
                        onClick={toggleExpanded}
                    />
                )}
                <div className="avl-navigation-rail-item-list">{children}</div>
            </div>
        </nav>
    )
}

// A link by default. Pass `render` to use a router link instead, e.g.
// render={<Link to="/photos" />}.
export type NavigationRailItemProps = useRender.ComponentProps<'a'> & {
    /** Material Symbol to show. */
    icon: MaterialSymbol
    /** Visible text, also the link's accessible name. */
    label: string
    /** The current page. Sets aria-current="page". */
    active?: boolean
}

export function NavigationRailItem({
    icon,
    label,
    active = false,
    render,
    className,
    ...props
}: NavigationRailItemProps) {
    return useRender({
        defaultTagName: 'a',
        render,
        state: { active },
        props: mergeProps<'a'>(
            {
                className: cx('avl-navigation-rail-item', className),
                'aria-current': active ? 'page' : undefined,
                children: (
                    <>
                        <Icon
                            name={icon}
                            className="avl-navigation-rail-item-icon"
                        />
                        <Typography
                            as="span"
                            className="avl-navigation-rail-item-text"
                        >
                            {label}
                        </Typography>
                    </>
                ),
            },
            props
        ),
    })
}
