import { cx } from '../../utils'
import './split-button.css'

export type SplitButtonProps = React.ComponentProps<'div'>

/**
 * Joins `Button`s (and `IconButton`s) into one segmented group with shared
 * rounded ends. Style each button yourself; the group only lays them out.
 *
 * @example
 * <SplitButton>
 *     <Button>Save</Button>
 *     <Menu>
 *         <MenuTrigger render={<IconButton icon="arrow_drop_down" aria-label="More save options" />} />
 *         <MenuPopup>...</MenuPopup>
 *     </Menu>
 * </SplitButton>
 */
export function SplitButton({ className, ...props }: SplitButtonProps) {
    return (
        <div
            role="group"
            {...props}
            className={cx('avl-split-button', className)}
        />
    )
}
