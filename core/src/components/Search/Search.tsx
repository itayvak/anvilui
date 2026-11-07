import { useContext, type CSSProperties, type ReactNode, type Ref } from 'react'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { colorClass } from '../../colors/colors'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { cx, splitControlProps, withClass } from '../../utils'
import { checkName, checkRoot, devError } from '../../dev'
import '../Menu/menu.css'
import './search.css'

export type SearchProps<Item> = Omit<
    BaseAutocomplete.Root.Props<Item>,
    'children' | 'items'
> & {
    /** The suggestions. Filtered against what's typed. */
    items?: readonly Item[]
    /**
     * Renders each suggestion, e.g. `(item) => <SearchItem key={item} value={item}>{item}</SearchItem>`.
     * Leave it out for a plain search bar with no suggestion list.
     */
    children?: (item: Item, index: number) => ReactNode
    /** Hint text inside the bar, e.g. "Search mail". */
    placeholder?: string
    /** There's no visible label, so the input needs a name for screen readers. */
    'aria-label': string
    /** Shown in the popup when nothing matches. Without it, the popup hides. */
    empty?: ReactNode
    /**
     * The bar's background. Use `'container'` when the bar sits on a
     * `surface` panel, like a navigation drawer, so it doesn't blend in.
     * @default 'surface'
     */
    color?: 'surface' | 'container'
    /** Accessible name of the clear button. @default 'Clear' */
    clearLabel?: string
    /** Applied to the bar, so width and margins work as expected. */
    className?: string
    /** Applied to the bar, with `className`. */
    style?: CSSProperties
    /** The text `<input>`. */
    ref?: Ref<HTMLInputElement>
    /** The text `<input>`'s id. */
    id?: string
}

/**
 * Material 3 search bar with a list of suggestions under it. Pass `items`
 * and it filters them as you type. The typed text is `value` /
 * `defaultValue` / `onValueChange`. Children are a function that renders one
 * suggestion; without them it's a plain search bar that never opens a list.
 *
 * @example
 * <Search aria-label="Filter people" value={query} onValueChange={setQuery} />
 * <Search aria-label="Search mail" placeholder="Search mail" items={recent} value={query} onValueChange={setQuery}>
 *     {(item: string) => <SearchItem key={item} value={item} startIcon="history">{item}</SearchItem>}
 * </Search>
 */
export function Search<Item>({
    children,
    placeholder,
    'aria-label': ariaLabel,
    empty,
    color = 'surface',
    clearLabel = 'Clear',
    className,
    style,
    ref,
    id,
    ...allProps
}: SearchProps<Item>) {
    // ARIA and data attributes describe the input; the Root renders no element
    const { control, rest: props } = splitControlProps(allProps)
    const avl = useContext(AnvilContext)
    // No children: a plain search bar, whose list stays closed
    const suggests = children !== undefined
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Search')
        checkName(
            { 'aria-label': ariaLabel },
            'Search',
            '<Search aria-label="Search mail" items={items}>{(item) => ...}</Search>',
            'search.md'
        )
        if (children !== undefined && typeof children !== 'function')
            devError(
                '<Search> children must be a function that renders one suggestion, plus an `items` array to filter.',
                '<Search aria-label="Search" items={items}>\n    {(item: string) => <SearchItem key={item} value={item}>{item}</SearchItem>}\n</Search>',
                'search.md'
            )
        if (children === undefined && props.items?.length)
            devError(
                '<Search> has `items` but no children, so the suggestions never show.',
                '<Search aria-label="Search" items={items}>\n    {(item: string) => <SearchItem key={item} value={item}>{item}</SearchItem>}\n</Search>',
                'search.md'
            )
    }

    return (
        <BaseAutocomplete.Root {...props} {...(!suggests && { open: false })}>
            <BaseAutocomplete.InputGroup
                style={style}
                className={cx(
                    'avl-search',
                    colorClass(color, 'filled'),
                    className
                )}
            >
                <Icon name="search" />
                <BaseAutocomplete.Input
                    {...control}
                    ref={ref}
                    id={id}
                    className="avl-search-input"
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                />
                <BaseAutocomplete.Clear
                    render={
                        <IconButton
                            icon="close"
                            fillType="text"
                            color={color}
                            aria-label={clearLabel}
                        />
                    }
                />
            </BaseAutocomplete.InputGroup>
            {/* Into the AnvilRoot, not body, so the popup sees the theme variables */}
            {suggests && (
                <BaseAutocomplete.Portal container={avl?.rootRef}>
                    <BaseAutocomplete.Positioner
                        className="avl-menu-positioner"
                        sideOffset={4}
                    >
                        <BaseAutocomplete.Popup className="avl-menu-popup avl-search-popup">
                            {empty != null && (
                                <BaseAutocomplete.Empty className="avl-search-empty">
                                    {empty}
                                </BaseAutocomplete.Empty>
                            )}
                            <BaseAutocomplete.List>
                                {children}
                            </BaseAutocomplete.List>
                        </BaseAutocomplete.Popup>
                    </BaseAutocomplete.Positioner>
                </BaseAutocomplete.Portal>
            )}
        </BaseAutocomplete.Root>
    )
}

export type SearchItemProps = BaseAutocomplete.Item.Props & {
    /** Material Symbol before the text, e.g. `history` for a recent search. */
    startIcon?: MaterialSymbol
}

/** One suggestion in a `Search`. Needs a `value`. Picking it fills the bar with its text. */
export function SearchItem({
    startIcon,
    className,
    children,
    ...props
}: SearchItemProps) {
    return (
        <BaseAutocomplete.Item
            {...props}
            className={withClass('avl-menu-item', className)}
        >
            {startIcon && <Icon name={startIcon} />}
            <span className="avl-menu-item-label">{children}</span>
        </BaseAutocomplete.Item>
    )
}
