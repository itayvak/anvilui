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
import './card.css'

type CardStyleProps = {
    fillType?: ComponentFillType
    color?: ComponentColor
}

// A plain card takes div props. A clickable card is a Base UI button, so it
// takes button props (disabled, focusableWhenDisabled, render, ...) instead.
export type CardProps =
    | (Omit<React.ComponentProps<'div'>, 'color'> &
          CardStyleProps & { clickable?: false })
    | (Omit<BaseButtonProps, 'color'> & CardStyleProps & { clickable: true })

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

// Defaults to the neutral container color: a filled primary card would swallow
// the primary buttons that usually sit inside it.
export function Card(props: CardProps) {
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

// Looks like an h6 but renders a div: the right heading level depends on the
// page, so pass `as` to make it one.
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

export function CardContent({ className, ...props }: CardContentProps) {
    return <div {...props} className={cx('avl-card-content', className)} />
}

export type CardActionsProps = React.ComponentProps<'div'>

export function CardActions({ className, ...props }: CardActionsProps) {
    return <div {...props} className={cx('avl-card-actions', className)} />
}
