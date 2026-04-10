import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

export default function Editor() {
  const [language, setLanguage] = useState("javascript");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{
        width: "250px",
        background: "#1e1e1e",
        color: "#ccc",
        padding: "10px"
      }}>
        <h3>Languages</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div style={{ flex: 1 }}>
        <MonacoEditor
          height="100%"
          language={language}
          defaultValue="// start coding..."
          theme="vs-dark"
        />
      </div>
    </div>
  );
}
