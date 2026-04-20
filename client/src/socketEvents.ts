type Handler = (data: any) => void;

const handlers: Handler[] = [];

export const addSocketHandler = (handler: Handler) => {
  handlers.push(handler);
};

export const initSocketListener = (socket: WebSocket) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handlers.forEach((h) => h(data));
  };
};
