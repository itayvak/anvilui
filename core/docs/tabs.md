# Tabs

Horizontal tabs with a sliding underline.

```ts
import { Tabs, TabsList, TabsTab, TabsPanel } from 'anvilui'
import type {
    TabsProps,
    TabsListProps,
    TabsTabProps,
    TabsPanelProps,
} from 'anvilui'
```

| Part | Renders | Props |
| --- | --- | --- |
| `Tabs` | `<div>` | `value` / `defaultValue` / `onValueChange(value, details)` |
| `TabsList` | row of tabs | |
| `TabsTab` | `<button>` | `value` (required), `icon?: MaterialSymbol`, `disabled` |
| `TabsPanel` | `<div>` | `value` (matches its tab), `keepMounted` |

There is **no** `TabsTrigger` or `TabsContent`. Horizontal only (no `orientation`).

**Always pass `defaultValue` (or `value`).** Base UI's default is `0`, so with string tab values and no default, no tab is selected.

```tsx
import { useState } from 'react'
import { Tabs, TabsList, TabsPanel, TabsTab } from 'anvilui'

export function Example() {
    const [tab, setTab] = useState<string>('account')
    return (
        <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
                <TabsTab value="account" icon="person">
                    Account
                </TabsTab>
                <TabsTab value="security" icon="lock">
                    Security
                </TabsTab>
            </TabsList>
            <TabsPanel value="account" style={{ padding: 16 }}>
                Account settings
            </TabsPanel>
            <TabsPanel value="security" style={{ padding: 16 }}>
                Security settings
            </TabsPanel>
        </Tabs>
    )
}
```
