import { useState } from 'react'
import type { MaterialSymbol } from 'material-symbols'
import {
    AppBar,
    Divider,
    IconButton,
    NavigationDrawer,
    NavigationDrawerItem,
    NavigationDrawerPopup,
    NavigationDrawerTitle,
    NavigationDrawerTrigger,
    Typography,
} from 'anvilui'
import { Section, Stack } from '../ui'

const mail: { icon: MaterialSymbol; label: string; count?: number }[] = [
    { icon: 'inbox', label: 'Inbox', count: 24 },
    { icon: 'send', label: 'Sent' },
    { icon: 'draft', label: 'Drafts', count: 2 },
    { icon: 'delete', label: 'Trash' },
]
const labels: { icon: MaterialSymbol; label: string }[] = [
    { icon: 'label', label: 'Family' },
    { icon: 'label', label: 'Work' },
]

export function NavigationDrawerPlayground() {
    const [current, setCurrent] = useState('Inbox')

    const item = (page: {
        icon: MaterialSymbol
        label: string
        count?: number
    }) => (
        <NavigationDrawerItem
            key={page.label}
            icon={page.icon}
            label={page.label}
            end={page.count}
            href="#"
            active={current === page.label}
            onClick={(e) => {
                e.preventDefault()
                setCurrent(page.label)
            }}
        />
    )

    return (
        <Section title="In an app bar">
            <Stack style={{ maxWidth: 412, border: '1px dashed gray' }}>
                <NavigationDrawer>
                    <AppBar
                        label={current}
                        start={
                            <NavigationDrawerTrigger
                                render={
                                    <IconButton
                                        icon="menu"
                                        fillType="text"
                                        color="container"
                                        aria-label="Open navigation"
                                    />
                                }
                            />
                        }
                    />
                    <NavigationDrawerPopup>
                        <NavigationDrawerTitle>Mail</NavigationDrawerTitle>
                        {mail.map(item)}
                        <Divider style={{ margin: '8px 16px' }} />
                        {/* A section heading, not a second Title: the Title
                            names the whole drawer for screen readers */}
                        <Typography
                            as="h3"
                            type="caption"
                            style={{ padding: '8px 16px' }}
                        >
                            Labels
                        </Typography>
                        {labels.map(item)}
                    </NavigationDrawerPopup>
                </NavigationDrawer>
                <Typography style={{ padding: 16 }}>
                    Page: {current}. Open the menu; picking an item closes it.
                </Typography>
            </Stack>
        </Section>
    )
}
