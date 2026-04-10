export default function Editor() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "250px", background: "#1e1e1e", color: "white", padding: "10px" }}>
        Sidebar
      </div>
      <div style={{ flex: 1, background: "#252526" }}>
        Editor Area
      </div>
    </div>
  );
}
