type Callback = (data: any) => void;

const subscribers = new Map<string, Callback[]>();

export const publish = (channel: string, data: any) => {
  const subs = subscribers.get(channel) || [];
  subs.forEach((cb) => cb(data));
};

export const subscribe = (channel: string, cb: Callback) => {
  if (!subscribers.has(channel)) {
    subscribers.set(channel, []);
  }
  subscribers.get(channel)!.push(cb);
};
