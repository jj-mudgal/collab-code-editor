import { exec } from "child_process";

const buildCommand = (code: string, language: string) => {
  const safeCode = code.replace(/"/g, '\\"');

  switch (language) {
    case "javascript":
      return `node -e "${safeCode}"`;
    case "python":
      return `python3 -c "${safeCode}"`;
    case "bash":
      return `bash -c "${safeCode}"`;
    default:
      throw new Error("Unsupported language");
  }
};

export const executeCode = (code: string, language: string): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const command = buildCommand(code, language);

      exec(command, { timeout: 3000 }, (err, stdout, stderr) => {
        if (err) return resolve(stderr || "Execution error");
        resolve(stdout);
      });
    } catch (e: any) {
      resolve(e.message);
    }
  });
};
