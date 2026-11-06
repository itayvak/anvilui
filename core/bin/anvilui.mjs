#!/usr/bin/env node
// `npx anvilui setup-agents`: tells the project's AI coding agents to read
// the docs that ship in node_modules/anvilui. Only runs when called.
import fs from 'node:fs'
import path from 'node:path'

const MARKER = '<!-- anvilui-agent-docs -->'
const SNIPPET = `${MARKER}
## AnvilUI

This project uses the \`anvilui\` React component library. Its API differs from shadcn/ui, Radix and MUI, so don't guess it. Before writing or changing UI code that uses it, read \`node_modules/anvilui/AGENTS.md\`, then the page for each component you use in \`node_modules/anvilui/docs/\` (index: \`node_modules/anvilui/docs/llms-index.md\`). These docs match the installed version; prefer them over memory.
`

// Instruction files agents read, in the order we look for them
const KNOWN = [
    'AGENTS.md',
    'CLAUDE.md',
    '.cursorrules',
    '.github/copilot-instructions.md',
]

const HELP = `Usage: npx anvilui setup-agents [--file <path>]...

Adds a short note to your AI agent instruction files telling agents to read
node_modules/anvilui/AGENTS.md before writing code with AnvilUI.

  With no --file, updates every one of ${KNOWN.join(', ')}
  that exists in the current folder, or creates AGENTS.md if none do.
  Files that already have the note are left alone.

  --file <path>   Update (or create) this file instead. Repeatable.
`

const [command, ...args] = process.argv.slice(2)

if (command !== 'setup-agents') {
    process.stdout.write(HELP)
    process.exit(
        command === undefined || command === '--help' || command === '-h'
            ? 0
            : 1
    )
}

const files = []
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) files.push(args[++i])
    else if (args[i] === '--help' || args[i] === '-h') {
        process.stdout.write(HELP)
        process.exit(0)
    } else {
        process.stderr.write(`Unknown option: ${args[i]}\n\n${HELP}`)
        process.exit(1)
    }
}

const cwd = process.cwd()
if (files.length === 0) {
    files.push(...KNOWN.filter((f) => fs.existsSync(path.join(cwd, f))))
    if (files.length === 0) files.push('AGENTS.md')
}

for (const file of files) {
    const full = path.resolve(cwd, file)
    const existing = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null
    if (existing?.includes(MARKER)) {
        console.log(`unchanged  ${file} (already has the AnvilUI note)`)
        continue
    }
    fs.mkdirSync(path.dirname(full), { recursive: true })
    if (existing === null) {
        fs.writeFileSync(full, SNIPPET)
        console.log(`created    ${file}`)
    } else {
        const gap = existing.endsWith('\n\n')
            ? ''
            : existing.endsWith('\n')
              ? '\n'
              : '\n\n'
        fs.appendFileSync(full, gap + SNIPPET)
        console.log(`updated    ${file}`)
    }
}
