import { publish } from "../pubsub/pubsub";

let latestState: Record<string, string> = {};

export const handleMessage = (room: string, data: any, ws: any) => {
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
