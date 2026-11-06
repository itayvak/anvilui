import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { withClass } from '../../utils'
import './menubar.css'

export type MenubarProps = BaseMenubar.Props

/**
 * A row of menus, like File / Edit / View in a desktop app. Put a `Menu` per
 * entry inside, each with a `MenuTrigger` and a `MenuPopup`. Arrow keys move
 * between menus, and once one is open, hovering another opens it instead.
 *
 * @example
 * <Menubar>
 *     <Menu>
 *         <MenuTrigger>File</MenuTrigger>
 *         <MenuPopup><MenuItem onClick={save}>Save</MenuItem></MenuPopup>
 *     </Menu>
 * </Menubar>
 */
export function Menubar({ className, ...props }: MenubarProps) {
    return (
        <BaseMenubar
            {...props}
            className={withClass('avl-menubar', className)}
        />
    )
}
