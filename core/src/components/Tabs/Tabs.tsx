import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { MaterialSymbol } from 'material-symbols'
import { Icon } from '../Icon/Icon'
import { withClass } from '../../utils'
import './tabs.css'

/** Holds the selected tab: `value` / `defaultValue` / `onValueChange`. Horizontal only. */
export type TabsProps = Omit<BaseTabs.Root.Props, 'orientation'>

/**
 * Tabs. Put a `TabsList` of `TabsTab`s, then one `TabsPanel` per tab with
 * the same `value`. There is no TabsTrigger or TabsContent.
 *
 * @example
 * <Tabs defaultValue="account">
 *     <TabsList>
 *         <TabsTab value="account">Account</TabsTab>
 *         <TabsTab value="billing">Billing</TabsTab>
 *     </TabsList>
 *     <TabsPanel value="account">...</TabsPanel>
 *     <TabsPanel value="billing">...</TabsPanel>
 * </Tabs>
 */
export function Tabs({ className, ...props }: TabsProps) {
    return (
        <BaseTabs.Root
            {...props}
            className={withClass('avl-tabs', className)}
        />
    )
}

export type TabsListProps = BaseTabs.List.Props

/** The row of tabs. Draws the sliding underline under the selected one. */
export function TabsList({ className, children, ...props }: TabsListProps) {
    return (
        <BaseTabs.List
            {...props}
            className={withClass('avl-tabs-list', className)}
        >
            {children}
            <BaseTabs.Indicator className="avl-tabs-indicator" />
        </BaseTabs.List>
    )
}

export type TabsTabProps = BaseTabs.Tab.Props & {
    /** Material Symbol shown above the label. */
    icon?: MaterialSymbol
}

/** One tab button. Give it a `value` matching its `TabsPanel`. */
export function TabsTab({ icon, className, children, ...props }: TabsTabProps) {
    return (
        <BaseTabs.Tab
            {...props}
            className={withClass('avl-tabs-tab', className)}
        >
            {/* Hover and press tint this, not the whole tab */}
            <span className="avl-tabs-tab-content">
                {icon && <Icon name={icon} />}
                <span className="avl-tabs-tab-label">{children}</span>
            </span>
        </BaseTabs.Tab>
    )
}

export type TabsPanelProps = BaseTabs.Panel.Props

/** Content for one tab: give it the same `value` as its `TabsTab`. */
export function TabsPanel({ className, ...props }: TabsPanelProps) {
    return (
        <BaseTabs.Panel
            {...props}
            className={withClass('avl-tabs-panel', className)}
        />
    )
}
