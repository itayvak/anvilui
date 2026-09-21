import { useState } from 'react'
import { Button, Checkbox, Typography } from 'anvilui'
import type { ButtonProps } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const iconOptions = ['none', ...sampleIcons] as const

type IconOption = (typeof iconOptions)[number]

export function ButtonPlayground() {
    const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('normal')
    const [startIcon, setStartIcon] = useState<IconOption>('none')
    const [endIcon, setEndIcon] = useState<IconOption>('none')
    const [disabled, setDisabled] = useState(false)

    return (
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
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
            </Row>
            <table className="pg-matrix">
                <thead>
                    <tr>
                        <th />
                        {colors.map((color) => (
                            <th key={color}>
                                <Typography type="caption">{color}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {fillTypes.map((fillType) => (
                        <tr key={fillType}>
                            <th scope="row">
                                <Typography type="caption">
                                    {fillType}
                                </Typography>
                            </th>
                            {colors.map((color) => (
                                <td key={color}>
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
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Section>
    )
}
