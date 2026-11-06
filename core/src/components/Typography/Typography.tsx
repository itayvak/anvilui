import { cx } from '../../utils'
import { useContext } from 'react'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { checkProp, checkRoot, OUTSIDE_ROOT } from '../../dev'
import './typography.css'

export type TypographyType =
    'body' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyTag =
    'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyProps = React.ComponentProps<'p'> & {
    /**
     * The look (what other libraries call `variant`). Also picks the tag:
     * `h1`–`h6` render that heading, `body` a `<p>`, `caption` a `<span>`.
     * @default 'body'
     */
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

/**
 * Text in the theme's type scale.
 *
 * @example
 * <Typography type="h1">Settings</Typography>
 * <Typography type="h6" as="h2">Notifications</Typography>
 * <Typography type="caption">Updated 2 min ago</Typography>
 */
export function Typography({
    type = 'body',
    as,
    className,
    ...props
}: TypographyProps) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Typography', OUTSIDE_ROOT)
        checkProp(
            props,
            'variant',
            'Typography',
            'Use `type` for the look and `as` for the tag.',
            '<Typography type="h4" as="h1">Title</Typography>\n// type: body | caption | h1 | h2 | h3 | h4 | h5 | h6',
            'typography.md'
        )
    }
    // All these tags share the same props; tell JSX so it can type `ref`.
    const Tag = (as ?? tags[type]) as 'p'

    return (
        <Tag
            {...props}
            className={cx(`avl-typography avl-typography-${type}`, className)}
        />
    )
}
