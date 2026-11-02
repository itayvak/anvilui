import { baseDarkTheme, baseLightTheme } from './baseTheme'
import { Theme } from './types'

export type ThemePair = { light: Theme; dark: Theme }

export type CreateThemeOptions = {
    /**
     * Seed for the secondary roles (selected states, secondary buttons), as
     * hex. @default the primary color
     */
    secondary?: string
}

/**
 * Builds a light and a dark theme from one hex color, e.g. `'#0B6E4F'`.
 * Pass the result to `AnvilRoot` as `lightTheme={t.light} darkTheme={t.dark}`.
 */
export function createTheme(
    primary: string,
    options: CreateThemeOptions = {}
): ThemePair {
    const p = toOklch(parseHex(primary))
    const s = options.secondary ? toOklch(parseHex(options.secondary)) : p
    return {
        light: generate(baseLightTheme, p, s),
        dark: generate(baseDarkTheme, p, s),
    }
}

/**
 * Builds a light and a dark theme from the main colors of an image: an
 * `<img>`, a `File`/`Blob`, or a URL (which must allow CORS). Browser only.
 */
export async function createThemeFromImage(
    image: ImageBitmapSource | string
): Promise<ThemePair> {
    const source =
        typeof image === 'string' ? await (await fetch(image)).blob() : image
    // Colors are all that matter, so a tiny, squashed copy is plenty
    const size = 64
    const bitmap = await createImageBitmap(source, {
        resizeWidth: size,
        resizeHeight: size,
    })
    const ctx = new OffscreenCanvas(size, size).getContext('2d')!
    ctx.drawImage(bitmap, 0, 0)
    bitmap.close()
    const [primary, secondary] = mainColors(
        ctx.getImageData(0, 0, size, size).data
    )
    return createTheme(primary, { secondary })
}

// ---- Generation ----------------------------------------------------------

type Lch = { l: number; c: number; h: number }

const primaryRoles = [
    'primary',
    'onPrimary',
    'primaryContainer',
    'onPrimaryContainer',
    'inversePrimary',
]
const secondaryRoles = [
    'secondary',
    'onSecondary',
    'secondaryContainer',
    'onSecondaryContainer',
]
const neutralRoles = [
    'background',
    'onBackground',
    'onBackgroundMuted',
    'container',
    'onContainer',
    'surface',
    'onSurface',
    'outline',
    'divider',
    'inverseSurface',
    'inverseOnSurface',
]

// The base themes are the template: each role keeps its lightness, and its
// hue and chroma move with the seed relative to the base primary. Status
// colors (error, warning, success), shadow and scrim are copied unchanged.
const reference = toOklch(parseHex(baseLightTheme.primary))

function generate(base: Theme, primary: Lch, secondary: Lch): Theme {
    const theme: Theme = { ...base }
    const set = (keys: string[], seed: Lch, neutral: boolean) => {
        // A grey seed gives grey accents and untinted neutrals
        const scale = seed.c / reference.c
        for (const key of keys) {
            const role = toOklch(parseHex(base[key as keyof Theme]!))
            const c = role.c * (neutral ? Math.min(scale, 1) : scale)
            const h = seed.h + role.h - reference.h
            ;(theme as Record<string, string>)[key] = toHex(role.l, c, h)
        }
    }
    set(primaryRoles, primary, false)
    set(secondaryRoles, secondary, false)
    set(neutralRoles, primary, true)
    return theme
}

// ---- Picking colors from an image ----------------------------------------

/** The most prominent hue, plus a second clearly different one if there is one. */
function mainColors(pixels: Uint8ClampedArray): [string, string] {
    // 36 hue buckets of 10°. Colorful pixels count for more, so a small
    // vivid subject beats a large dull background.
    const bins = Array.from({ length: 36 }, () => ({ w: 0, l: 0, a: 0, b: 0 }))
    const grey = { w: 0, l: 0, a: 0, b: 0 }
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] < 128) continue
        const [l, a, b] = toOklab([pixels[i], pixels[i + 1], pixels[i + 2]])
        const c = Math.hypot(a, b)
        const bin =
            c < 0.03 || l < 0.15 || l > 0.97
                ? grey
                : bins[Math.floor(hueOf(a, b) / 10) % 36]
        const w = bin === grey ? 1 : c
        bin.w += w
        bin.l += l * w
        bin.a += a * w
        bin.b += b * w
    }

    const toColor = (bin: typeof grey) => {
        const a = bin.a / bin.w
        const b = bin.b / bin.w
        return toHex(bin.l / bin.w, Math.hypot(a, b), hueOf(a, b))
    }
    const ranked = bins
        .map((bin, i) => ({ bin, hue: i * 10 + 5 }))
        .filter((x) => x.bin.w > 0)
        .sort((x, y) => y.bin.w - x.bin.w)

    // No colorful pixels: a grey theme from the average grey
    if (!ranked.length) {
        const color = grey.w ? toColor(grey) : baseLightTheme.primary
        return [color, color]
    }
    const first = ranked[0]
    const second = ranked.find(
        (x) =>
            hueDistance(x.hue, first.hue) >= 60 && x.bin.w >= first.bin.w * 0.1
    )
    const primary = toColor(first.bin)
    return [primary, second ? toColor(second.bin) : primary]
}

function hueOf(a: number, b: number) {
    return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360
}

function hueDistance(x: number, y: number) {
    const d = Math.abs(x - y) % 360
    return d > 180 ? 360 - d : d
}

// ---- Color conversion (sRGB <-> OKLab/OKLCH) -----------------------------

function parseHex(hex: string): [number, number, number] {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim())
    if (!m)
        throw new TypeError(`Expected a hex color like '#4355B9', got '${hex}'`)
    const full = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1]
    const n = parseInt(full, 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Declarations, not arrow consts: `reference` above runs these at import time
function toLinear(v: number) {
    v /= 255
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

function fromLinear(v: number) {
    return v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055
}

function toOklab([r8, g8, b8]: number[]): [number, number, number] {
    const r = toLinear(r8)
    const g = toLinear(g8)
    const b = toLinear(b8)
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ]
}

function toOklch(rgb: number[]): Lch {
    const [l, a, b] = toOklab(rgb)
    return { l, c: Math.hypot(a, b), h: hueOf(a, b) }
}

/** Linear sRGB for an OKLCH color; may fall outside 0–1 if out of gamut. */
function oklchToLinear(L: number, C: number, H: number) {
    const a = C * Math.cos((H * Math.PI) / 180)
    const b = C * Math.sin((H * Math.PI) / 180)
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
}

function inGamut(rgb: number[]) {
    return rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4)
}

/** Hex for an OKLCH color, lowering chroma until it fits in sRGB. */
function toHex(L: number, C: number, H: number): string {
    L = Math.min(Math.max(L, 0), 1)
    let rgb = oklchToLinear(L, C, H)
    if (!inGamut(rgb)) {
        let lo = 0
        let hi = C
        for (let i = 0; i < 20; i++) {
            const mid = (lo + hi) / 2
            if (inGamut(oklchToLinear(L, mid, H))) lo = mid
            else hi = mid
        }
        rgb = oklchToLinear(L, lo, H)
    }
    return (
        '#' +
        rgb
            .map((v) =>
                Math.round(Math.min(Math.max(fromLinear(v), 0), 1) * 255)
                    .toString(16)
                    .padStart(2, '0')
            )
            .join('')
            .toUpperCase()
    )
}
