# Working on the AnvilUI repo

Instructions for AI coding agents changing this repository. AnvilUI (`anvilui` on npm) is a React 19 component library implementing Material 3 Expressive, built on Base UI (`@base-ui/react`).

**Before creating or changing a component, read [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md).** It has the rules for props, class names, CSS variables, accessibility and docs. Follow them; don't copy patterns from a file that breaks them.

## Layout

- `core/` is the published package: `src/` (one folder per component, plus `index.ts` with every public export), `docs/` and `AGENTS.md` (user docs that ship in the package), `bin/` (the `npx anvilui setup-agents` CLI).
- `playground/` is a Vite app with a page per component. It imports `core/src` directly, so changes show up without rebuilding.
- `scripts/` builds and checks the docs. `public/` holds generated `llms.txt` / `llms-full.txt`.

`core/AGENTS.md` is not instructions for you. It's the API reference for people _using_ the library, shipped to npm. Treat it, and `core/docs/`, as product files to keep accurate.

## Commands

| After you change                            | Run                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| any TypeScript in `core/`                   | `npx tsc --noEmit -p .` in `core/`                                                                           |
| a component's API, or any docs              | `npm run docs:check` from the root (every docs example must type-check and render), then `npm run docs:llms` |
| anything                                    | `npm run format` from the root                                                                               |
| before saying you're done with package code | `npm run build` in `core/`                                                                                   |

## Rules

- **Docs follow the code.** Users mostly reach AnvilUI through AI agents that only know what `core/AGENTS.md` and `core/docs/` say. When a prop, default or export changes, update every page and `core/AGENTS.md` entry that mentions it in the same change. New components need a docs page, a line in `core/docs/llms-index.md`, and entries in `core/AGENTS.md` (see the guide's Documentation section).
- **Check Base UI instead of guessing.** Its docs ship in `node_modules/@base-ui/react/docs/react/components/<name>.md`, with the exact props, defaults and data attributes.
- **Don't edit generated files by hand.** `public/llms.txt` and `public/llms-full.txt` come from `npm run docs:llms`; `core/dist/` from the build.
- **Keep the docs compact.** `core/AGENTS.md`, `core/docs/` and `public/` are excluded from Prettier on purpose, because it pads markdown tables. Don't reformat them.
- **Dev-only errors** go through the helpers in `core/src/dev.ts`, inside `if (process.env.NODE_ENV !== 'production')`, and name the docs page that explains the fix.
- **Never bump the version, publish to npm, or push** unless asked. Releases follow [CONTRIBUTING.md](CONTRIBUTING.md#releasing).
- Don't add runtime dependencies. React and Base UI are the base.
