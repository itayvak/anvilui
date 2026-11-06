import type { ComponentProps, ReactNode } from 'react'
import type { ComponentColor, ComponentFillType } from '../../colors/colors'
import { colorClass } from '../../colors/colors'
import { Typography, type TypographyTag } from '../Typography/Typography'
import { cx } from '../../utils'
import './app-bar.css'

export type AppBarProps = ComponentProps<'header'> & {
    /** The page or screen title. */
    label: ReactNode
    /**
     * HTML tag for the title. A div by default; use `'h1'` when the bar's
     * title is the page's main heading. @default 'div'
     */
    labelAs?: TypographyTag
    /** Before the title, usually a navigation `IconButton` (menu or back). */
    start?: ReactNode
    /** After the title, usually a few action `IconButton`s. */
    end?: ReactNode
    /** `big` puts the title on its own, larger row below the buttons. @default 'normal' */
    size?: 'normal' | 'big'
    /** Center the title. Only for `size="normal"`. @default false */
    centered?: boolean
    /**
     * Color role from the theme. The default `container` gives the bar the
     * navigation color (the theme's `surface`), so it matches a
     * NavigationRail or NavigationDrawer beside it. @default 'container'
     */
    color?: ComponentColor
    /**
     * `filled` gives the bar a solid background. `text` makes it colorless,
     * the same color as the page. @default 'filled'
     */
    fillType?: ComponentFillType
}

/**
 * The bar across the top of a page or screen: title, navigation and actions.
 * The title is the `label` prop, not children.
 *
 * @example
 * <AppBar
 *     label="Inbox"
 *     labelAs="h1"
 *     start={<IconButton icon="menu" aria-label="Menu" fillType="text" color="container" />}
 *     end={<IconButton icon="search" aria-label="Search" fillType="text" color="container" />}
 * />
 */
export function AppBar({
    label,
    labelAs = 'div',
    start,
    end,
    size = 'normal',
    centered = false,
    // Not the library's usual primary: the bar frames the page, like navigation
    color = 'container',
    fillType = 'filled',
    className,
    ...props
}: AppBarProps) {
    return (
        <header
            {...props}
            className={cx(
                'avl-app-bar',
                colorClass(color, fillType),
                `avl-app-bar-size-${size}`,
                centered && size === 'normal' && 'avl-app-bar-centered',
                className
            )}
        >
            <div className="avl-app-bar-start">{start}</div>
            <Typography
                as={labelAs}
                type={size === 'big' ? 'h5' : 'h6'}
                className="avl-app-bar-label"
            >
                {label}
            </Typography>
            <div className="avl-app-bar-end">{end}</div>
        </header>
    )
}
