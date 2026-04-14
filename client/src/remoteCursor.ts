let decorations: string[] = [];

export const renderRemoteCursor = (
  editor: any,
  line: number,
  column: number
) => {
  decorations = editor.deltaDecorations(decorations, [
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
  ]);
};
