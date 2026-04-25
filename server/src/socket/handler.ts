import { publish } from "../pubsub/pubsub";
import { log } from "../logger/logger";

let latestState: Record<string, string> = {};
const seenOps = new Set<string>();

export const handleMessage = (room: string, data: any, ws: any) => {
  const start = Date.now();

  if (data.id && seenOps.has(data.id)) return;
  if (data.id) seenOps.add(data.id);

  if (data.type === "code-change") {
    latestState[room] = data.code;
    publish(room, data);

    log("info", "Code change applied", {
      room,
      length: data.code.length,
    });
  }

  if (data.type === "request-sync") {
    ws.send(
      JSON.stringify({
        type: "sync",
        code: latestState[room] || "",
      })
    );
  }

  const latency = Date.now() - start;
  log("info", "Operation latency", { latency });
};
