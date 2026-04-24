import { WebSocketServer } from "ws";
import { joinRoom, leaveRoom } from "../rooms/roomManager";
import { subscribe } from "../pubsub/pubsub";
import { handleMessage } from "./handler";
import { setupHeartbeat } from "./heartbeat";
import { validateMessage } from "./validate";

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
      let data;

      try {
        data = JSON.parse(message.toString());
      } catch {
        return;
      }

      if (!validateMessage(data)) return;

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
