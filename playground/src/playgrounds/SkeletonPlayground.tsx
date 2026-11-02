import { useState } from 'react'
import {
    Avatar,
    Card,
    CardContent,
    Checkbox,
    Skeleton,
    Typography,
} from 'anvilui'
import type { SkeletonProps } from 'anvilui'
import { Grid, Labeled, Row, Section, SelectControl, Stack } from '../ui'

const animations = ['pulse', 'none'] as const
type Animation = NonNullable<SkeletonProps['animation']>

export function SkeletonPlayground() {
    const [animation, setAnimation] = useState<Animation>('pulse')
    const [loading, setLoading] = useState(true)

    return (
        <>
            <Section title="Variants">
                <Row>
                    <SelectControl
                        label="animation"
                        value={animation}
                        options={animations}
                        onChange={setAnimation}
                    />
                </Row>
                <Grid>
                    <Stack>
                        <Typography type="caption">text</Typography>
                        <Skeleton animation={animation} />
                        <Skeleton animation={animation} />
                        <Skeleton
                            animation={animation}
                            style={{ width: '60%' }}
                        />
                    </Stack>
                    <Stack>
                        <Typography type="caption">text in an h4</Typography>
                        <Typography type="h4" as="div">
                            <Skeleton animation={animation} />
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography type="caption">circular</Typography>
                        <Row>
                            <Skeleton
                                variant="circular"
                                animation={animation}
                            />
                            <Skeleton
                                variant="circular"
                                animation={animation}
                                style={{ width: 64, height: 64 }}
                            />
                        </Row>
                    </Stack>
                    <Stack>
                        <Typography type="caption">rectangular</Typography>
                        <Skeleton variant="rectangular" animation={animation} />
                    </Stack>
                </Grid>
            </Section>
            <Section title="Loading a card">
                <Row>
                    <Labeled label="loading">
                        <Checkbox
                            checked={loading}
                            onCheckedChange={setLoading}
                        />
                    </Labeled>
                </Row>
                <Card style={{ maxWidth: 360 }} aria-busy={loading}>
                    <CardContent>
                        <Stack>
                            {loading ? (
                                <>
                                    <Row>
                                        <Skeleton
                                            variant="circular"
                                            animation={animation}
                                        />
                                        <Skeleton
                                            animation={animation}
                                            style={{ width: '40%' }}
                                        />
                                    </Row>
                                    <Skeleton
                                        variant="rectangular"
                                        animation={animation}
                                    />
                                    <Skeleton animation={animation} />
                                    <Skeleton
                                        animation={animation}
                                        style={{ width: '70%' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Row>
                                        <Avatar name="Ada Lovelace" />
                                        <Typography>Ada Lovelace</Typography>
                                    </Row>
                                    <Typography>
                                        Wrote the first published algorithm
                                        meant for a machine, for Babbage's
                                        Analytical Engine.
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            </Section>
        </>
    )
}
