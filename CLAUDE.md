# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install        # Node >= 20.19 required (.nvmrc pins 22)
npm start          # dev server with HMR at http://localhost:3000 (alias: npm run dev)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

There is no test runner or linter configured.

## Overview

A 2D tile-based crawler game (cyberpunk theme, UI text and some comments are in Russian). SPA built with Vite 8 + React 19, plain Redux 5 (no Redux Toolkit), react-router-dom 7, @react-spring/web for animations, and SASS modules in the indented `.sass` syntax (one `*.module.sass` per component).

## Architecture

Entry flow: `index.html` → `src/main.jsx` (creates the root, wraps in redux `<Provider>`) → `AppContainer` (shows a fake 2s preloader) → `App.jsx` (`BrowserRouter` with routes `/` menu, `/game`, `/character`, `/about`).

The codebase splits into three layers:

- **`src/gameCore/`** — pure game logic with no React/Redux dependencies. `controller.js` computes movement (`getUpdatedGameObjects` deep-clones the objects array), validates walkability against the level's tile assets, and detects collisions with event objects (`checkOnGameEvent`). `constants.js` defines the 16×16 grid of 50px sprites and animation timing. `levels/LEVELS.js` declares each level: a numeric `levelMap` grid, `levelAssets` mapping tile ids to sprite-sheet crops (`bgUrl` + `top`/`left` offsets, `walkable` flag), and that level's dialogs.
- **`src/redux/`** — hand-written reducers (action-type constants + action creators in the same file) combined in `Store.js` via `legacy_createStore`: `game`, `character`, `worldMap`, `battle`, `commonApp`, `dialogs`. State shape of note: `game.gameMode` (`'exploring' | 'speaking' | ...`) drives what renders on the game screen; `game.gameObjects` is a flat array of typed entities (hero, monster, dialog triggers…) identified by `type`; `dialogs` tracks the current dialog, read-dialog ids (so disposable dialogs fire once), and the `typing` flag.
- **`src/components/`** — container/presentational pattern: `*Container.jsx` wires redux via `connect()` for class components, while newer function components use `useSelector`/`useDispatch` directly.

Game loop: `GameContainer` listens to `window` keydown for arrow keys (throttled by `CONSTANTS.GAME_ANIMATE_SPEED`), runs the move through `gameCore/controller`, and dispatches results back to the store. Stepping onto a dialog object switches `gameMode` to `'speaking'`, which mounts the `Dialog` overlay; Enter advances phrases (or skips the `TypingText` typewriter animation while `dialogs.typing` is true) and returns to `'exploring'` when done.

Note: in `Game.jsx` the world map rendering (`WorldMapContainer`, `GameObjectsContainer`) is currently commented out by the author and `Battle` renders instead — this is intentional work-in-progress, not a bug.
