import { getVersions } from "./versionStore";

export const reconstructVersion = (id: string): string | null => {
  const versions = getVersions();
  const map = new Map(versions.map(v => [v.id, v]));

  let current = map.get(id);
  if (!current) return null;

  let content = current.content || "";

  while (!current.isCheckpoint && current.baseVersionId) {
    current = map.get(current.baseVersionId)!;
    content = (current.content || "") + content;
  }

  return content;
};
