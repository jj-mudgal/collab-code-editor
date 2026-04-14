# Real-time Collaborative Code Editor

## Features
- Real-time multi-user editing
- Live cursor sync
- WebSocket-based communication
- Code execution sandbox (Docker)

## Tech Stack
- React + Monaco Editor
- Node.js + Express
- WebSockets
- Docker

## Roadmap
[ ] Editor UI

[ ] WebSocket sync

[ ] Multi-user rooms

[ ] Cursor tracking

[ ] OT/CRDT integration

[ ] Code execution sandbox

## Notes
- Built as a learning project
- Goal: real-time collaboration like Google Docs for code

EOF

## WebSocket Flow

- Client connects via WebSocket
- Client joins a room
- Code changes are broadcast to other users in the same room
- Server manages rooms and connections

Simple flow:
Client → Server → Room → Other Clients

## Sync Strategy: OT vs CRDT

This project uses a simplified Operational Transformation (OT) model:

- Operations (insert/delete) are transformed against concurrent edits
- Ensures consistency across multiple users
- Lightweight compared to full CRDT implementations

### Why OT over CRDT?
- Easier to implement for linear text editing
- Lower memory overhead
- Suitable for real-time collaborative editors

Future scope:
- Migrate to CRDT (Yjs / Automerge) for scalability
