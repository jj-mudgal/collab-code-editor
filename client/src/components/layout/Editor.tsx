import Editor from "@monaco-editor/react";
import { socket, setEditor } from "../../socket";

const CodeEditor = () => {
  const handleMount = (editor: any) => {
    setEditor(editor);
  };

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
      onMount={handleMount}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
