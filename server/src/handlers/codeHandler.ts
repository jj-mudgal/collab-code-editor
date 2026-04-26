import { publish } from "../pubsub/pubsub";

let latestState: Record<string, string> = {};

export const handleCodeChange = (data: any, _ws: any, room: string) => {
  latestState[room] = data.code;
  publish(room, data);
};

export const handleSyncRequest = (_: any, ws: any, room: string) => {
  ws.send(
    JSON.stringify({
      type: "sync",
      code: latestState[room] || "",
    })
  );
};
