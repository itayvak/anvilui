import { useState } from 'react'
import {
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Typography,
} from 'anvilui'
import type { ButtonProps } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Labeled, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const iconOptions = ['none', ...sampleIcons] as const

type IconOption = (typeof iconOptions)[number]

export function ButtonPlayground() {
    const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('normal')
    const [startIcon, setStartIcon] = useState<IconOption>('none')
    const [endIcon, setEndIcon] = useState<IconOption>('none')
    const [disabled, setDisabled] = useState(false)

    return (
        <>
            <Section title="Colors and fill types">
                <Row>
                    <SelectControl
                        label="size"
                        value={size}
                        options={sizes}
                        onChange={setSize}
                    />
                    <SelectControl
                        label="startIcon"
                        value={startIcon}
                        options={iconOptions}
                        onChange={setStartIcon}
                    />
                    <SelectControl
                        label="endIcon"
                        value={endIcon}
                        options={iconOptions}
                        onChange={setEndIcon}
                    />
                    <Labeled label="disabled">
                        <Checkbox
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                    </Labeled>
                </Row>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell />
                            {colors.map((color) => (
                                <TableHeaderCell key={color}>
                                    <Typography type="caption">
                                        {color}
                                    </Typography>
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fillTypes.map((fillType) => (
                            <TableRow key={fillType}>
                                <TableHeaderCell scope="row">
                                    <Typography type="caption">
                                        {fillType}
                                    </Typography>
                                </TableHeaderCell>
                                {colors.map((color) => (
                                    <TableCell key={color}>
                                        <Button
                                            size={size}
                                            color={color}
                                            fillType={fillType}
                                            startIcon={
                                                startIcon === 'none'
                                                    ? undefined
                                                    : startIcon
                                            }
                                            endIcon={
                                                endIcon === 'none'
                                                    ? undefined
                                                    : endIcon
                                            }
                                            disabled={disabled}
                                        >
                                            Button
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Section>
            <Section title="Long label">
                <Button
                    size={size}
                    startIcon={startIcon === 'none' ? undefined : startIcon}
                    endIcon={endIcon === 'none' ? undefined : endIcon}
                    disabled={disabled}
                >
                    A button with a much longer label than usual
                </Button>
            </Section>
            <Section title="Loading">
                <Row>
                    <LoadingButton size={size} loadingText="Saving">
                        Save changes
                    </LoadingButton>
                    <LoadingButton
                        size={size}
                        fillType="outlined"
                        startIcon="send"
                        loadingText="Sending"
                    >
                        Send
                    </LoadingButton>
                    <LoadingButton
                        size={size}
                        color="tonal"
                        loadingText="Processing payment"
                    >
                        Pay $20
                    </LoadingButton>
                </Row>
            </Section>
        </>
    )
}

// Loads for a moment with different text, then goes back to normal
function LoadingButton({
    loadingText,
    children,
    ...props
}: ButtonProps & { loadingText: string }) {
    const [loading, setLoading] = useState(false)

    const run = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <Button {...props} loading={loading} disabled={loading} onClick={run}>
            {loading ? loadingText : children}
        </Button>
    )
}
