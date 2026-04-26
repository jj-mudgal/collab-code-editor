type Handler = (data: any, ws: any, room: string) => void;

const handlers = new Map<string, Handler[]>();

export const onEvent = (type: string, handler: Handler) => {
  if (!handlers.has(type)) {
    handlers.set(type, []);
  }
  handlers.get(type)!.push(handler);
};

export const emitEvent = (type: string, data: any, ws: any, room: string) => {
  const list = handlers.get(type) || [];
  list.forEach((h) => h(data, ws, room));
};
