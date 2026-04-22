import { publish } from "../pubsub/pubsub";

export const handleMessage = (room: string, data: any) => {
  if (data.type === "code-change") {
    publish(room, data);
  }
};
