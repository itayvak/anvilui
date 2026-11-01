import { Icon, List, ListItem, Typography } from 'anvilui'
import { demos } from './demos'

const slugs = Object.keys(demos)

export function DemosPage() {
    return (
        <>
            <Typography type="h4" as="h1">
                Demos
            </Typography>
            {slugs.length === 0 ? (
                <Typography>No demos yet.</Typography>
            ) : (
                <List divided>
                    {slugs.map((slug) => (
                        <ListItem
                            key={slug}
                            render={<a href={`/demos/${slug}`} />}
                            label={demos[slug].title}
                            description={demos[slug].description}
                            end={<Icon name="chevron_right" />}
                        />
                    ))}
                </List>
            )}
        </>
    )
}
