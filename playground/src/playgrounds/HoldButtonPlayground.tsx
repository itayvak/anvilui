import { useState } from 'react'
import { Checkbox, HoldButton, Typography, useSnackbar } from 'anvilui'
import type { HoldButtonProps } from 'anvilui'
import { colors, fillTypes } from '../options'
import { RangeControl, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const

export function HoldButtonPlayground() {
    const snackbar = useSnackbar()
    const [size, setSize] =
        useState<NonNullable<HoldButtonProps['size']>>('normal')
    const [fillType, setFillType] =
        useState<NonNullable<HoldButtonProps['fillType']>>('filled')
    const [duration, setDuration] = useState(1500)
    const [disabled, setDisabled] = useState(false)
    const [count, setCount] = useState(0)

    const confirmed = (what: string) => {
        setCount((n) => n + 1)
        snackbar.show({ message: what })
    }

    return (
        <>
            <Section title="Examples">
                <Row>
                    <HoldButton
                        color="error"
                        startIcon="delete"
                        onConfirm={() => confirmed('Account deleted')}
                    >
                        Hold to delete account
                    </HoldButton>
                    <HoldButton
                        fillType="outlined"
                        startIcon="logout"
                        onConfirm={() => confirmed('Signed out everywhere')}
                    >
                        Sign out everywhere
                    </HoldButton>
                </Row>
                <Row>
                    <Typography type="caption">
                        Release early and it springs back with a wobble. Space
                        and Enter work too. Confirmed: {count}
                    </Typography>
                </Row>
            </Section>
            <Section title="Colors and fill types">
                <Row>
                    <SelectControl
                        label="size"
                        value={size}
                        options={sizes}
                        onChange={setSize}
                    />
                    <SelectControl
                        label="fillType"
                        value={fillType}
                        options={fillTypes}
                        onChange={setFillType}
                    />
                    <RangeControl
                        label="holdDuration"
                        value={duration}
                        min={500}
                        max={4000}
                        onChange={setDuration}
                    />
                    <label className="pg-checkbox">
                        <Checkbox
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                        <Typography type="caption">disabled</Typography>
                    </label>
                </Row>
                <Row>
                    {colors.map((color) => (
                        <HoldButton
                            key={color}
                            color={color}
                            fillType={fillType}
                            size={size}
                            holdDuration={duration}
                            disabled={disabled}
                            onConfirm={() => confirmed(`Confirmed ${color}`)}
                        >
                            {color}
                        </HoldButton>
                    ))}
                </Row>
            </Section>
        </>
    )
}
