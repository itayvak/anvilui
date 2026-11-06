import { useEffect, useState } from 'react'
import {
    AnimatedNumber,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    Icon,
    Progress,
    Sticker,
    ToggleGroup,
    ToggleGroupItem,
    Typography,
    useConfetti,
} from 'anvilui'
import type { MaterialSymbol } from 'material-symbols'
import { albumById, wrapped, type Period, type Stats } from './data'
import { Cover } from './parts'
import { useGroove } from './store'

const zero: Stats = {
    minutes: 0,
    songs: 0,
    artists: 0,
    genres: Object.fromEntries(
        Object.keys(wrapped['2026'].genres).map((g) => [g, 0])
    ),
    topAlbum: wrapped['2026'].topAlbum,
    topMinutes: 0,
}

export function WrappedPage() {
    const g = useGroove()
    const fire = useConfetti()
    const [period, setPeriod] = useState<Period>('2026')
    // Starts at zero so the numbers roll up when the page opens
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 150)
        return () => clearTimeout(timer)
    }, [])
    const stats = ready ? wrapped[period] : zero
    const top = albumById(wrapped[period].topAlbum)

    return (
        <div className="gr-page">
            <div className="gr-wrapped-header">
                <Typography type="h2" as="h2">
                    Your sound, <span className="gr-highlight">wrapped</span>
                </Typography>
                <ToggleGroup
                    aria-label="Period"
                    value={period}
                    onValueChange={setPeriod}
                >
                    <ToggleGroupItem value="2026">2026</ToggleGroupItem>
                    <ToggleGroupItem value="2025">2025</ToggleGroupItem>
                    <ToggleGroupItem value="all">All time</ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="gr-stats">
                <Stat
                    icon="schedule"
                    label="minutes listened"
                    value={stats.minutes}
                    color="primary"
                />
                <Stat
                    icon="music_note"
                    label="different songs"
                    value={stats.songs}
                    color="tonal"
                />
                <Stat
                    icon="groups"
                    label="artists discovered"
                    value={stats.artists}
                    color="success"
                />
            </div>

            <Card className="gr-genres">
                <CardContent className="gr-genres-content">
                    <Typography type="h6" as="h3">
                        Top genres
                    </Typography>
                    {Object.entries(stats.genres).map(([name, share]) => (
                        <div key={name} className="gr-genre">
                            <span className="gr-genre-label">
                                <span>{name}</span>
                                <AnimatedNumber
                                    value={share / 100}
                                    format={{ style: 'percent' }}
                                />
                            </span>
                            <Progress
                                aria-label={name}
                                value={share}
                                squiggly
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Dialog
                morph
                // Remounts the reveal for each period, so it's a surprise again
                key={period}
                onOpenChange={(open) => {
                    // Once the card has grown into the dialog
                    if (open)
                        setTimeout(() => fire(undefined, { count: 160 }), 350)
                }}
            >
                <DialogTrigger
                    // Card clickable renders a <div>
                    nativeButton={false}
                    render={
                        <Card clickable color="tonal" className="gr-reveal" />
                    }
                >
                    <Sticker
                        color="warning"
                        tilt={10}
                        className="gr-reveal-sticker"
                    >
                        ?
                    </Sticker>
                    <span className="gr-reveal-text">
                        <Typography type="h5" as="span">
                            Your #1 album
                        </Typography>
                        <Typography type="caption">Tap to reveal</Typography>
                    </span>
                    <Icon name="redeem" className="gr-reveal-icon" />
                </DialogTrigger>
                <DialogPopup className="gr-reveal-popup">
                    <Cover album={top} size="big" />
                    <DialogTitle>{top.title}</DialogTitle>
                    <DialogDescription>
                        You spent{' '}
                        <strong>
                            {wrapped[period].topMinutes.toLocaleString()}{' '}
                            minutes
                        </strong>{' '}
                        with {top.artist}. That puts you in their top 0.5% of
                        listeners.
                    </DialogDescription>
                    <DialogActions>
                        <DialogClose render={<Button fillType="text" />}>
                            Close
                        </DialogClose>
                        <DialogClose
                            render={<Button startIcon="play_arrow" />}
                            onClick={() => g.play(top.id, 0)}
                        >
                            Play it again
                        </DialogClose>
                    </DialogActions>
                </DialogPopup>
            </Dialog>
        </div>
    )
}

function Stat({
    icon,
    label,
    value,
    color,
}: {
    icon: MaterialSymbol
    label: string
    value: number
    color: 'primary' | 'tonal' | 'success'
}) {
    return (
        <Card color={color} className="gr-stat">
            <Icon name={icon} />
            <Typography type="h3" as="p" className="gr-stat-value">
                <AnimatedNumber value={value} />
            </Typography>
            <Typography type="caption">{label}</Typography>
        </Card>
    )
}
