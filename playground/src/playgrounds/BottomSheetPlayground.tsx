import { useState } from 'react'
import {
    BottomSheet,
    BottomSheetClose,
    BottomSheetDescription,
    BottomSheetPopup,
    BottomSheetTitle,
    BottomSheetTrigger,
    Button,
    Divider,
    Typography,
    useSnackbar,
} from 'anvilui'
import { Row, Section } from '../ui'

const options = ['Share', 'Copy link', 'Edit', 'Delete']

export function BottomSheetPlayground() {
    const snackbar = useSnackbar()
    const [open, setOpen] = useState(false)

    return (
        <Section title="Examples">
            <Row>
                <BottomSheet>
                    <BottomSheetTrigger render={<Button />}>
                        Options
                    </BottomSheetTrigger>
                    <BottomSheetPopup>
                        <BottomSheetTitle>Photo options</BottomSheetTitle>
                        <Divider />
                        {options.map((option) => (
                            <BottomSheetClose
                                key={option}
                                render={<Button fillType="text" />}
                                onClick={() =>
                                    snackbar.show({ message: option })
                                }
                            >
                                {option}
                            </BottomSheetClose>
                        ))}
                    </BottomSheetPopup>
                </BottomSheet>

                <BottomSheet>
                    <BottomSheetTrigger render={<Button fillType="outlined" />}>
                        Long content
                    </BottomSheetTrigger>
                    <BottomSheetPopup>
                        <BottomSheetTitle>Terms</BottomSheetTitle>
                        {Array.from({ length: 30 }, (_, i) => (
                            <BottomSheetDescription key={i}>
                                Paragraph {i + 1}. Scrolls inside the sheet once
                                it reaches the top of the screen.
                            </BottomSheetDescription>
                        ))}
                        <BottomSheetClose render={<Button />}>
                            Accept
                        </BottomSheetClose>
                    </BottomSheetPopup>
                </BottomSheet>

                <BottomSheet snapPoints={[0.4, 1]}>
                    <BottomSheetTrigger render={<Button fillType="outlined" />}>
                        Snap points
                    </BottomSheetTrigger>
                    <BottomSheetPopup>
                        <BottomSheetTitle>Half, then full</BottomSheetTitle>
                        <BottomSheetDescription>
                            Opens at 40% of the screen. Drag up for full height,
                            or down to close.
                        </BottomSheetDescription>
                        {Array.from({ length: 20 }, (_, i) => (
                            <Typography key={i}>Row {i + 1}</Typography>
                        ))}
                    </BottomSheetPopup>
                </BottomSheet>

                <Button fillType="text" onClick={() => setOpen(true)}>
                    Open from state
                </Button>
                <BottomSheet open={open} onOpenChange={setOpen}>
                    <BottomSheetPopup>
                        <BottomSheetTitle>Controlled</BottomSheetTitle>
                        <BottomSheetDescription>
                            Opened without a trigger. open: {String(open)}
                        </BottomSheetDescription>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </BottomSheetPopup>
                </BottomSheet>
            </Row>
        </Section>
    )
}
