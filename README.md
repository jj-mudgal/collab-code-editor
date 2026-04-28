# Real-time Collaborative Code Editor

> A Google Docs-style collaborative coding environment — edit code together, live, with multiple users.

{paste image — screenshot of the full app open in a browser, showing the Monaco editor on the left and the chat panel on the right, ideally with some code typed in and a chat message visible}

---

## *:･✧Features

- **Real-time multi-user editing** — changes sync instantly across all connected clients
- **Operational Transformation (OT)** — concurrent edits are resolved consistently, no conflicts
- **Live cursor sync** — see where other users are editing in real time
- **In-editor chat** — built-in chat panel per room, no external tool needed
- **Code execution sandbox** — run JavaScript and Python directly in the editor
- **Room-based sessions** — each room is isolated with its own state and users
- **Version history** — snapshots and delta-based versioning with diff support
- **Heartbeat & reconnection** — dead connections are auto-cleaned via WebSocket ping/pong
- **Rate limiting** — per-client request throttling built into the server
- **Structured logging** — JSON logs with timestamps, latency tracking, and operation metadata

---

## *:･✧Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| Backend | Node.js, Express 5, TypeScript |
| Real-time | WebSockets (`ws`) |
| Sync | Operational Transformation (OT) |
| Execution | Node.js `child_process` (Docker-ready) |
| Containerization | Docker + Docker Compose |

---

## *:･✧Architecture

```
Client (React + Monaco)
    |
    |  WebSocket (ws://)
    v
Server (Node.js + Express)
    |
    |-- Room Manager      — tracks clients per room
    |-- PubSub            — broadcasts messages within a room
    |-- Event Bus         — decoupled handler registration
    |-- OT Engine         — transforms concurrent operations
    |-- Version Store     — checkpoint + delta versioning
    `-- Code Executor     — sandboxed code execution
```

{paste image — a simple architecture diagram if you have one drawn out, OR a screenshot of the terminal showing the server starting up and a client connecting with the JSON logs printed}

---

## *:･✧WebSocket Message Flow

```
Client joins room
    --> Server adds client to room
    --> Server sends latest code state (sync)

Client edits code
    --> Sends "code-change" event
    --> Server applies OT, publishes to room
    --> All other clients in room receive update

Client moves cursor
    --> Sends "cursor-move" event
    --> Server broadcasts to room
    --> Remote cursors rendered in other editors

Client sends chat
    --> Sends "chat" event
    --> Broadcast to room with username + timestamp
```

---

## *:･✧Sync Strategy: Operational Transformation (OT)

Each edit is expressed as an **operation** — an `insert` or `delete` at a character index. When two users edit simultaneously, operations are **transformed** against each other to ensure consistency.

```ts
// Example operation
{ type: "insert", index: 5, value: "!" }

// transform(op1, op2) adjusts op2's index based on what op1 did
```

**Why OT over CRDT?**
- Simpler to implement for linear text
- Lower memory overhead for small teams
- Well-suited for real-time editors

> Future: migrate to [Yjs](https://yjs.dev/) or [Automerge](https://automerge.org/) for large-scale use.

---

## *:･✧Project Structure

```
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |   |-- layout/Editor.tsx        # Monaco editor wrapper
|   |   |   |-- chat/Chat.tsx            # Chat panel
|   |   |   `-- users/UserList.tsx       # Active users sidebar
|   |   |-- ot.ts                        # OT logic (apply + transform)
|   |   |-- sync.ts / syncManager.ts     # Client-side sync
|   |   |-- cursor.ts / cursorManager.ts # Cursor tracking + rendering
|   |   |-- socket.ts / socketEvents.ts  # WebSocket setup
|   |   `-- App.tsx
|   `-- Dockerfile
|
|-- server/
|   `-- src/
|       |-- socket/                      # WS setup, heartbeat, rate limit, validation
|       |-- rooms/roomManager.ts         # Room join/leave/list
|       |-- pubsub/pubsub.ts             # In-memory pub-sub
|       |-- events/eventBus.ts           # Event registration + dispatch
|       |-- handlers/                    # code, chat, cursor handlers
|       |-- versioning/                  # Snapshots, deltas, diffs
|       |-- execution/execute.ts         # Code execution (JS + Python)
|       |-- logger/logger.ts             # Structured JSON logger
|       `-- index.ts
|
`-- docker-compose.yml
```

---

## *:･✧Getting Started

### Prerequisites
- Node.js 18+
- Docker (optional, for containerized run)

### Run locally

**1. Clone the repo**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

**2. Start the server**
```bash
cd server
npm install
npm run dev
```

**3. Start the client** (in a new terminal)
```bash
cd client
npm install
npm run dev
```

**4. Open in browser**

Go to `http://localhost:5173`. Open the same URL in two tabs to test multi-user editing.

{paste image — two browser windows side by side, both showing the editor, with one user typing and the change appearing in the other window}

### Run with Docker

```bash
docker-compose up --build
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

---

## *:･✧Deployment

| Service | Deploy to |
|---|---|
| Backend | [Render](https://render.com) / [Railway](https://railway.app) |
| Frontend | [Vercel](https://vercel.com) / [Netlify](https://netlify.com) |

**Backend env variables:**
```
PORT=5000
```

**Frontend:** Update the WebSocket URL in `client/src/socket.ts` from `ws://localhost:5000` to your production backend URL.

> (!) Replace `origin: "*"` in the CORS config with your actual frontend domain before deploying.

---

## *:･✧Security Notes

- Malformed WebSocket payloads are validated and dropped
- Rate limiting: max 20 messages per second per client
- Code execution has a 2s timeout and 1MB output cap
- Dead connections cleaned up every 10s via heartbeat
- **TODO:** Docker-based sandbox isolation for code execution
- **TODO:** Authentication + room authorization

---

## *:･✧Roadmap

- [x] Monaco editor UI
- [x] WebSocket sync
- [x] Multi-user rooms
- [x] Cursor tracking
- [x] OT integration
- [x] Chat panel
- [x] Code execution (JS + Python)
- [x] Version history + diffs
- [ ] Migrate OT --> Yjs/CRDT for scale
- [ ] Docker sandbox for code execution
- [ ] User authentication
- [ ] Redis pub-sub for horizontal scaling
- [ ] Persistent room storage

---

## License

MIT (c) 2026 Janmejai Mudgal
