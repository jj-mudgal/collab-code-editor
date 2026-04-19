import { useEffect } from "react";
import Editor from "./components/layout/Editor";
import Chat from "./components/chat/Chat";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    const username = "user-" + Math.floor(Math.random() * 1000);

    socket.send(
      JSON.stringify({
        type: "join",
        room: "room1",
        username,
      })
    );
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Editor />
      <Chat />
    </div>
  );
}

export default App;
