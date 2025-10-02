## we.code — Real‑time Collaborative Code Editor (Frontend)

A glassmorphic, real‑time collaborative code editor built with React + Vite, CodeMirror 6, Tailwind CSS, and framer‑motion. Users can create or join a room and edit code together live over WebSockets powered by Socket.IO.

### Features
- **Live collaboration**: Synchronize code across participants in a room
- **Room management**: Create room with a UUID or join via Room ID
- **Modern editor**: CodeMirror 6 with One Dark theme and sensible defaults
- **Glassy UI**: Tailwind‑powered glassmorphism with subtle gradients/blur
- **Smooth motion**: framer‑motion animations for page and control transitions
- **Toasts**: Non‑intrusive notifications with `react-hot-toast`

### Tech stack
- **React + Vite** (React 19)
- **CodeMirror 6** (`@codemirror/*`, `codemirror`)
- **Socket.IO Client** (`socket.io-client`)
- **Tailwind CSS** (v4) + `@tailwindcss/vite`
- **framer-motion**
- **react-router-dom** for routing
- **uuid** for Room IDs

## Getting started

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Install
```bash
pnpm install
```

### Environment
Create a `.env` file in the project root and configure the backend URL for Socket.IO:
```bash
VITE_BACKEND_URL=http://localhost:3001
```
- The frontend reads this in `src/socket.js` and connects with WebSocket transport.

### Scripts
```bash
pnpm dev       # start Vite dev server
pnpm build     # production build
pnpm preview   # preview the production build
pnpm lint      # run eslint
```

## Usage
1. Start the backend Socket.IO server at `VITE_BACKEND_URL`.
2. Start this frontend with `pnpm dev`.
3. Open the app in the browser.
4. On the Home screen:
   - Paste an existing Room ID and your username, or
   - Click “new room” to generate a Room ID.
5. You’ll be navigated to `/editor/:roomId` where CodeMirror loads.
6. Invite others with the same Room ID. Code changes will sync live.

## Project structure
```text
frontend/
  Actions.js                  # Socket action names (join, joined, code-change, sync-code, ...)
  src/
    pages/
      Home.jsx               # Join/create room UI
      Editor.jsx             # Editor screen with socket wiring
    components/
      CodeEditor.jsx         # CodeMirror 6 integration + socket syncing
      Input.jsx, Button.jsx  # UI components
    socket.js                # Socket.IO client init using VITE_BACKEND_URL
  public/
    wecode_logo.png          # App logo
  index.html, vite.config.js, package.json, etc.
```

## Key flows
- `Home.jsx`: generates Room ID with `uuid` and navigates to `/editor/:roomId` with `username` in navigation state. Enter triggers join.
- `Editor.jsx`: initializes socket, emits `join`, listens for `joined` and `disconnected`, and syncs code via `ACTIONS.CODE_CHANGE` and `ACTIONS.SYNC_CODE`.
- `CodeEditor.jsx`: sets up CodeMirror; sends local edits over socket and applies remote edits flagged as `Transaction.userEvent = "remote"` to prevent echo.

## Styling and motion
- Tailwind v4 utilities + gradients and `backdrop-blur` for glassmorphism
- framer‑motion for enter/hover/tap transitions on Home and Editor screens

## Notes
- Ensure the backend uses compatible Socket.IO settings and CORS for the frontend origin.
- The editor initializes with a simple JS snippet; adapt extensions and languages as needed.

## License
This project is provided as‑is for learning and demonstration purposes. Add your preferred license if publishing.
