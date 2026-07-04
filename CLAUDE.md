# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install        # Node >= 20.19 required (.nvmrc pins 22)
npm start          # dev server with HMR at http://localhost:3000 (alias: npm run dev)
npm run typecheck  # tsc --noEmit (Vite only transpiles, it does not check types)
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```

There is no test runner or linter configured. CI (`.github/workflows/ci.yml`) runs typecheck + build on every push to master and on pull requests.

## Overview

A 2D tile-based crawler game (cyberpunk theme, UI text and some comments are in Russian). SPA written in TypeScript (strict mode) built with Vite 8 + React 19, Zustand 5 for state, react-router-dom 7, @react-spring/web for animations, and SASS modules in the indented `.sass` syntax (one `*.module.sass` per component).

TypeScript conventions: domain types (`GameObject`, `Level`, `TileAsset`, dialog shapes) live in `src/gameCore/types.ts`; enum-like constants and their union types (`GameMode`, `Direction`, …) in `src/gameCore/constants.ts` — use these instead of magic strings.

## Architecture

Entry flow: `index.html` → `src/main.tsx` (creates the root; Zustand needs no provider) → `AppContainer` (shows a fake 2s preloader) → `App.tsx` (`BrowserRouter` with routes `/` menu, `/game`, `/character`, `/about`).

The codebase splits into three layers:

- **`src/gameCore/`** — pure game logic with no React/store dependencies. `controller.ts` computes movement immutably (`getUpdatedGameObjects` returns a new objects array), validates walkability against the level's tile assets, and detects collisions with event objects (`checkOnGameEvent`). `constants.ts` defines the 16×16 grid of 50px sprites, animation timing, and the shared enums. `levels/LEVELS.ts` is the single source of truth for level data: a numeric `levelMap` grid, `levelAssets` mapping tile ids to sprite-sheet crops (`bgUrl` + `top`/`left` offsets, `walkable` flag), the level's starting `gameObjects` (entities with sprites and coords), and its dialogs.
- **`src/stores/`** — Zustand stores, one per domain, each wrapped in the `devtools` middleware (action names passed as the third `set` argument): `gameStore` (level number, `gameMode`, `gameObjects`), `dialogsStore` (current dialog, read-dialog ids so disposable dialogs fire once, the `typing` flag), `commonAppStore` (preloader, background, menu options). Conventions: in components subscribe with narrow selectors (`useGameStore(s => s.gameMode)`); in event handlers and imperative code read/write via `useXxxStore.getState()` — this keeps handlers stable with no stale closures. Static level data is NOT copied into stores — they keep only the current level number, and containers read `LEVELS[level]` directly. There is no battle store yet; create one when the battle system lands.
- **`src/components/`** — thin `*Container.tsx` components select store state and pass it to presentational components; all components are functions (no classes).

Game loop: `GameContainer` loads the level on mount and listens to `window` keydown for arrow keys (`KEY_TO_DIRECTION`, throttled by `CONSTANTS.GAME_ANIMATE_SPEED`) with a handler that reads both stores imperatively, runs the move through `gameCore/controller`, and writes the resulting objects back. `Game.tsx` always renders the board (`WorldMapContainer` + `GameObjectsContainer`, which only draws objects that have a sprite) and conditionally mounts overlays by `gameMode`: stepping onto a dialog trigger switches to `SPEAKING` and mounts `Dialog` (Enter advances phrases or skips the `TypingText` typewriter animation while `typing` is true; dialog-box styling comes from the speaker's `role` in the level data), and `BATTLE` mounts the `Battle` screen (template only for now — nothing sets this mode yet).
