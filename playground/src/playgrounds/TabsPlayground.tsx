import { useState } from 'react'
import { Tabs, TabsList, TabsPanel, TabsTab, Typography } from 'anvilui'
import { Section } from '../ui'

export function TabsPlayground() {
    const [value, setValue] = useState<string | number | null>('music')

    return (
        <>
            <Section title="Text">
                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabsTab value="overview">Overview</TabsTab>
                        <TabsTab value="specs">Specifications</TabsTab>
                        <TabsTab value="reviews">Reviews</TabsTab>
                        <TabsTab value="soon" disabled>
                            Coming soon
                        </TabsTab>
                    </TabsList>
                    <TabsPanel value="overview">
                        <Typography>Overview content.</Typography>
                    </TabsPanel>
                    <TabsPanel value="specs">
                        <Typography>Specifications content.</Typography>
                    </TabsPanel>
                    <TabsPanel value="reviews">
                        <Typography>Reviews content.</Typography>
                    </TabsPanel>
                </Tabs>
            </Section>
            <Section title="With icons, controlled">
                <Tabs value={value} onValueChange={setValue}>
                    <TabsList>
                        <TabsTab value="music" icon="music_note">
                            Music
                        </TabsTab>
                        <TabsTab value="podcasts" icon="podcasts">
                            Podcasts
                        </TabsTab>
                        <TabsTab value="books" icon="menu_book">
                            Audiobooks
                        </TabsTab>
                    </TabsList>
                    <TabsPanel value="music">
                        <Typography>Music</Typography>
                    </TabsPanel>
                    <TabsPanel value="podcasts">
                        <Typography>Podcasts</Typography>
                    </TabsPanel>
                    <TabsPanel value="books">
                        <Typography>Audiobooks</Typography>
                    </TabsPanel>
                </Tabs>
                <Typography>value: {String(value)}</Typography>
            </Section>
            <Section title="Many tabs (scrolls)">
                <Tabs defaultValue="1" style={{ maxWidth: 360 }}>
                    <TabsList>
                        {Array.from({ length: 10 }, (_, i) => (
                            <TabsTab key={i} value={String(i + 1)}>
                                Tab {i + 1}
                            </TabsTab>
                        ))}
                    </TabsList>
                </Tabs>
            </Section>
        </>
    )
}
