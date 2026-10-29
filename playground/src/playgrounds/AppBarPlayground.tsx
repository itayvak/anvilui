import { AppBar, IconButton } from 'anvilui'
import { Section } from '../ui'

const menu = (
    <IconButton
        icon="menu"
        fillType="text"
        color="container"
        aria-label="Menu"
    />
)
const back = (
    <IconButton
        icon="arrow_back"
        fillType="text"
        color="container"
        aria-label="Back"
    />
)
const actions = (
    <>
        <IconButton
            icon="search"
            fillType="text"
            color="container"
            aria-label="Search"
        />
        <IconButton
            icon="more_vert"
            fillType="text"
            color="container"
            aria-label="More"
        />
    </>
)

const box = { border: '1px dashed gray', maxWidth: 480 }

export function AppBarPlayground() {
    return (
        <>
            <Section title="Normal">
                <AppBar style={box} label="Inbox" start={menu} end={actions} />
                <AppBar style={box} label="Title only" />
                <AppBar
                    style={box}
                    label="A very long title that doesn't fit gets cut off with an ellipsis"
                    start={back}
                    end={actions}
                />
            </Section>
            <Section title="Centered">
                <AppBar
                    style={box}
                    centered
                    label="Photos"
                    start={menu}
                    end={actions}
                />
                {/* Different-width sides: the title still centers on the bar */}
                <AppBar style={box} centered label="Settings" start={back} />
            </Section>
            <Section title="Colors">
                <AppBar
                    style={box}
                    fillType="filled"
                    label="Tinted (container, filled)"
                    start={menu}
                    end={actions}
                />
                <AppBar
                    style={box}
                    color="primary"
                    fillType="filled"
                    label="Primary"
                    start={menu}
                    end={actions}
                />
                <AppBar
                    style={box}
                    color="secondary"
                    fillType="filled"
                    label="Secondary"
                    start={back}
                    end={actions}
                />
                <AppBar
                    style={box}
                    fillType="outlined"
                    label="Outlined (bottom border)"
                    start={menu}
                />
            </Section>
            <Section title="Big">
                <AppBar
                    style={box}
                    size="big"
                    labelAs="h1"
                    label="Account settings"
                    start={back}
                    end={actions}
                />
                <AppBar
                    style={box}
                    size="big"
                    label="A long title wraps onto a second line in the big bar before it's cut off"
                    start={back}
                />
            </Section>
        </>
    )
}
