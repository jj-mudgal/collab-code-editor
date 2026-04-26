import { publish } from "../pubsub/pubsub";

export const handleCursor = (data: any, _ws: any, room: string) => {
  publish(room, data);
};
