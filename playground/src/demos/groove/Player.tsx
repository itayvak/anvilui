import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
    Dialog,
    DialogClose,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
    FAB,
    Icon,
    IconButton,
    Slider,
    Toggle,
    Tooltip,
    Typography,
} from 'anvilui'
import { albumById, formatTime } from './data'
import { Cover, Equalizer } from './parts'
import { useGroove } from './store'

// Space toggles playback, unless focus is on something Space already does
// something for
const spaceOwners =
    'input, textarea, select, button, a, [contenteditable], [role="slider"], [role="option"], [role="menuitem"], [role="tab"], [role="radio"], [role="checkbox"], [role="switch"]'

export function useSpaceToPlay(toggle: () => void) {
    // In a ref, so the listener isn't re-added on every playback tick
    const latest = useRef(toggle)
    latest.current = toggle
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== ' ' || e.repeat) return
            if ((e.target as Element).closest?.(spaceOwners)) return
            e.preventDefault()
            latest.current()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])
}

export function PlayerBar() {
    const g = useGroove()
    const { player } = g
    const album = albumById(player.albumId)
    const track = album.tracks[player.track]
    const playLabel = player.playing ? 'Pause' : 'Play'

    return (
        <div className="gr-player">
            <Dialog morph>
                <DialogTrigger
                    className="gr-player-trigger"
                    aria-label={`Now playing: ${track.title} by ${album.artist}. Open player`}
                >
                    <Cover album={album} size="small" />
                    <span className="gr-player-text">
                        <span className="gr-ellipsis gr-player-title">
                            {track.title}
                        </span>
                        <span className="gr-ellipsis gr-muted gr-player-artist">
                            <Equalizer playing={player.playing} />
                            {album.artist}
                        </span>
                    </span>
                </DialogTrigger>
                <FullPlayer />
            </Dialog>
            <div className="gr-player-seek">
                <span className="gr-time">{formatTime(player.position)}</span>
                <Slider
                    aria-label="Seek"
                    squiggly={player.playing}
                    showValue={false}
                    min={0}
                    max={track.seconds}
                    value={player.position}
                    onValueChange={g.seek}
                />
                <span className="gr-time">{formatTime(track.seconds)}</span>
            </div>
            <div className="gr-player-controls">
                <IconButton
                    icon="skip_previous"
                    aria-label="Previous"
                    fillType="text"
                    color="container"
                    className="gr-wide-only"
                    onClick={() => g.skip(-1)}
                />
                <Tooltip label={`${playLabel} (Space)`}>
                    <IconButton
                        icon={player.playing ? 'pause' : 'play_arrow'}
                        aria-label={playLabel}
                        onClick={g.togglePlaying}
                    />
                </Tooltip>
                <IconButton
                    icon="skip_next"
                    aria-label="Next"
                    fillType="text"
                    color="container"
                    onClick={() => g.skip(1)}
                />
            </div>
        </div>
    )
}

function FullPlayer() {
    const g = useGroove()
    const { player } = g
    const album = albumById(player.albumId)
    const track = album.tracks[player.track]
    const key = `${album.id}:${player.track}`
    const [volume, setVolume] = useState(70)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(false)

    return (
        <DialogPopup className="gr-full-player">
            <div className="gr-full-player-top">
                <DialogClose
                    render={
                        <IconButton
                            icon="keyboard_arrow_down"
                            aria-label="Close player"
                            fillType="text"
                            color="container"
                        />
                    }
                />
                <Typography type="caption" className="gr-overline">
                    Playing from {album.title}
                </Typography>
                <span className="gr-spacer" />
            </div>

            <div
                className="gr-turntable"
                data-playing={player.playing || undefined}
            >
                <div
                    className="gr-vinyl"
                    style={{ '--gr-cover-a': album.color } as CSSProperties}
                    aria-hidden
                />
                <Cover album={album} size="big" />
            </div>

            <div className="gr-full-player-title">
                <span>
                    <DialogTitle>{track.title}</DialogTitle>
                    <Typography className="gr-muted">{album.artist}</Typography>
                </span>
                <Toggle
                    icon="favorite"
                    aria-label={`Like ${track.title}`}
                    color="error"
                    fillType="text"
                    pressed={g.likedTracks.includes(key)}
                    onPressedChange={() => g.toggleTrackLike(key)}
                />
            </div>

            <div>
                <Slider
                    aria-label="Seek"
                    squiggly={player.playing}
                    showValue={false}
                    min={0}
                    max={track.seconds}
                    value={player.position}
                    onValueChange={g.seek}
                />
                <div className="gr-full-player-times">
                    <span className="gr-time">
                        {formatTime(player.position)}
                    </span>
                    <span className="gr-time">
                        -{formatTime(track.seconds - player.position)}
                    </span>
                </div>
            </div>

            <div className="gr-full-player-controls">
                <Toggle
                    icon="shuffle"
                    aria-label="Shuffle"
                    fillType="text"
                    pressed={shuffle}
                    onPressedChange={setShuffle}
                />
                <IconButton
                    icon="skip_previous"
                    aria-label="Previous"
                    fillType="text"
                    color="container"
                    onClick={() => g.skip(-1)}
                />
                <FAB
                    size="big"
                    icon={player.playing ? 'pause' : 'play_arrow'}
                    aria-label={player.playing ? 'Pause' : 'Play'}
                    onClick={g.togglePlaying}
                />
                <IconButton
                    icon="skip_next"
                    aria-label="Next"
                    fillType="text"
                    color="container"
                    onClick={() => g.skip(1)}
                />
                <Toggle
                    icon="repeat"
                    aria-label="Repeat"
                    fillType="text"
                    pressed={repeat}
                    onPressedChange={setRepeat}
                />
            </div>

            <div className="gr-volume">
                <Icon name={volume === 0 ? 'volume_off' : 'volume_down'} />
                <Slider
                    aria-label="Volume"
                    value={volume}
                    onValueChange={setVolume}
                    format={{ style: 'unit', unit: 'percent' }}
                />
                <Icon name="volume_up" />
            </div>
        </DialogPopup>
    )
}
