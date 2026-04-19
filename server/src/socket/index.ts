import { WebSocketServer } from "ws";
import { createVersion } from "../versioning/versionStore";
import { executeCode } from "../execution/execute";

const clients = new Map<any, { room: string; username: string }>();

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.set(ws, { room: "default", username: "anon" });

    ws.on("message", async (message) => {
      const data = JSON.parse(message.toString());
      const client = clients.get(ws);

      if (data.type === "join") {
        clients.set(ws, { room: data.room, username: data.username });
      }

      if (data.type === "chat") {
        clients.forEach((c, clientWs) => {
          if (c.room === client.room && clientWs !== ws) {
            clientWs.send(
              JSON.stringify({
                type: "chat",
                message: data.message,
                username: client.username,
                timestamp: Date.now(),
              })
            );
          }
        });
      }

      if (data.type === "code-change") {
        createVersion(data.code);

        clients.forEach((c, clientWs) => {
          if (c.room === client.room && clientWs !== ws) {
            clientWs.send(JSON.stringify(data));
          }
        });
      }

      if (data.type === "execute") {
        const output = await executeCode(data.code, data.language);

        ws.send(
          JSON.stringify({
            type: "execution-result",
            output,
          })
        );
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
};
