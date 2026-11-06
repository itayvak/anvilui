import {
    AnimatedNumber,
    Button,
    HoldButton,
    Icon,
    List,
    ListItem,
    Toggle,
    Typography,
    useSnackbar,
} from 'anvilui'
import { albumById, formatTime } from './data'
import { Cover, Equalizer } from './parts'
import { useGroove } from './store'

export function LikedPage() {
    const g = useGroove()
    const snackbar = useSnackbar()
    const tracks = g.likedTracks.map((key) => {
        const [albumId, index] = key.split(':')
        const album = albumById(albumId)
        return { key, album, index: Number(index), track: album.tracks[+index] }
    })

    const unlike = (key: string, title: string) => {
        const before = g.likedTracks
        g.toggleTrackLike(key)
        snackbar.show({
            message: `Removed ${title} from Liked`,
            action: { label: 'Undo', onClick: () => g.setLikedTracks(before) },
        })
    }

    return (
        <div className="gr-page">
            <div className="gr-liked-header">
                <div className="gr-liked-badge" aria-hidden>
                    <Icon name="favorite" />
                </div>
                <div>
                    <Typography type="h3" as="h2">
                        Liked songs
                    </Typography>
                    <Typography className="gr-muted">
                        <AnimatedNumber value={tracks.length} />{' '}
                        {tracks.length === 1 ? 'song' : 'songs'} you couldn't
                        skip
                    </Typography>
                </div>
            </div>

            {tracks.length === 0 ? (
                <div className="gr-empty">
                    <Icon name="heart_broken" />
                    <Typography type="h6" as="p">
                        Nothing here yet
                    </Typography>
                    <Typography className="gr-muted">
                        Tap the heart on any song to keep it here.
                    </Typography>
                    <Button
                        color="tonal"
                        startIcon="explore"
                        onClick={() => g.setPage('discover')}
                    >
                        Find something to love
                    </Button>
                </div>
            ) : (
                <>
                    <div className="gr-row">
                        <Button
                            startIcon="play_arrow"
                            onClick={() =>
                                g.play(tracks[0].album.id, tracks[0].index)
                            }
                        >
                            Play all
                        </Button>
                        <span className="gr-spacer" />
                        <HoldButton
                            color="error"
                            fillType="text"
                            startIcon="delete_sweep"
                            onConfirm={() => {
                                const before = g.likedTracks
                                g.setLikedTracks([])
                                snackbar.show({
                                    message: `Cleared ${before.length} liked songs`,
                                    action: {
                                        label: 'Undo',
                                        onClick: () => g.setLikedTracks(before),
                                    },
                                })
                            }}
                        >
                            Hold to clear all
                        </HoldButton>
                    </div>
                    <List aria-label="Liked songs" divided>
                        {tracks.map(({ key, album, index, track }) => {
                            const current =
                                g.player.albumId === album.id &&
                                g.player.track === index
                            return (
                                <ListItem
                                    key={key}
                                    className="gr-track"
                                    data-current={current || undefined}
                                    start={
                                        <button
                                            type="button"
                                            className="gr-cover-button"
                                            aria-label={`Play ${track.title}`}
                                            onClick={() =>
                                                g.play(album.id, index)
                                            }
                                        >
                                            <Cover album={album} size="small" />
                                            <Icon
                                                name="play_arrow"
                                                className="gr-cover-button-icon"
                                            />
                                        </button>
                                    }
                                    label={track.title}
                                    description={
                                        <span className="gr-track-meta">
                                            {current && (
                                                <Equalizer
                                                    playing={g.player.playing}
                                                />
                                            )}
                                            {album.artist} · {album.title} ·{' '}
                                            {formatTime(track.seconds)}
                                        </span>
                                    }
                                    end={
                                        <Toggle
                                            icon="favorite"
                                            aria-label={`Unlike ${track.title}`}
                                            color="error"
                                            fillType="text"
                                            pressed
                                            onPressedChange={() =>
                                                unlike(key, track.title)
                                            }
                                        />
                                    }
                                />
                            )
                        })}
                    </List>
                </>
            )}
        </div>
    )
}
