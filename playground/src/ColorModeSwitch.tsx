import { AnvilContext, Button } from 'anvilui'
import { useContext } from 'react'

export default function ColorModeSwitch() {
    const avl = useContext(AnvilContext)

    return (
        <Button
            size="small"
            onClick={() =>
                avl.setColorMode((p) => (p === 'dark' ? 'light' : 'dark'))
            }
        >
            {avl.colorMode}
        </Button>
    )
}
