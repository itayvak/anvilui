import { Button, AnvilRoot } from 'anvilui'
import ColorModeSwitch from './ColorModeSwitch'

export default function App() {
    return (
        <AnvilRoot colorMode={'light'}>
            <ColorModeSwitch />
            <Button size="normal">שלום לכולם</Button>
        </AnvilRoot>
    )
}
