import './typography.css'

export type TypographyType =
    'body' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyProps = React.ComponentProps<'p'> & {
    type?: TypographyType
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
    className,
    ...props
}: TypographyProps) {
    const Tag = tags[type]

    return (
        <Tag
            {...props}
            className={
                `avl-typography avl-typography-${type}` +
                (className ? ` ${className}` : '')
            }
        />
    )
}
