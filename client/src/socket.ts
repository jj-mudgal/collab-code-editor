export const socket = new WebSocket("ws://localhost:5000");

import { initSocketListener } from "./socketEvents";

socket.onopen = () => {
  initSocketListener(socket);
};
