import {
    Button,
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
            <Section title="With label">
                <div style={{ maxWidth: 360 }}>
                    <Divider label="or" />
                </div>
                <div style={{ maxWidth: 360 }}>
                    <Divider label="A much longer label in the middle" />
                </div>
                <Row>
                    <Button style={{ height: '150px' }}>Left</Button>
                    <Divider orientation="vertical" label="or" />
                    <Button style={{ height: '150px' }}>Right</Button>
                </Row>
            </Section>
            <Section title="Squiggly">
                <div style={{ maxWidth: 360 }}>
                    <Divider squiggly />
                </div>
                <div style={{ maxWidth: 360 }}>
                    <Divider squiggly label="Your changes" />
                </div>
                <Row>
                    <Button style={{ height: '150px' }}>Left</Button>
                    <Divider orientation="vertical" label="or" squiggly />
                    <Button style={{ height: '150px' }}>Right</Button>
                </Row>
            </Section>
        </>
    )
}
