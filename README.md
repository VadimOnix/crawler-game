# Crawler Game

A small browser crawler game written in TypeScript, built with React 19 and [Vite](https://vite.dev/).

**Play online:** https://vadimonix.github.io/crawler-game/ (deployed automatically from `master` via GitHub Pages; the URL follows the repository name).

## Requirements

- Node.js 20.19+ (an active LTS release — 22 or 24 — is recommended, see `.nvmrc`)
- npm

## Getting Started

Install dependencies:

```sh
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start` (or `npm run dev`)

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will hot-reload when you make edits.

### `npm run lint`

Runs ESLint over the project with zero tolerance for warnings (`eslint . --max-warnings 0`).

### `npm run format` / `npm run format:check`

Formats the codebase with Prettier / verifies that everything is formatted. `.sass` files are excluded — Prettier does not support the indented syntax.

### `npm test` / `npm run test:watch`

Runs the Vitest suite once / in watch mode. Tests live next to the code (`src/**/*.test.ts`) and cover the pure game core and the Zustand stores.

### `npm run typecheck`

Runs the TypeScript compiler in check-only mode (`tsc --noEmit`). The Vite dev server and build only transpile TypeScript — this command is the actual type check.

### `npm run build`

Type-checks the project and builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the production build from `dist` locally for a final check before deploying.

## Quality Gates

- **Pre-commit hook** (husky + lint-staged): staged files are linted and formatted automatically on every commit.
- **CI** (`.github/workflows/ci.yml`): lint, format check, typecheck, tests, and build run on every push to `master` and on pull requests.
- **Dependabot**: weekly dependency updates (minor and patch npm updates grouped into a single PR).

## Deployment

Every push to `master` triggers `.github/workflows/deploy.yml`, which builds the game and publishes it to GitHub Pages. The build uses a relative base path (`base: './'` in `vite.config.ts`) and a `HashRouter`, so it works under any URL prefix — renaming the repository or attaching a custom domain requires no code changes.

## Releases

Releases are tag-driven. Bump the version and push the tag:

```sh
npm version minor   # or patch / major
git push --follow-tags
```

The `Release` workflow re-runs all checks, builds the game, and publishes a GitHub Release with auto-generated notes and a zipped `dist/`.

## License

[MIT](./LICENSE)
