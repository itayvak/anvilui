import { DesignTokens } from './types'

export const baseDesignTokens: DesignTokens = {
    font: {
        main: '"Google Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        title: '"Google Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        mono: '"Google Sans Code", ui-monospace, "Cascadia Code", Menlo, Consolas, monospace',
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
    ease: {
        out: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        in: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        // Material 3's standard curve
        smooth: 'cubic-bezier(0.2, 0, 0, 1)',
        // A damped spring, sampled into linear() points
        bounce: 'linear(0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1)',
    },
    easeLength: {
        short: '100ms',
        normal: '200ms',
        slow: '300ms',
    },
}
