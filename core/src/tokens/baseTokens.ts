import { DesignTokens } from './types'

export const baseDesignTokens: DesignTokens = {
    font: {
        main: '"Google Sans", sans-serif',
        title: '"Google Sans", sans-serif',
        mono: '"Google Sans Mono", monospace',
    },
    fontSize: {
        body: '16px',
        caption: '12px',
        h1: '57px',
        h2: '45px',
        h3: '36px',
        h4: '32px',
        h5: '28px',
        h6: '24px',
    },
    spacing: 4,
    radius: {
        small: '4px',
        medium: '16px',
        large: '32px',
        button: '1000px',
        full: '1000px',
    },
    outlineSize: '1.5px',
    ease: {
        out: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    },
}
