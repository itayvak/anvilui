import { useRef, useState } from 'react'
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardContent,
    Carousel,
    CarouselItem,
    Divider,
    FilterChip,
    Icon,
    Kbd,
    Skeleton,
    Sticker,
    Typography,
    useConfetti,
    useSnackbar,
} from 'anvilui'
import { albumById, albums, friends, moods, type Mood } from './data'
import { AlbumCard } from './parts'
import { useGroove } from './store'

const fresh = albums.filter((a) => a.fresh)

export function DiscoverPage() {
    const g = useGroove()
    const fire = useConfetti()
    const snackbar = useSnackbar()
    const [picked, setPicked] = useState<Mood[]>([])
    const [loading, startLoading] = useFakeLoading()
    const shown = picked.length
        ? albums.filter((a) => picked.includes(a.mood))
        : albums
    const jamAlbum = albumById('deep-current')

    const shuffle = () => {
        const album = albums[Math.floor(Math.random() * albums.length)]
        const track = Math.floor(Math.random() * album.tracks.length)
        g.play(album.id, track)
        snackbar.show({
            message: `Shuffling: ${album.tracks[track].title} by ${album.artist}`,
        })
    }

    return (
        <div className="gr-page">
            <Card color="primary" className="gr-hero">
                <div className="gr-hero-text">
                    <Sticker startIcon="stars" color="warning" tilt={-6}>
                        {fresh.length} fresh drops
                    </Sticker>
                    <Typography type="h2" as="h2">
                        Good evening, Sam
                    </Typography>
                    <Typography>
                        Your mix is warmed up. Press <Kbd>Space</Kbd> anywhere
                        to play or pause.
                    </Typography>
                    <div className="gr-row">
                        <Button
                            size="big"
                            color="tonal"
                            startIcon="shuffle"
                            onClick={shuffle}
                        >
                            Shuffle my mix
                        </Button>
                    </div>
                </div>
                <Icon name="graphic_eq" className="gr-hero-art" />
            </Card>

            <section className="gr-section" aria-labelledby="gr-fresh">
                <Typography type="h5" as="h2" id="gr-fresh">
                    Fresh drops
                </Typography>
                <Carousel aria-label="Fresh drops">
                    {[...fresh, ...albums.filter((a) => !a.fresh)].map((a) => (
                        <CarouselItem key={a.id} className="gr-carousel-item">
                            <AlbumCard album={a} morphId={`fresh-${a.id}`} />
                        </CarouselItem>
                    ))}
                </Carousel>
            </section>

            <Card fillType="outlined" className="gr-jam">
                <CardContent className="gr-jam-content">
                    <AvatarGroup max={5} aria-label="Friends listening now">
                        {friends.map((name) => (
                            <Avatar key={name} name={name} />
                        ))}
                    </AvatarGroup>
                    <span className="gr-jam-text">
                        <Typography type="h6" as="h2">
                            {friends.length} friends are jamming
                        </Typography>
                        <Typography type="caption" className="gr-muted">
                            Maya, Leo and {friends.length - 2} others are on{' '}
                            {jamAlbum.title}
                        </Typography>
                    </span>
                    <Button
                        startIcon="celebration"
                        onClick={(e) => {
                            fire(e.currentTarget, { count: 120, spread: 100 })
                            g.play(jamAlbum.id, 0)
                            snackbar.show({
                                message: `You joined the jam on ${jamAlbum.title}`,
                            })
                        }}
                    >
                        Join the jam
                    </Button>
                </CardContent>
            </Card>

            <Divider squiggly />

            <section className="gr-section" aria-labelledby="gr-for-you">
                <Typography type="h5" as="h2" id="gr-for-you">
                    Made for you
                </Typography>
                <div className="gr-row" role="group" aria-label="Moods">
                    {moods.map((m) => (
                        <FilterChip
                            key={m.id}
                            pressed={picked.includes(m.id)}
                            onPressedChange={(on) => {
                                setPicked(
                                    on
                                        ? [...picked, m.id]
                                        : picked.filter((p) => p !== m.id)
                                )
                                startLoading()
                            }}
                        >
                            {m.label}
                        </FilterChip>
                    ))}
                </div>
                <div className="gr-grid" aria-busy={loading}>
                    {loading
                        ? shown.map((a) => (
                              <div key={a.id} className="gr-skeleton-card">
                                  <Skeleton
                                      variant="rectangular"
                                      className="gr-skeleton-cover"
                                  />
                                  <Skeleton style={{ width: '70%' }} />
                                  <Skeleton style={{ width: '40%' }} />
                              </div>
                          ))
                        : shown.map((a) => (
                              <AlbumCard
                                  key={a.id}
                                  album={a}
                                  morphId={`grid-${a.id}`}
                              />
                          ))}
                </div>
            </section>
        </div>
    )
}

// A short pretend fetch after each filter change, to show the skeletons
function useFakeLoading() {
    const [loading, setLoading] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const start = () => {
        clearTimeout(timer.current)
        setLoading(true)
        timer.current = setTimeout(() => setLoading(false), 700)
    }
    return [loading, start] as const
}
