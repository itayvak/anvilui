import { useRef } from 'react'
import {
    AnimatedNumber,
    Avatar,
    AvatarGroup,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    PreviewCard,
    PreviewCardPopup,
    PreviewCardTrigger,
    Sticker,
    Toggle,
    Typography,
    useConfetti,
} from 'anvilui'
import { albumById, albums, formatTime, friends } from './data'
import { Cover, Equalizer } from './parts'
import { useGroove } from './store'

export function AlbumPage({ id, morphId }: { id: string; morphId: string }) {
    const g = useGroove()
    const fire = useConfetti()
    const likeRef = useRef<HTMLButtonElement>(null)
    const album = albumById(id)
    const liked = g.likedAlbums.includes(id)
    const isCurrent = g.player.albumId === id
    const playingHere = isCurrent && g.player.playing
    const totalSeconds = album.tracks.reduce((sum, t) => sum + t.seconds, 0)
    // A stable, album-specific slice of friends
    const fans = friends.slice(album.likes % 3, (album.likes % 3) + 4)

    return (
        <div className="gr-page">
            <div className="gr-album-hero" data-morph-id={morphId}>
                <Cover album={album} size="big" />
                <div className="gr-album-hero-text">
                    {album.fresh && (
                        <Sticker startIcon="stars" tilt={-5}>
                            Out now
                        </Sticker>
                    )}
                    <Typography type="caption" className="gr-overline">
                        Album · {album.year} · {album.tracks.length} songs,{' '}
                        {Math.round(totalSeconds / 60)} min
                    </Typography>
                    <Typography type="h2" as="h2">
                        {album.title}
                    </Typography>
                    <ArtistLink name={album.artist} />
                    <Typography className="gr-likes">
                        <AnimatedNumber value={album.likes + (liked ? 1 : 0)} />{' '}
                        likes
                    </Typography>
                    <div className="gr-row">
                        <Button
                            size="big"
                            startIcon={playingHere ? 'pause' : 'play_arrow'}
                            onClick={() =>
                                isCurrent ? g.togglePlaying() : g.play(id, 0)
                            }
                        >
                            {playingHere ? 'Pause' : 'Play'}
                        </Button>
                        <Toggle
                            ref={likeRef}
                            icon="favorite"
                            aria-label="Like album"
                            color="error"
                            pressed={liked}
                            onPressedChange={(on) => {
                                g.toggleAlbumLike(id)
                                if (on && likeRef.current)
                                    fire(likeRef.current, {
                                        count: 60,
                                        colors: ['error', 'primary', 'tonal'],
                                    })
                            }}
                        />
                        <IconButton
                            icon="shuffle"
                            aria-label="Shuffle album"
                            fillType="outlined"
                            onClick={() =>
                                g.play(
                                    id,
                                    Math.floor(
                                        Math.random() * album.tracks.length
                                    )
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="gr-fans">
                <AvatarGroup size="small" aria-label="Friends who love this">
                    {fans.map((name) => (
                        <Avatar key={name} name={name} />
                    ))}
                </AvatarGroup>
                <Typography type="caption" className="gr-muted">
                    Loved by {fans[0].split(' ')[0]} and {fans.length - 1}{' '}
                    friends
                </Typography>
            </div>

            <Divider squiggly />

            <List aria-label="Songs">
                {album.tracks.map((track, i) => {
                    const key = `${id}:${i}`
                    const current = isCurrent && g.player.track === i
                    return (
                        <ListItem
                            key={key}
                            className="gr-track"
                            data-current={current || undefined}
                            start={
                                current ? (
                                    <IconButton
                                        icon={
                                            g.player.playing
                                                ? 'pause'
                                                : 'play_arrow'
                                        }
                                        aria-label={`${g.player.playing ? 'Pause' : 'Play'} ${track.title}`}
                                        onClick={g.togglePlaying}
                                    />
                                ) : (
                                    <IconButton
                                        icon="play_arrow"
                                        fillType="text"
                                        color="container"
                                        aria-label={`Play ${track.title}`}
                                        onClick={() => g.play(id, i)}
                                    />
                                )
                            }
                            label={track.title}
                            description={
                                <span className="gr-track-meta">
                                    {current && (
                                        <Equalizer playing={g.player.playing} />
                                    )}
                                    {formatTime(track.seconds)}
                                </span>
                            }
                            end={
                                <Toggle
                                    icon="favorite"
                                    aria-label={`Like ${track.title}`}
                                    color="error"
                                    fillType="text"
                                    pressed={g.likedTracks.includes(key)}
                                    onPressedChange={() =>
                                        g.toggleTrackLike(key)
                                    }
                                />
                            }
                        />
                    )
                })}
            </List>
        </div>
    )
}

function ArtistLink({ name }: { name: string }) {
    const count = albums.filter((a) => a.artist === name).length
    // Made up, but steady per artist
    const listeners = (name.length * 173_911) % 4_000_000
    return (
        <Typography type="h6" as="p">
            <PreviewCard>
                <PreviewCardTrigger
                    href={`#artist-${name}`}
                    className="gr-artist-link"
                    onClick={(e) => e.preventDefault()}
                >
                    {name}
                </PreviewCardTrigger>
                <PreviewCardPopup className="gr-artist-card">
                    <Avatar name={name} size="big" />
                    <span>
                        <Typography type="h6" as="span">
                            {name}
                        </Typography>
                        <Typography type="caption" as="p" className="gr-muted">
                            <AnimatedNumber
                                value={listeners}
                                format={{ notation: 'compact' }}
                            />{' '}
                            monthly listeners · {count}{' '}
                            {count === 1 ? 'album' : 'albums'}
                        </Typography>
                    </span>
                </PreviewCardPopup>
            </PreviewCard>
        </Typography>
    )
}
