export const computeDiff = (oldStr: string, newStr: string) => {
  const diffs: any[] = [];

  let i = 0;
  while (i < oldStr.length || i < newStr.length) {
    if (oldStr[i] !== newStr[i]) {
      diffs.push({
        index: i,
        from: oldStr[i] || "",
        to: newStr[i] || "",
      });
    }
    i++;
  }

  return diffs;
};
