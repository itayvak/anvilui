import { useContext, type ReactNode } from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { AnvilContext } from '../AnvilRoot/AnvilContext'
import { Icon } from '../Icon/Icon'
import { cx, withClass } from '../../utils'
import '../Input/input.css'
import '../Menu/menu.css'
import './select.css'

export type SelectProps<
    Value,
    Multiple extends boolean | undefined = false,
> = BaseSelect.Root.Props<Value, Multiple> & {
    /** Floating label. Sits inside the field and moves onto the border once it's focused or has a value. */
    label?: ReactNode
    /** Shown when nothing is selected. With a `label`, only once the label has moved up. */
    placeholder?: ReactNode
    /**
     * `small` is shorter, and its label works like a placeholder: it hides
     * once a value is selected instead of moving onto the border. @default 'normal'
     */
    size?: 'small' | 'normal'
    /** Applied to the outer wrapper, so width and margins work as expected. */
    className?: string
}

/**
 * Put `SelectItem`s inside. Pass `items` (value → label) so the field shows
 * the selected item's label rather than its raw value.
 */
export function Select<Value, Multiple extends boolean | undefined = false>({
    label,
    placeholder,
    size = 'normal',
    className,
    children,
    ...props
}: SelectProps<Value, Multiple>) {
    const avl = useContext(AnvilContext)

    return (
        <BaseSelect.Root {...props}>
            {/* Same structure and classes as Input, so it looks the same */}
            <div
                className={cx(
                    'avl-input',
                    'avl-select',
                    `avl-input-size-${size}`,
                    label != null && 'avl-input-labeled',
                    className
                )}
            >
                <BaseSelect.Trigger className="avl-input-field avl-select-trigger">
                    <BaseSelect.Value
                        className="avl-select-value"
                        placeholder={placeholder}
                    />
                    <BaseSelect.Icon className="avl-select-icon">
                        <Icon name="arrow_drop_down" />
                    </BaseSelect.Icon>
                </BaseSelect.Trigger>
                {label != null && (
                    <BaseSelect.Label className="avl-input-label">
                        {label}
                    </BaseSelect.Label>
                )}
                <fieldset aria-hidden className="avl-input-outline">
                    <legend>
                        {label != null && size === 'normal' && (
                            <span>{label}</span>
                        )}
                    </legend>
                </fieldset>
            </div>
            {/* Into the AnvilRoot, not body, so the popup sees the theme variables */}
            <BaseSelect.Portal container={avl?.rootRef}>
                <BaseSelect.Positioner
                    className="avl-menu-positioner"
                    // Open below the field like Material, not over it like macOS
                    alignItemWithTrigger={false}
                    sideOffset={4}
                >
                    <BaseSelect.Popup className="avl-menu-popup avl-select-popup">
                        {children}
                    </BaseSelect.Popup>
                </BaseSelect.Positioner>
            </BaseSelect.Portal>
        </BaseSelect.Root>
    )
}

export type SelectItemProps = BaseSelect.Item.Props

export function SelectItem({ className, children, ...props }: SelectItemProps) {
    return (
        <BaseSelect.Item
            {...props}
            className={withClass('avl-menu-item avl-select-item', className)}
        >
            <BaseSelect.ItemText className="avl-menu-item-label">
                {children}
            </BaseSelect.ItemText>
            <BaseSelect.ItemIndicator className="avl-select-item-indicator">
                <Icon name="check" />
            </BaseSelect.ItemIndicator>
        </BaseSelect.Item>
    )
}
