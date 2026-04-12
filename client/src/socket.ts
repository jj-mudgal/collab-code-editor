export const socket = new WebSocket("ws://localhost:5000");

export const sendCodeChange = (code: string) => {
  socket.send(
    JSON.stringify({
      type: "code-change",
      code,
    })
  );
};
