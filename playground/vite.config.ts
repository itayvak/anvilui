import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    root: 'src',
    plugins: [react()],
    resolve: {
        alias: {
            // Use core's source, not its build output. Consuming core/dist means
            // every rebuild swaps one opaque bundle, which Fast Refresh cannot
            // patch, and tsup's `clean` deletes the file Vite is watching.
            anvilui: fileURLToPath(
                new URL('../core/src/index.ts', import.meta.url)
            ),
        },
    },
})
