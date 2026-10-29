import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false,
    sourcemap: true,
    clean: true,
    // Component CSS goes to dist/index.css (consumers import 'anvilui/styles.css').
    // material-symbols is a dependency, so tsup leaves its CSS import for the
    // app's bundler, which emits the ~4 MB icon font as an asset.
    injectStyle: false,
    external: ['react', 'react-dom'],
})
