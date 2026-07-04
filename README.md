# Crawler Game

A small browser crawler game written in TypeScript, built with React 19 and [Vite](https://vite.dev/).

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

### `npm run typecheck`

Runs the TypeScript compiler in check-only mode (`tsc --noEmit`). The Vite dev server and build only transpile TypeScript — this command is the actual type check, and CI runs it on every push and pull request.

### `npm run build`

Type-checks the project and builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the production build from `dist` locally for a final check before deploying.
