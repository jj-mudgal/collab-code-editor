import { WebSocketServer } from "ws";
import { joinRoom, leaveRoom } from "../rooms/roomManager";
import { subscribe } from "../pubsub/pubsub";
import { handleMessage } from "./handler";

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

        // send latest state on join
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
