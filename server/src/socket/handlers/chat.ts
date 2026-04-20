export const handleChat = (ws: any, clients: Map<any, any>, data: any) => {
  const sender = clients.get(ws);

  clients.forEach((c, clientWs) => {
    if (c.room === sender.room && clientWs !== ws) {
      clientWs.send(
        JSON.stringify({
          type: "chat",
          message: data.message,
          username: sender.username,
          timestamp: Date.now(),
        })
      );
    }
  });
};
