import { List, ListItem, Typography } from 'anvilui'
import { typographyTypes } from '../options'
import { Section } from '../ui'

export function TypographyPlayground() {
    return (
        <Section title="Types">
            <List>
                {typographyTypes.map((type) => (
                    <ListItem
                        key={type}
                        label={
                            <Typography type={type}>
                                The quick brown fox
                            </Typography>
                        }
                        description={type}
                    />
                ))}
            </List>
        </Section>
    )
}
