import { useState } from 'react'
import { Button, Checkbox } from 'anvilui'
import type { ButtonProps, ComponentColor, ComponentFillType } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Labeled, Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const iconOptions = ['none', ...sampleIcons] as const

type IconOption = (typeof iconOptions)[number]

export function ButtonPlayground() {
    const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('normal')
    const [color, setColor] = useState<ComponentColor>('primary')
    const [fillType, setFillType] = useState<ComponentFillType>('filled')
    const [startIcon, setStartIcon] = useState<IconOption>('none')
    const [endIcon, setEndIcon] = useState<IconOption>('none')
    const [disabled, setDisabled] = useState(false)

    const shared = {
        size,
        color,
        fillType,
        disabled,
        startIcon: startIcon === 'none' ? undefined : startIcon,
        endIcon: endIcon === 'none' ? undefined : endIcon,
    }

    return (
        <Section title="Button">
            <Row>
                <SelectControl
                    label="size"
                    value={size}
                    options={sizes}
                    onChange={setSize}
                />
                <SelectControl
                    label="color"
                    value={color}
                    options={colors}
                    onChange={setColor}
                />
                <SelectControl
                    label="fillType"
                    value={fillType}
                    options={fillTypes}
                    onChange={setFillType}
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
            <Row>
                <Button {...shared}>Button</Button>
                <Button {...shared}>
                    A button with a much longer label than usual
                </Button>
            </Row>
        </Section>
    )
}
