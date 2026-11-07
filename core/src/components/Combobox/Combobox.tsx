import {
    useContext,
    useId,
    type CSSProperties,
    type ReactNode,
    type Ref,
} from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { cx, splitControlProps, withClass } from '../../utils'
import { checkRoot, devError } from '../../dev'
import '../Input/input.css'
import '../Menu/menu.css'
import '../Select/select.css'
import './combobox.css'

export type ComboboxProps<Item> = Omit<
    BaseCombobox.Root.Props<Item>,
    'children' | 'items'
> & {
    /** The options. Filtered against what's typed. */
    items?: readonly Item[]
    /** Renders each option, e.g. `(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>`. */
    children: (item: Item, index: number) => ReactNode
    /** Floating label. Sits inside the field and moves onto the border once it has focus or a value. */
    label?: ReactNode
    /** Hint text inside the field. With a `label`, only once the label has moved up. */
    placeholder?: string
    /** Shown in the popup when nothing matches. Without it, the popup hides. */
    empty?: ReactNode
    /**
     * `small` is shorter, and its label works like a placeholder: it hides
     * once there's text instead of moving onto the border. @default 'normal'
     */
    size?: 'small' | 'normal'
    /** Applied to the outer wrapper, so width and margins work as expected. */
    className?: string
    /** Applied to the outer wrapper, with `className`. */
    style?: CSSProperties
    /** The text `<input>`. */
    ref?: Ref<HTMLInputElement>
    /** The text `<input>`'s id. */
    id?: string
}

/**
 * A text field that filters a list of options as you type, and picks one.
 * The picked option is `value` / `defaultValue` / `onValueChange`. For
 * object items, pass `itemToStringLabel` so the field shows a readable label.
 * Children must be a function that renders one item.
 *
 * @example
 * <Combobox label="Country" items={countries} empty="No matches">
 *     {(country: string) => (
 *         <ComboboxItem key={country} value={country}>{country}</ComboboxItem>
 *     )}
 * </Combobox>
 */
export function Combobox<Item>({
    children,
    label,
    placeholder,
    empty,
    size = 'normal',
    className,
    style,
    ref,
    id,
    ...allProps
}: ComboboxProps<Item>) {
    // ARIA and data attributes describe the input; the Root renders no element
    const { control, rest: props } = splitControlProps(allProps)
    const avl = useContext(AnvilContext)
    if (process.env.NODE_ENV !== 'production') {
        checkRoot(avl !== null, 'Combobox')
        if (typeof children !== 'function')
            devError(
                '<Combobox> children must be a function that renders one item, plus an `items` array to filter.',
                '<Combobox label="Fruit" items={fruits}>\n    {(fruit: string) => <ComboboxItem key={fruit} value={fruit}>{fruit}</ComboboxItem>}\n</Combobox>',
                'combobox.md'
            )
    }
    const generatedId = useId()
    const inputId = id ?? generatedId
    const labelId = useId()

    return (
        <BaseCombobox.Root {...props}>
            {/* Same structure and classes as Input, so it looks the same */}
            <BaseCombobox.InputGroup
                style={style}
                className={cx(
                    'avl-input',
                    'avl-combobox',
                    `avl-input-size-${size}`,
                    label != null && 'avl-input-labeled',
                    className
                )}
            >
                {/* A placeholder is needed for :placeholder-shown, which floats the label. */}
                <BaseCombobox.Input
                    {...control}
                    ref={ref}
                    id={inputId}
                    className="avl-input-field"
                    placeholder={placeholder ?? ' '}
                />
                {label != null && (
                    <label
                        id={labelId}
                        htmlFor={inputId}
                        className="avl-input-label"
                    >
                        {label}
                    </label>
                )}
                <BaseCombobox.Trigger
                    className="avl-combobox-trigger"
                    aria-labelledby={label != null ? labelId : undefined}
                >
                    <Icon name="arrow_drop_down" className="avl-select-icon" />
                </BaseCombobox.Trigger>
                <fieldset aria-hidden className="avl-input-outline">
                    <legend>
                        {label != null && size === 'normal' && (
                            <span>{label}</span>
                        )}
                    </legend>
                </fieldset>
            </BaseCombobox.InputGroup>
            {/* Into the AnvilRoot, not body, so the popup sees the theme variables */}
            <BaseCombobox.Portal container={avl?.rootRef}>
                <BaseCombobox.Positioner
                    className="avl-menu-positioner"
                    sideOffset={4}
                >
                    <BaseCombobox.Popup className="avl-menu-popup avl-select-popup avl-combobox-popup">
                        {empty != null && (
                            <BaseCombobox.Empty className="avl-combobox-empty">
                                {empty}
                            </BaseCombobox.Empty>
                        )}
                        <BaseCombobox.List>{children}</BaseCombobox.List>
                    </BaseCombobox.Popup>
                </BaseCombobox.Positioner>
            </BaseCombobox.Portal>
        </BaseCombobox.Root>
    )
}

export type ComboboxItemProps = BaseCombobox.Item.Props

/** One option in a `Combobox`. Needs a `value` (the item); children are its label. */
export function ComboboxItem({
    className,
    children,
    ...props
}: ComboboxItemProps) {
    return (
        <BaseCombobox.Item
            {...props}
            className={withClass('avl-menu-item avl-select-item', className)}
        >
            <span className="avl-menu-item-label">{children}</span>
            <BaseCombobox.ItemIndicator className="avl-select-item-indicator">
                <Icon name="check" />
            </BaseCombobox.ItemIndicator>
        </BaseCombobox.Item>
    )
}
