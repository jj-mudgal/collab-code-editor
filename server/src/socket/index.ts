import { WebSocketServer } from "ws";
import { createVersion } from "../versioning/versionStore";
import { executeCode } from "../execution/execute";

const clients = new Set<any>();

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.on("message", async (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "code-change") {
        createVersion(data.code);

        clients.forEach((client) => {
          if (client !== ws) {
            client.send(JSON.stringify(data));
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

      if (data.type === "cursor-move") {
        clients.forEach((client) => {
          if (client !== ws) {
            client.send(JSON.stringify(data));
          }
        });
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
};
