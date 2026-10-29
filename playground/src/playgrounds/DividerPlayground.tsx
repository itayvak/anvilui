import {
    Card,
    CardContent,
    CardTitle,
    Divider,
    IconButton,
    Typography,
} from 'anvilui'
import { Row, Section } from '../ui'

export function DividerPlayground() {
    return (
        <>
            <Section title="Horizontal">
                <Card style={{ maxWidth: 360 }}>
                    <CardTitle>Account</CardTitle>
                    <Divider />
                    <CardContent>
                        <Typography>
                            Signed in as someone@example.com
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography>Plan: Pro</Typography>
                    </CardContent>
                </Card>
            </Section>
            <Section title="Vertical">
                <Row>
                    <IconButton icon="format_bold" aria-label="Bold" />
                    <IconButton icon="format_italic" aria-label="Italic" />
                    <Divider orientation="vertical" />
                    <IconButton
                        icon="format_align_left"
                        aria-label="Align left"
                    />
                    <IconButton
                        icon="format_align_center"
                        aria-label="Align center"
                    />
                </Row>
            </Section>
        </>
    )
}
