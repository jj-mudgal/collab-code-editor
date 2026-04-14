export const renderRemoteCursor = (
  editor: any,
  line: number,
  column: number
) => {
  editor.deltaDecorations(
    [],
    [
      {
        range: {
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          endColumn: column + 1,
        },
        options: {
          className: "remote-cursor",
        },
      },
    ]
  );
};
