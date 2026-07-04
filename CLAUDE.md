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

A 2D tile-based crawler game (cyberpunk theme, UI text and some comments are in Russian). SPA written in TypeScript (strict mode) built with Vite 8 + React 19, plain Redux 5 (no Redux Toolkit), react-router-dom 7, @react-spring/web for animations, and SASS modules in the indented `.sass` syntax (one `*.module.sass` per component).

TypeScript conventions: domain types (`GameObject`, `Level`, `TileAsset`, dialog shapes) live in `src/gameCore/types.ts`; enum-like constants and their union types (`GameMode`, `Direction`, …) in `src/gameCore/constants.ts`. In components use the typed hooks from `src/redux/hooks.ts` (`useAppSelector`/`useAppDispatch`) instead of bare react-redux hooks; class containers use the `connect()` + `ConnectedProps<typeof connector>` pattern. Each redux slice types its own action union; `Store.ts` bridges them into `combineReducers` with a single documented cast (redux 5's types otherwise demand reducers accept `UnknownAction`).

## Architecture

Entry flow: `index.html` → `src/main.tsx` (creates the root, wraps in redux `<Provider>`) → `AppContainer` (shows a fake 2s preloader) → `App.tsx` (`BrowserRouter` with routes `/` menu, `/game`, `/character`, `/about`).

The codebase splits into three layers:

- **`src/gameCore/`** — pure game logic with no React/Redux dependencies. `controller.js` computes movement immutably (`getUpdatedGameObjects` returns a new objects array), validates walkability against the level's tile assets, and detects collisions with event objects (`checkOnGameEvent`). `constants.js` defines the 16×16 grid of 50px sprites, animation timing, and the shared enums (`GAME_MODES`, `DIRECTIONS`, `KEY_TO_DIRECTION`, `OBJECT_TYPES`, `SPEAKER_ROLES`) — use these instead of magic strings. `levels/LEVELS.js` is the single source of truth for level data: a numeric `levelMap` grid, `levelAssets` mapping tile ids to sprite-sheet crops (`bgUrl` + `top`/`left` offsets, `walkable` flag), the level's starting `gameObjects` (entities with sprites and coords), and its dialogs.
- **`src/redux/`** — hand-written reducers (action-type constants + action creators in the same file) combined in `Store.ts` via `legacy_createStore`: `game`, `battle` (stub, battle system is WIP), `commonApp`, `dialogs`. Static level data is NOT copied into the store — the store keeps only the current level number, and containers read `LEVELS[level]` directly. State shape of note: `game.gameMode` (see `GAME_MODES`) drives which overlays render on the game screen; `game.gameObjects` is a flat array of typed entities loaded from the level on `LOAD_LEVEL`; `dialogs` tracks the current dialog, read-dialog ids (so disposable dialogs fire once), and the `typing` flag.
- **`src/components/`** — container/presentational pattern: `*Container.jsx` wires redux via `connect()` for class components, while function components use `useSelector`/`useDispatch` directly.

Game loop: `GameContainer` loads the level on mount and listens to `window` keydown for arrow keys (`KEY_TO_DIRECTION`, throttled by `CONSTANTS.GAME_ANIMATE_SPEED`), runs the move through `gameCore/controller`, and dispatches the resulting objects back to the store. `Game.jsx` always renders the board (`WorldMapContainer` + `GameObjectsContainer`, which only draws objects that have a sprite) and conditionally mounts overlays by `gameMode`: stepping onto a dialog trigger switches to `SPEAKING` and mounts `Dialog` (Enter advances phrases or skips the `TypingText` typewriter animation while `dialogs.typing` is true; dialog-box styling comes from the speaker's `role` in the level data), and `BATTLE` mounts the `Battle` screen (template only for now — nothing sets this mode yet).
