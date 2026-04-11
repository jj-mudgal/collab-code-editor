import { WebSocketServer } from "ws";

const rooms: Record<string, Set<any>> = {};

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    let currentRoom = "";

    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        currentRoom = data.room;

        if (!rooms[currentRoom]) {
          rooms[currentRoom] = new Set();
        }

        rooms[currentRoom].add(ws);
      }

      if (data.type === "code-change") {
        rooms[currentRoom]?.forEach((client) => {
          if (client !== ws) {
            client.send(JSON.stringify(data));
          }
        });
      }
    });

    ws.on("close", () => {
      if (currentRoom && rooms[currentRoom]) {
        rooms[currentRoom].delete(ws);

        if (rooms[currentRoom].size === 0) {
          delete rooms[currentRoom];
        }
      }

      console.log("Client disconnected");
    });
  });
};
