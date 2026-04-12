let editorRef: any;

export const setEditor = (editor: any) => {
  editorRef = editor;
};

export const socket = new WebSocket("ws://localhost:5000");

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (editorRef && data.type === "code-change") {
    editorRef.setValue(data.code);
  }
};
