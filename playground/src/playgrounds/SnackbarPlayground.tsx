import { useRef, useState } from 'react'
import { Button, Typography, useSnackbar } from 'anvilui'
import { Row, Section } from '../ui'

export function SnackbarPlayground() {
    const snackbar = useSnackbar()
    const [undone, setUndone] = useState(0)
    const count = useRef(0)

    return (
        <Section title="Show a snackbar">
            <Row>
                <Button
                    onClick={() => snackbar.show({ message: 'Message sent' })}
                >
                    Simple
                </Button>
                <Button
                    onClick={() =>
                        snackbar.show({
                            message: 'Item deleted',
                            action: {
                                label: 'Undo',
                                onClick: () => setUndone((n) => n + 1),
                            },
                        })
                    }
                >
                    With action
                </Button>
                <Button
                    onClick={() =>
                        snackbar.show({
                            message: 'Stays until you close it',
                            closeButton: true,
                            timeout: 0,
                        })
                    }
                >
                    Close button, no timeout
                </Button>
                <Button
                    onClick={() =>
                        snackbar.show({
                            message:
                                'A longer message that wraps onto a second line when the screen is narrow enough',
                            action: { label: 'Retry', onClick: () => {} },
                            closeButton: true,
                        })
                    }
                >
                    Long
                </Button>
                <Button
                    fillType="outlined"
                    onClick={() =>
                        snackbar.show({
                            message: `Snackbar #${++count.current}`,
                        })
                    }
                >
                    Add another
                </Button>
                <Button fillType="text" onClick={() => snackbar.close()}>
                    Close all
                </Button>
            </Row>
            <Row>
                <Typography>Undo clicked: {undone}</Typography>
            </Row>
        </Section>
    )
}
