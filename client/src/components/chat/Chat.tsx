import { useState, useEffect } from "react";
import { socket } from "../../socket";

type Message = {
  username: string;
  message: string;
  timestamp: number;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat") {
        setMessages((prev) => [...prev, data]);
      }
    };
  }, []);

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        type: "chat",
        message: input,
      })
    );
    setInput("");
  };

  return (
    <div style={{ width: "250px", borderLeft: "1px solid #ccc" }}>
      <h3>Chat</h3>
      <div style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.username}:</strong> {m.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
