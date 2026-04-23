import { WebSocketServer } from "ws";
import { joinRoom, leaveRoom } from "../rooms/roomManager";
import { subscribe } from "../pubsub/pubsub";
import { handleMessage } from "./handler";
import { setupHeartbeat } from "./heartbeat";

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  setInterval(() => {
    wss.clients.forEach((ws: any) => {
      if (!ws.isAlive) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }, 10000);

  wss.on("connection", (ws: any) => {
    setupHeartbeat(ws);

    let currentRoom = "";

    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        currentRoom = data.room;
        joinRoom(currentRoom, ws);

        subscribe(currentRoom, (msg) => {
          ws.send(JSON.stringify(msg));
        });

        handleMessage(currentRoom, { type: "request-sync" }, ws);
      } else {
        handleMessage(currentRoom, data, ws);
      }
    });

    ws.on("close", () => {
      if (currentRoom) leaveRoom(currentRoom, ws);
    });
  });
};
