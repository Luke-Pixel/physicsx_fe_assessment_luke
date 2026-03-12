# PhysicsX FE Assessment

This project is a small React and TypeScript application for visualising time based grid data from `data.json`.

The UI lets you:

- display a grid of values for a selected unit
- change between pressure, temperature, and kelvin
- play, pause, and reset playback across multiple steps
- colour each grid cell based on the current metric value

## Potential Improvements - Due to time constraint

- Moving types to types folder in unified structure
- CSS styling to improve UI
- Split API's per unit type and fetch individually, caching result with tanstack query
- Pagination, possible but pagination on step may cause slow rendering when playing depending on api/network speed
- Cell text color, set cell color to black when background is light 
- fix code indention with prettier

## Technology

This project uses:

- React 18
- TypeScript
- Vite
- Express
- TanStack Query
- D3 scale and d3 scale chromatic
- Vitest and Testing Library

## Prerequisites

- Node.js
- npm

## Install

Install dependencies with:

```bash
npm install
```

## Run the app

The project has a frontend and a small local Express server.

Start the API server in one terminal:

```bash
node server.js
```

This serves:

- `http://localhost:5001/api/grid`
- `http://localhost:5001/api/iterations`

Start the frontend in another terminal:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Run tests

Run the test suite with:

```bash
npm test -- --run
```

## Lint

Run linting with:

```bash
npm run lint
```

## Project structure

- `src/pages/ResultVisualization` contains the main visualization page, components, and local context providers
- `src/utils` contains formatting and color scale utilities
- `server.js` exposes the local API endpoints used by the frontend
- `data.json` contains the playback and grid data
