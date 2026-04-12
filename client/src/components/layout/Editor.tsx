import Editor from "@monaco-editor/react";
import { socket } from "../../socket";

const CodeEditor = () => {
  const handleChange = (value: string | undefined) => {
    socket.send(
      JSON.stringify({
        type: "code-change",
        code: value,
      })
    );
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// start coding"
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
