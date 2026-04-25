const limits = new Map<any, { count: number; time: number }>();

const WINDOW = 1000;
const MAX = 20;

export const isRateLimited = (ws: any) => {
  const now = Date.now();

  if (!limits.has(ws)) {
    limits.set(ws, { count: 1, time: now });
    return false;
  }

  const entry = limits.get(ws)!;

  if (now - entry.time > WINDOW) {
    limits.set(ws, { count: 1, time: now });
    return false;
  }

  entry.count++;
  return entry.count > MAX;
};
