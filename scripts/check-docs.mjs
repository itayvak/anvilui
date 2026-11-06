// Checks that every ```tsx example in core/AGENTS.md and core/docs is real
// code: it type-checks against core/src, and each exported component renders
// inside AnvilRoot without throwing or logging an [anvilui] error.
//   npm run docs:check
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const core = path.join(root, 'core')
const work = path.join(root, '.docs-check')
const examples = path.join(work, 'examples')

fs.rmSync(work, { recursive: true, force: true })
fs.mkdirSync(examples, { recursive: true })

// 1. Pull out the examples, one file per block
const pages = [
    'AGENTS.md',
    ...fs.readdirSync(path.join(core, 'docs')).map((f) => `docs/${f}`),
]
let count = 0
for (const page of pages) {
    const text = fs
        .readFileSync(path.join(core, page), 'utf8')
        .replace(/\r\n/g, '\n')
    ;[...text.matchAll(/```tsx\n([\s\S]*?)```/g)].forEach((match, i) => {
        // Entry files call createRoot when imported: type-check them, don't render
        const ext = match[1].includes('createRoot(') ? '.entry.tsx' : '.tsx'
        const name = `${path.basename(page, '.md').replace(/\W/g, '_')}__${i + 1}${ext}`
        fs.writeFileSync(path.join(examples, name), match[1])
        count++
    })
}
// Some examples import a sibling App component
fs.writeFileSync(
    path.join(examples, 'App.tsx'),
    'export function App() { return null }\n'
)

// 2. Type-check them against the source, as if 'anvilui' were installed
const rel = (p) => path.relative(work, p).replace(/\\/g, '/')
fs.writeFileSync(
    path.join(work, 'tsconfig.json'),
    JSON.stringify({
        compilerOptions: {
            target: 'ES2022',
            lib: ['ES2022', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            moduleResolution: 'Bundler',
            jsx: 'react-jsx',
            strict: true,
            skipLibCheck: true,
            noEmit: true,
            paths: { anvilui: [rel(path.join(core, 'src/index.ts'))] },
        },
        include: [
            'examples',
            rel(path.join(core, 'src/css.d.ts')),
            rel(path.join(core, 'src/env.d.ts')),
        ],
    })
)
try {
    execFileSync(
        process.execPath,
        [path.join(root, 'node_modules/typescript/bin/tsc'), '-p', work],
        {
            stdio: 'inherit',
        }
    )
} catch {
    console.error('\nDocs examples have type errors (see above).')
    process.exit(1)
}

// 3. Render every exported component on the server and collect errors
fs.writeFileSync(
    path.join(work, 'render.tsx'),
    `import { renderToString } from 'react-dom/server'
import { AnvilRoot } from 'anvilui'

const modules = import.meta.glob(['./examples/*.tsx', '!./examples/*.entry.tsx'], { eager: true })

export function run() {
    const problems: string[] = []
    let current = ''
    const original = console.error
    console.error = (...args: unknown[]) => problems.push(current + ': ' + String(args[0]).split('\\n')[0])
    let rendered = 0
    for (const [file, mod] of Object.entries(modules) as [string, Record<string, unknown>][]) {
        for (const [name, value] of Object.entries(mod)) {
            if (typeof value !== 'function' || !/^[A-Z]/.test(name)) continue
            current = file.replace('./examples/', '') + '#' + name
            const Component = value as () => null
            try {
                renderToString(<AnvilRoot><Component /></AnvilRoot>)
                rendered++
            } catch (error) {
                problems.push(current + ': threw ' + (error as Error).message.split('\\n')[0])
            }
        }
    }
    console.error = original
    return { rendered, problems }
}
`
)
// Components import their own CSS from source, so the bundled sheet isn't needed
fs.writeFileSync(path.join(work, 'styles.css'), '')
await build({
    root: work,
    logLevel: 'error',
    mode: 'development',
    resolve: {
        alias: [
            { find: /^anvilui$/, replacement: path.join(core, 'src/index.ts') },
            {
                find: /^anvilui\/styles\.css$/,
                replacement: path.join(work, 'styles.css'),
            },
        ],
    },
    build: {
        ssr: path.join(work, 'render.tsx'),
        outDir: path.join(work, 'dist'),
        emptyOutDir: true,
    },
})
const { run } = await import(
    pathToFileURL(path.join(work, 'dist/render.mjs')).href
)
const { rendered, problems } = run()

if (problems.length) {
    console.error(problems.join('\n'))
    console.error(
        `\n${problems.length} problem(s) while rendering docs examples.`
    )
    process.exit(1)
}
fs.rmSync(work, { recursive: true, force: true })
console.log(
    `Docs OK: ${count} examples type-check, ${rendered} components render cleanly.`
)
