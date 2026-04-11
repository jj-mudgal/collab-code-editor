export const socket = new WebSocket("ws://localhost:5000");

socket.onopen = () => {
  console.log("Connected to server");
};

socket.onmessage = (event) => {
  console.log("Message:", event.data);
};
