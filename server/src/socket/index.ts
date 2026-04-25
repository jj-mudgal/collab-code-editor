import { WebSocketServer } from "ws";
import { joinRoom, leaveRoom } from "../rooms/roomManager";
import { subscribe } from "../pubsub/pubsub";
import { handleMessage } from "./handler";
import { setupHeartbeat } from "./heartbeat";
import { log } from "../logger/logger";

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  setInterval(() => {
    wss.clients.forEach((ws: any) => {
      if (!ws.isAlive) {
        log("warn", "Terminating dead connection");
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping();
    });
  }, 10000);

  wss.on("connection", (ws: any) => {
    setupHeartbeat(ws);
    log("info", "New client connected");

    let currentRoom = "";

    ws.on("message", (message) => {
      const start = Date.now();
      const data = JSON.parse(message.toString());

      log("info", "Incoming message", { type: data.type });

      if (data.type === "join") {
        currentRoom = data.room;
        joinRoom(currentRoom, ws);

        log("info", "User joined room", { room: currentRoom });

        subscribe(currentRoom, (msg) => {
          ws.send(JSON.stringify(msg));
        });

        handleMessage(currentRoom, { type: "request-sync" }, ws);
      } else {
        handleMessage(currentRoom, data, ws);
      }

      const latency = Date.now() - start;
      log("info", "Message processed", { latency });
    });

    ws.on("close", () => {
      log("info", "Client disconnected");
      if (currentRoom) leaveRoom(currentRoom, ws);
    });
  });
};
