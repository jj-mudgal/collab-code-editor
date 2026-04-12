import { WebSocketServer } from "ws";

const clients = new Set<any>();

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.on("message", (message) => {
      const data = message.toString();

      clients.forEach((client) => {
        if (client !== ws) {
          client.send(data);
        }
      });
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
};
