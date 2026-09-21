import { useState } from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardTitle,
    Checkbox,
    Typography,
} from 'anvilui'
import type { ComponentColor, ComponentFillType } from 'anvilui'
import { colors, fillTypes } from '../options'
import { Grid, Row, Section } from '../ui'

// A button in the card's own color would vanish on a filled card, so pick one
// that stands out from the fill.
function actionColor(
    color: ComponentColor,
    fillType: ComponentFillType
): ComponentColor {
    const neutral = color === 'container' || color === 'secondary'
    return fillType === 'filled' && !neutral ? 'container' : 'primary'
}

export function CardPlayground() {
    const [title, setTitle] = useState(true)
    const [actions, setActions] = useState(true)
    const [clickable, setClickable] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [clicked, setClicked] = useState('nothing yet')

    return (
        <Section title="Colors and fill types">
            <Row>
                <label className="pg-checkbox">
                    <Checkbox checked={title} onCheckedChange={setTitle} />
                    <Typography type="caption">title</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox checked={actions} onCheckedChange={setActions} />
                    <Typography type="caption">actions</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={clickable}
                        onCheckedChange={setClickable}
                    />
                    <Typography type="caption">clickable</Typography>
                </label>
                <label className="pg-checkbox">
                    <Checkbox
                        checked={disabled}
                        onCheckedChange={setDisabled}
                        disabled={!clickable}
                    />
                    <Typography type="caption">disabled</Typography>
                </label>
                <Typography type="caption">card clicked: {clicked}</Typography>
            </Row>
            <Grid>
                {colors.flatMap((color) =>
                    fillTypes.map((fillType) => (
                        <div key={`${color}-${fillType}`}>
                            <Typography type="caption">
                                {color} / {fillType}
                            </Typography>
                            <Card
                                color={color}
                                fillType={fillType}
                                {...(clickable
                                    ? ({
                                          clickable: true,
                                          disabled,
                                          onClick: () =>
                                              setClicked(
                                                  `${color} / ${fillType}`
                                              ),
                                      } as const)
                                    : {})}
                            >
                                {title && <CardTitle>Card title</CardTitle>}
                                <CardContent>
                                    <Typography>
                                        Some content to show how text sits on
                                        this card.
                                    </Typography>
                                </CardContent>
                                {actions && (
                                    <CardActions>
                                        <Button
                                            fillType="text"
                                            color={actionColor(color, fillType)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            color={actionColor(color, fillType)}
                                        >
                                            Confirm
                                        </Button>
                                    </CardActions>
                                )}
                            </Card>
                        </div>
                    ))
                )}
            </Grid>
        </Section>
    )
}
