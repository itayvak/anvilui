import { useContext, type ReactNode } from 'react'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { MaterialSymbol } from 'material-symbols'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { cx, withClass } from '../../utils'
import { checkName, checkRoot, devError } from '../../dev'
import '../Menu/menu.css'
import './search.css'

export type SearchProps<Item> = Omit<
    BaseAutocomplete.Root.Props<Item>,
    'children' | 'items'
> & {
    /** The suggestions. Filtered against what's typed. */
    items?: readonly Item[]
    /** Renders each suggestion, e.g. `(item) => <SearchItem key={item} value={item}>{item}</SearchItem>`. */
    children: (item: Item, index: number) => ReactNode
    /** Hint text inside the bar, e.g. "Search mail". */
    placeholder?: string
    /** There's no visible label, so the input needs a name for screen readers. */
    'aria-label': string
    /** Shown in the popup when nothing matches. Without it, the popup hides. */
    empty?: ReactNode
    /** Accessible name of the clear button. @default 'Clear' */
    clearLabel?: string
    /** Applied to the bar, so width and margins work as expected. */
    className?: string
}

/**
 * Material 3 search bar with a list of suggestions under it. Pass `items`
 * and it filters them as you type. The typed text is `value` /
 * `defaultValue` / `onValueChange`. Children must be a function that renders
 * one suggestion.
 *
 * @example
 * <Search aria-label="Search mail" placeholder="Search mail" items={recent} value={query} onValueChange={setQuery}>
 *     {(item: string) => <SearchItem key={item} value={item} startIcon="history">{item}</SearchItem>}
 * </Search>
 */
export function Search<Item>({
    children,
    placeholder,
    'aria-label': ariaLabel,
    empty,
    clearLabel = 'Clear',
    className,
    ...props
}: SearchProps<Item>) {
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Search')
        checkName(
            { 'aria-label': ariaLabel },
            'Search',
            '<Search aria-label="Search mail" items={items}>{(item) => ...}</Search>',
            'search.md'
        )
        if (typeof children !== 'function')
            devError(
                '<Search> children must be a function that renders one suggestion, plus an `items` array to filter.',
                '<Search aria-label="Search" items={items}>\n    {(item: string) => <SearchItem key={item} value={item}>{item}</SearchItem>}\n</Search>',
                'search.md'
            )
    }

    return (
        <BaseAutocomplete.Root {...props}>
            <BaseAutocomplete.InputGroup
                className={cx('avl-search', className)}
            >
                <Icon name="search" />
                <BaseAutocomplete.Input
                    className="avl-search-input"
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                />
                <BaseAutocomplete.Clear
                    render={
                        <IconButton
                            icon="close"
                            fillType="text"
                            color="container"
                            aria-label={clearLabel}
                        />
                    }
                />
            </BaseAutocomplete.InputGroup>
            {/* Into the AnvilRoot, not body, so the popup sees the theme variables */}
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
