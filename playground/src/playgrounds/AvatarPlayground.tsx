import { useState } from 'react'
import { Avatar, Typography } from 'anvilui'
import { Row, Section, SelectControl } from '../ui'

const sizes = ['small', 'normal', 'big'] as const
const colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'container',
] as const
const fills = ['filled', 'outlined', 'text'] as const

export function AvatarPlayground() {
    const [size, setSize] = useState<(typeof sizes)[number]>('normal')
    const [color, setColor] = useState<(typeof colors)[number]>('primary')
    const [fill, setFill] = useState<(typeof fills)[number]>('filled')

    return (
        <>
            <Section title="Kinds">
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
                        value={fill}
                        options={fills}
                        onChange={setFill}
                    />
                </Row>
                <Row>
                    <Avatar
                        size={size}
                        color={color}
                        fillType={fill}
                        name="Ada Lovelace"
                        src="https://i.pravatar.cc/150?img=47"
                    />
                    <Avatar
                        size={size}
                        color={color}
                        fillType={fill}
                        name="Ada Lovelace"
                    />
                    <Avatar
                        size={size}
                        color={color}
                        fillType={fill}
                        name="Plato"
                    />
                    <Avatar size={size} color={color} fillType={fill} />
                    <Avatar
                        size={size}
                        color={color}
                        fillType={fill}
                        icon="groups"
                    />
                    <Avatar size={size} color={color} fillType={fill}>
                        +3
                    </Avatar>
                </Row>
                <Typography type="caption">
                    image, initials, one name, default icon, custom icon, custom
                    content
                </Typography>
            </Section>
            <Section title="Broken image falls back">
                <Row>
                    <Avatar
                        size={size}
                        name="Grace Hopper"
                        src="https://example.invalid/missing.png"
                    />
                    <Avatar
                        size={size}
                        src="https://example.invalid/missing.png"
                    />
                </Row>
            </Section>
        </>
    )
}
