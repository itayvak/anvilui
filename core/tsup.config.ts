import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false,
    sourcemap: true,
    clean: true,
    injectStyle: true,
    // Keep the icon font's CSS out of the bundle: it points at a ~4 MB .woff2,
    // so the app's bundler should resolve it and emit the font as an asset.
    external: ['react', 'react-dom', 'material-symbols/outlined.css'],
})
