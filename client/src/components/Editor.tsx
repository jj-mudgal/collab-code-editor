import MonacoEditor from "@monaco-editor/react";

export default function Editor() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{
        width: "250px",
        background: "#1e1e1e",
        color: "#ccc",
        padding: "10px",
        borderRight: "1px solid #333"
      }}>
        Sidebar
      </div>

      <div style={{ flex: 1 }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// start coding..."
          theme="vs-dark"
        />
      </div>
    </div>
  );
}
