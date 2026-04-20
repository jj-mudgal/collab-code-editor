import { WebSocketServer } from "ws";
import { handleChat } from "./handlers/chat";

const clients = new Map<any, { room: string; username: string }>();

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.set(ws, { room: "default", username: "anon" });

    ws.on("message", (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "join") {
        clients.set(ws, { room: data.room, username: data.username });
      }

      if (data.type === "chat") {
        handleChat(ws, clients, data);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
};
