import { publish } from "../pubsub/pubsub";

let latestState: Record<string, string> = {};
const seenOps = new Set<string>();

export const handleMessage = (room: string, data: any, ws: any) => {
  if (data.id && seenOps.has(data.id)) return;
  if (data.id) seenOps.add(data.id);

  if (data.type === "code-change") {
    latestState[room] = data.code;
    publish(room, data);
  }

  if (data.type === "request-sync") {
    ws.send(
      JSON.stringify({
        type: "sync",
        code: latestState[room] || "",
      })
    );
  }
};
