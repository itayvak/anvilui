import { DesignTokens } from './types'

export const baseDesignTokens: DesignTokens = {
    font: {
        main: '"Google Sans", sans-serif',
        title: '"Google Sans", sans-serif',
        mono: '"Google Sans Code", monospace',
    },
    fontSize: {
        body: '16px',
        caption: '12px',
        labelSmall: '12px',
        label: '14px',
        labelLarge: '18px',
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
    disabledOpacity: '0.5',
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    shadow: {
        small: '0 2px 6px var(--avl-color-shadow)',
        medium: '0 3px 8px var(--avl-color-shadow)',
        large: '0 4px 16px var(--avl-color-shadow)',
    },
    ease: {
        out: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        // Material 3's standard curve
        smooth: 'cubic-bezier(0.2, 0, 0, 1)',
    },
    easeLength: {
        short: '100ms',
        normal: '200ms',
        slow: '300ms',
    },
}
