import type { CSSProperties } from 'react'
import { Card, Icon, Sticker, Typography, morph } from 'anvilui'
import type { Album } from './data'
import { useGroove } from './store'

// The covers are drawn in CSS from the album's two colors, so the demo needs
// no image files
export function Cover({
    album,
    size = 'normal',
    className,
}: {
    album: Album
    size?: 'small' | 'normal' | 'big'
    className?: string
}) {
    return (
        <div
            className={['gr-cover', `gr-cover-${size}`, className]
                .filter(Boolean)
                .join(' ')}
            style={
                {
                    '--gr-cover-a': album.color,
                    '--gr-cover-b': album.accent,
                } as CSSProperties
            }
        >
            <Icon name={album.icon} className="gr-cover-icon" />
        </div>
    )
}

/** Opens the album page, growing it out of the element with `morphId`. */
export function useOpenAlbum() {
    const g = useGroove()
    return (id: string, morphId: string) =>
        morph(morphId, () => g.setAlbum({ id, morphId }))
}

export function AlbumCard({
    album,
    morphId,
}: {
    album: Album
    /** Unique per spot on the page, since one album can show up twice */
    morphId: string
}) {
    const openAlbum = useOpenAlbum()
    return (
        <Card
            clickable
            className="gr-album-card"
            data-morph-id={morphId}
            onClick={() => openAlbum(album.id, morphId)}
        >
            <Cover album={album} />
            {album.fresh && (
                <Sticker
                    className="gr-album-card-sticker"
                    color="warning"
                    tilt={8}
                >
                    NEW
                </Sticker>
            )}
            <span className="gr-album-card-text">
                <Typography type="h6" as="span" className="gr-ellipsis">
                    {album.title}
                </Typography>
                <Typography type="caption" className="gr-muted">
                    {album.artist}
                </Typography>
            </span>
        </Card>
    )
}

/** Three bouncing bars for the track that's playing. */
export function Equalizer({ playing }: { playing: boolean }) {
    return (
        <span
            className="gr-equalizer"
            data-playing={playing || undefined}
            aria-hidden
        >
            <span />
            <span />
            <span />
        </span>
    )
}
