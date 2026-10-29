import { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    Input,
    Typography,
    useSnackbar,
} from 'anvilui'
import { Row, Section } from '../ui'

export function DialogPlayground() {
    const snackbar = useSnackbar()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Section title="Examples">
                <Row>
                    <Dialog>
                        <DialogTrigger render={<Button color="error" />}>
                            Delete
                        </DialogTrigger>
                        <DialogPopup>
                            <DialogTitle>Delete this file?</DialogTitle>
                            <DialogDescription>
                                It will be moved to the trash and removed for
                                good after 30 days.
                            </DialogDescription>
                            <DialogActions>
                                <DialogClose
                                    render={<Button fillType="text" />}
                                >
                                    Cancel
                                </DialogClose>
                                <DialogClose
                                    render={<Button color="error" />}
                                    onClick={() =>
                                        snackbar.show({ message: 'Deleted' })
                                    }
                                >
                                    Delete
                                </DialogClose>
                            </DialogActions>
                        </DialogPopup>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger render={<Button fillType="outlined" />}>
                            Form
                        </DialogTrigger>
                        <DialogPopup>
                            <DialogTitle>Rename</DialogTitle>
                            <Input label="Name" defaultValue="Report.pdf" />
                            <DialogActions>
                                <DialogClose
                                    render={<Button fillType="text" />}
                                >
                                    Cancel
                                </DialogClose>
                                <DialogClose render={<Button />}>
                                    Save
                                </DialogClose>
                            </DialogActions>
                        </DialogPopup>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger render={<Button fillType="outlined" />}>
                            Long content
                        </DialogTrigger>
                        <DialogPopup>
                            <DialogTitle>Terms</DialogTitle>
                            {Array.from({ length: 30 }, (_, i) => (
                                <DialogDescription key={i}>
                                    Paragraph {i + 1}. The dialog stops at the
                                    screen edge and scrolls inside.
                                </DialogDescription>
                            ))}
                            <DialogActions>
                                <DialogClose render={<Button />}>
                                    Accept
                                </DialogClose>
                            </DialogActions>
                        </DialogPopup>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger render={<Button fillType="outlined" />}>
                            Nested
                        </DialogTrigger>
                        <DialogPopup>
                            <DialogTitle>First dialog</DialogTitle>
                            <DialogDescription>
                                Open another on top of this one.
                            </DialogDescription>
                            <DialogActions>
                                <DialogClose
                                    render={<Button fillType="text" />}
                                >
                                    Close
                                </DialogClose>
                                <Dialog>
                                    <DialogTrigger render={<Button />}>
                                        Open second
                                    </DialogTrigger>
                                    <DialogPopup>
                                        <DialogTitle>Second dialog</DialogTitle>
                                        <DialogActions>
                                            <DialogClose render={<Button />}>
                                                Back
                                            </DialogClose>
                                        </DialogActions>
                                    </DialogPopup>
                                </Dialog>
                            </DialogActions>
                        </DialogPopup>
                    </Dialog>
                </Row>
            </Section>
            <Section title="Controlled">
                <Row>
                    <Button onClick={() => setOpen(true)}>
                        Open from state
                    </Button>
                    <Typography>open: {String(open)}</Typography>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogPopup>
                            <DialogTitle>Controlled</DialogTitle>
                            <DialogDescription>
                                Opened without a DialogTrigger.
                            </DialogDescription>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                            </DialogActions>
                        </DialogPopup>
                    </Dialog>
                </Row>
            </Section>
        </>
    )
}
