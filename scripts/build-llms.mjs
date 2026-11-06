// Builds public/llms.txt (llmstxt.org index) and public/llms-full.txt (every
// doc in one file) from core/AGENTS.md and core/docs. Run after editing docs:
//   npm run docs:llms
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const core = path.join(root, 'core')
const docsDir = path.join(core, 'docs')
const outDir = path.join(root, 'public')

// Raw GitHub files until there's a docs site; change BASE when there is one
const BASE = 'https://raw.githubusercontent.com/itayvak/anvilui/main/core'

const read = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
const index = read(path.join(docsDir, 'llms-index.md'))

// llms-index.md is "## Section" headings over "- [file.md](file.md): text" lines
const sections = []
for (const line of index.split('\n')) {
    const heading = /^## (.+)/.exec(line)
    if (heading) sections.push({ title: heading[1], links: [] })
    const link = /^- \[(.+?)\]\((.+?\.md)\): (.+)/.exec(line)
    if (link && sections.length) {
        const [, , file, description] = link
        const title = fs.existsSync(path.join(docsDir, file))
            ? (read(path.join(docsDir, file)).match(/^# (.+)/m)?.[1] ?? file)
            : file
        sections.at(-1).links.push({ title, file, description })
    }
}

const listed = new Set(sections.flatMap((s) => s.links.map((l) => l.file)))
const missing = fs
    .readdirSync(docsDir)
    .filter((f) => f.endsWith('.md') && f !== 'llms-index.md' && !listed.has(f))
if (missing.length) {
    console.error(`Not listed in docs/llms-index.md: ${missing.join(', ')}`)
    process.exit(1)
}

const llms = [
    '# AnvilUI',
    '',
    "> AnvilUI (`anvilui` on npm) is a React 19 component library with Material 3 styling, built on Base UI. Wrap the app in `AnvilRoot` and import `anvilui/styles.css`. Style props are `fillType` and `color` (not `variant`), icons are Material Symbols name strings, and parts are customized with Base UI's `render` prop (not `asChild`).",
    '',
    'The same docs ship inside the package at `node_modules/anvilui/AGENTS.md` and `node_modules/anvilui/docs/`, matching the installed version.',
    '',
    '## Start here',
    '',
    `- [AGENTS.md](${BASE}/AGENTS.md): rules, setup, every export, props summary, patterns and common mistakes`,
    `- [Full docs](https://raw.githubusercontent.com/itayvak/anvilui/main/public/llms-full.txt): all pages in one file`,
    '',
    ...sections.flatMap((s) => [
        `## ${s.title}`,
        '',
        ...s.links.map(
            (l) => `- [${l.title}](${BASE}/docs/${l.file}): ${l.description}`
        ),
        '',
    ]),
].join('\n')

const pages = sections.flatMap((s) => s.links.map((l) => l.file))
const full = [
    '# AnvilUI documentation (all pages)',
    '',
    'Generated from core/AGENTS.md and core/docs/*.md. Relative links point into the docs/ folder.',
    '',
    '<!-- file: AGENTS.md -->',
    '',
    read(path.join(core, 'AGENTS.md')).trim(),
    ...pages.flatMap((file) => [
        '',
        '---',
        '',
        `<!-- file: docs/${file} -->`,
        '',
        read(path.join(docsDir, file)).trim(),
    ]),
    '',
].join('\n')

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'llms.txt'), llms)
fs.writeFileSync(path.join(outDir, 'llms-full.txt'), full)
console.log(
    `public/llms.txt: ${pages.length} pages; public/llms-full.txt: ${(full.length / 1024).toFixed(0)} KB`
)
