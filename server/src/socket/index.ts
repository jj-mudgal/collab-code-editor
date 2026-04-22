import { WebSocketServer } from "ws";
import { joinRoom, leaveRoom, getRoomClients } from "../rooms/roomManager";
import { publish, subscribe } from "../pubsub/pubsub";

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    let currentRoom = "";

    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        currentRoom = data.room;
        joinRoom(currentRoom, ws);

        subscribe(currentRoom, (msg) => {
          ws.send(JSON.stringify(msg));
        });
      }

      if (data.type === "code-change") {
        publish(currentRoom, data);
      }
    });

    ws.on("close", () => {
      if (currentRoom) leaveRoom(currentRoom, ws);
    });
  });
};
