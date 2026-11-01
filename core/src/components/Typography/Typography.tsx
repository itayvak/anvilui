import { cx } from '../../utils'
import './typography.css'

export type TypographyType =
    'body' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyTag =
    'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyProps = React.ComponentProps<'p'> & {
    /** The look. */
    type?: TypographyType
    /** The HTML tag, when it should differ from the look (e.g. an h2 styled as h6). */
    as?: TypographyTag
}

const tags = {
    body: 'p',
    caption: 'span',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
} as const

export function Typography({
    type = 'body',
    as,
    className,
    ...props
}: TypographyProps) {
    // All these tags share the same props; tell JSX so it can type `ref`.
    const Tag = (as ?? tags[type]) as 'p'

    return (
        <Tag
            {...props}
            className={cx(`avl-typography avl-typography-${type}`, className)}
        />
    )
}
