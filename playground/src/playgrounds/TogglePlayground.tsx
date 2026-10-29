import { useState } from 'react'
import { Switch, Toggle, Typography } from 'anvilui'
import type { ComponentColor, ComponentFillType } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Row, Section, SelectControl, Labeled } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const iconOptions = ['none', ...sampleIcons] as const

type IconOption = (typeof iconOptions)[number]

export function TogglePlayground() {
    const [size, setSize] = useState<(typeof sizes)[number]>('normal')
    const [color, setColor] = useState<ComponentColor>('primary')
    const [fillType, setFillType] = useState<ComponentFillType>('filled')
    const [startIcon, setStartIcon] = useState<IconOption>('favorite')
    const [disabled, setDisabled] = useState(false)
    const [bold, setBold] = useState(true)

    const shared = { color, fillType, disabled }

    return (
        <>
            <Section title="Text toggles">
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
                    <Labeled label="disabled">
                        <Switch
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                    </Labeled>
                </Row>
                <Row>
                    <Toggle
                        {...shared}
                        size={size}
                        startIcon={startIcon === 'none' ? undefined : startIcon}
                    >
                        Off at first
                    </Toggle>
                    <Toggle
                        {...shared}
                        size={size}
                        startIcon={startIcon === 'none' ? undefined : startIcon}
                        defaultPressed
                    >
                        On at first
                    </Toggle>
                    <Toggle {...shared} size={size} endIcon="notifications">
                        Get notified about every new reply in this thread
                    </Toggle>
                </Row>
            </Section>
            <Section title="Icon toggles">
                <Row>
                    <Toggle {...shared} icon="star" aria-label="Star" />
                    <Toggle
                        {...shared}
                        icon="bookmark"
                        aria-label="Bookmark"
                        defaultPressed
                    />
                    <Toggle
                        {...shared}
                        icon="format_bold"
                        aria-label="Bold"
                        pressed={bold}
                        onPressedChange={setBold}
                    />
                    <Typography type="caption">
                        Bold (controlled): {String(bold)}
                    </Typography>
                </Row>
            </Section>
        </>
    )
}
