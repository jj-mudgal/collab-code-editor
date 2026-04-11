import { WebSocketServer } from "ws";

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
