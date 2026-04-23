export const setupHeartbeat = (ws: any) => {
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });
};
