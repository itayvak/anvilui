# Contributing to AnvilUI

Thanks for wanting to help! Bug reports, fixes, new components, docs improvements and design feedback are all welcome. This page gets you set up and explains how changes land. For how components themselves are built, see the [component guide](COMPONENT_GUIDE.md).

## Ways to help

- **Found a bug?** [Open an issue](https://github.com/itayvak/anvilui/issues) with what you did, what you expected, and what happened. A small code snippet, your browser, and whether it's light or dark mode help a lot.
- **Have an idea for a component or prop?** Open an issue first and describe the use case. AnvilUI deliberately keeps its API small, so it's worth agreeing on the shape before you write code.
- **Docs unclear or wrong?** Fix them directly. Docs are as important as code here, because most people use AnvilUI through an AI coding agent that only knows what the docs say.
- **Small fixes** (typos, a broken style, a missing `aria-label`) can go straight to a pull request.

## Getting set up

You need Node.js 22 or newer (20.19+ works too) and npm.

```sh
git clone https://github.com/itayvak/anvilui.git
cd anvilui
npm install
```

The repo is an npm workspace with two packages:

- **`core/`** is the `anvilui` package: components, styles, and the docs that ship with it.
- **`playground/`** is a local app with an interactive page for every component. It uses `core/src` directly, so your changes show up instantly.

Start the playground and open the URL it prints:

```sh
cd playground
npm run dev
```

## Commands

| Where         | Command              | What it does                                                    |
| ------------- | -------------------- | --------------------------------------------------------------- |
| root          | `npm run format`     | Formats everything with Prettier                                |
| root          | `npm run docs:check` | Type-checks and renders every example in the docs               |
| root          | `npm run docs:llms`  | Regenerates `public/llms.txt` and `llms-full.txt` from the docs |
| `core/`       | `npm run build`      | Builds the package and its type definitions                     |
| `core/`       | `npm run dev`        | Rebuilds the package on every change                            |
| `playground/` | `npm run dev`        | Runs the playground                                             |

Using an AI coding agent? Most of them (Claude Code, Codex, Cursor, Copilot) read [AGENTS.md](AGENTS.md) at the repo root, which points them at the same rules and commands.

## Making a change

1. Create a branch from `main`.
2. Make your change. For anything touching a component, follow the [component guide](COMPONENT_GUIDE.md); its checklist covers code, styles, playground and docs.
3. Try it in the playground in light **and** dark mode, using only the keyboard, and with reduced motion turned on in your OS.
4. Before you push, from the repo root:
    ```sh
    npm run format
    npm run docs:check
    npm run docs:llms
    ```
    and `npm run build` in `core/`.
5. Open a pull request. Describe what changed and why, and add a screenshot or short clip for anything visual.

A good pull request does one thing. If you notice something unrelated along the way, a separate PR (or an issue) keeps reviews quick.

### When you change a component's API

Renaming a prop, changing a default or removing something affects everyone who already uses it, including their AI agents. Mention it clearly in the PR, update every docs page and `core/AGENTS.md` entry that shows the old API, and expect it to wait for a minor version bump.

## Releasing

Maintainers publish from `core/`:

1. Bump the version: `npm version <patch|minor> --no-git-tag-version` in `core/`. Before 1.0, a minor bump signals breaking changes.
2. From the repo root, run `npm run docs:check` and `npm run docs:llms`.
3. `npm publish` in `core/`. It builds first, and npm will ask for two-factor confirmation.
4. Commit the version bump and push to `main`.

The docs in `core/AGENTS.md` and `core/docs/` ship inside the package, so they reach users with the release. `public/llms.txt` and the GitHub docs update as soon as `main` is pushed.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](core/LICENSE).
