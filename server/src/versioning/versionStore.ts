import { Version } from "./types";
import { randomUUID } from "crypto";

const versions: Version[] = [];

export const createVersion = (content: string): Version => {
  const newVersion: Version = {
    id: randomUUID(),
    timestamp: Date.now(),
    content,
    baseVersionId: versions.length
      ? versions[versions.length - 1].id
      : undefined,
  };

  versions.push(newVersion);
  return newVersion;
};

export const getVersions = () => versions;

export const getVersionById = (id: string) =>
  versions.find((v) => v.id === id);
