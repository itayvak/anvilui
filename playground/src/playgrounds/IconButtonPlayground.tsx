import { useState } from 'react'
import { Checkbox, IconButton, Typography } from 'anvilui'
import { colors, fillTypes, sampleIcons } from '../options'
import { Row, Section } from '../ui'

export function IconButtonPlayground() {
    const [disabled, setDisabled] = useState(false)

    return (
        <>
            <Section title="Colors and fill types">
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
                <table className="pg-matrix">
                    <thead>
                        <tr>
                            <th />
                            {colors.map((color) => (
                                <th key={color}>
                                    <Typography type="caption">
                                        {color}
                                    </Typography>
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
                                        <IconButton
                                            icon="favorite"
                                            aria-label="favorite"
                                            color={color}
                                            fillType={fillType}
                                            disabled={disabled}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Section>
            <Section title="Icons">
                <Row>
                    {sampleIcons.map((name) => (
                        <IconButton
                            key={name}
                            icon={name}
                            aria-label={name}
                            disabled={disabled}
                        />
                    ))}
                </Row>
            </Section>
        </>
    )
}
