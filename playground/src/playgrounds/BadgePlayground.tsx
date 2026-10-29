import { useState } from 'react'
import { Avatar, Badge, Button, Icon, IconButton, Typography } from 'anvilui'
import { Row, Section } from '../ui'

export function BadgePlayground() {
    const [count, setCount] = useState(3)

    return (
        <>
            <Section title="On things">
                <Row>
                    <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
                    <Button
                        fillType="outlined"
                        onClick={() => setCount((c) => Math.max(0, c - 1))}
                    >
                        −1
                    </Button>
                    <Button fillType="text" onClick={() => setCount(1200)}>
                        1200
                    </Button>
                    <Typography>count: {count} (0 hides it)</Typography>
                </Row>
                <Row>
                    <Badge count={count}>
                        <Icon name="mail" />
                    </Badge>
                    <Badge>
                        <Icon name="notifications" />
                    </Badge>
                    <Badge count={count}>
                        <IconButton
                            icon="mail"
                            fillType="text"
                            color="container"
                            aria-label={`Inbox, ${count} unread`}
                        />
                    </Badge>
                    <Badge>
                        <IconButton
                            icon="chat"
                            fillType="outlined"
                            color="container"
                            aria-label="Chat, new messages"
                        />
                    </Badge>
                    <Badge count={count}>
                        <Avatar name="Ada Lovelace" />
                    </Badge>
                    <Badge color="success">
                        <Avatar name="Grace Hopper" color="secondary" />
                    </Badge>
                </Row>
            </Section>
            <Section title="On its own">
                <Row>
                    <Typography>Inbox</Typography>
                    <Badge count={count} />
                    <Badge count={12} color="primary" />
                    <Badge />
                </Row>
            </Section>
        </>
    )
}
