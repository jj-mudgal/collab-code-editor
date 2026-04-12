import Editor from "@monaco-editor/react";
import { socket, setEditor } from "../../socket";

let isRemoteUpdate = false;

const CodeEditor = () => {
  const handleMount = (editor: any) => {
    setEditor(editor);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "code-change") {
        isRemoteUpdate = true;
        editor.setValue(data.code);
      }
    };
  };

  const handleChange = (value: string | undefined) => {
    if (isRemoteUpdate) {
      isRemoteUpdate = false;
      return;
    }

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
