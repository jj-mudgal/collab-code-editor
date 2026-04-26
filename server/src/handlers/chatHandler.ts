import { publish } from "../pubsub/pubsub";

export const handleChat = (data: any, _ws: any, room: string) => {
  publish(room, data);
};
