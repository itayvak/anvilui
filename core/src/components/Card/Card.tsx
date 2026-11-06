import {
    Button as BaseButton,
    ButtonProps as BaseButtonProps,
} from '@base-ui/react/button'
import {
    ComponentColor,
    ComponentFillType,
    colorClass,
} from '../../colors/colors'
import { Typography, TypographyProps } from '../Typography/Typography'
import { cx, withClass } from '../../utils'
import { useContext } from 'react'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { checkRoot, OUTSIDE_ROOT } from '../../dev'
import './card.css'

type CardStyleProps = {
    /** How the color is applied. @default 'filled' */
    fillType?: ComponentFillType
    /**
     * Color role from the theme. Neutral by default, so primary buttons
     * inside still stand out. @default 'container'
     */
    color?: ComponentColor
}

// A plain card takes div props. A clickable card is a Base UI button, so it
// takes button props (disabled, focusableWhenDisabled, render, ...) instead.
export type CardProps =
    | (Omit<React.ComponentProps<'div'>, 'color'> &
          CardStyleProps & {
              /**
               * Make the whole card one button (or a link, with
               * `render={<a href="..." />}`). Buttons and links inside still
               * work on their own. @default false
               */
              clickable?: false
          })
    | (Omit<BaseButtonProps, 'color'> &
          CardStyleProps & {
              /**
               * Make the whole card one button (or a link, with
               * `render={<a href="..." />}`). Buttons and links inside still
               * work on their own. @default false
               */
              clickable: true
          })

type StaticCardProps = Extract<CardProps, { clickable?: false }>
type ClickableCardProps = Extract<CardProps, { clickable: true }>

// Clicks that start inside one of these belong to that element, not the card.
const nestedControls = [
    'a[href]',
    'button',
    'input',
    'select',
    'textarea',
    'label',
    'summary',
    '[contenteditable]',
    ...[
        'button',
        'link',
        'checkbox',
        'radio',
        'switch',
        'tab',
        'menuitem',
        'option',
        'combobox',
        'slider',
        'textbox',
        'spinbutton',
    ].map((role) => `[role="${role}"]`),
].join(',')

function isFromNestedControl(event: React.MouseEvent) {
    if (!(event.target instanceof Element)) return false
    const control = event.target.closest(nestedControls)
    return control !== null && control !== event.currentTarget
}

/**
 * A rounded surface that groups related content. Compose it from
 * `CardTitle`, `CardContent` and `CardActions` (there is no CardHeader or
 * CardFooter). Neutral `container` color by default.
 *
 * @example
 * <Card>
 *     <CardTitle as="h2">Storage</CardTitle>
 *     <CardContent>You've used 80% of your space.</CardContent>
 *     <CardActions>
 *         <Button fillType="text">Dismiss</Button>
 *         <Button>Upgrade</Button>
 *     </CardActions>
 * </Card>
 */
export function Card(props: CardProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Card', OUTSIDE_ROOT)
    }
    if (props.clickable) return <ClickableCard {...props} />
    return <StaticCard {...props} />
}

function StaticCard({
    clickable,
    color = 'container',
    fillType = 'filled',
    className,
    ...props
}: StaticCardProps) {
    return (
        <div
            {...props}
            className={cx('avl-card ' + colorClass(color, fillType), className)}
        />
    )
}

function ClickableCard({
    clickable,
    color = 'container',
    fillType,
    className,
    onClick,
    ...props
}: ClickableCardProps) {
    return (
        <BaseButton
            // a div, so buttons and links can sit inside; pass `render` for a link
            nativeButton={false}
            render={<div />}
            {...props}
            onClick={(event) => {
                if (!isFromNestedControl(event)) onClick?.(event)
            }}
            className={withClass(
                'avl-card avl-card-clickable ' + colorClass(color, fillType),
                className
            )}
        />
    )
}

export type CardTitleProps = TypographyProps

/**
 * The card's title. Looks like an h6 but renders a `<div>`: pass `as="h2"`
 * (or the level that fits the page) to make it a heading.
 */
export function CardTitle({
    type = 'h6',
    as = 'div',
    className,
    ...props
}: CardTitleProps) {
    return (
        <Typography
            {...props}
            type={type}
            as={as}
            className={cx('avl-card-title', className)}
        />
    )
}

export type CardContentProps = React.ComponentProps<'div'>

/** The card's body, with padding. */
export function CardContent({ className, ...props }: CardContentProps) {
    return <div {...props} className={cx('avl-card-content', className)} />
}

export type CardActionsProps = React.ComponentProps<'div'>

/** A row of buttons at the bottom of the card, aligned to the end. */
export function CardActions({ className, ...props }: CardActionsProps) {
    return <div {...props} className={cx('avl-card-actions', className)} />
}
