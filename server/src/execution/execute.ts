import { exec } from "child_process";

const buildCommand = (code: string, language: string) => {
  const safeCode = code.replace(/"/g, '\\"');
  switch (language) {
    case "javascript":
      return `node -e "${safeCode}"`;
    case "python":
      return `python3 -c "${safeCode}"`;
    default:
      throw new Error("Unsupported language");
  }
};

export const executeCode = (code: string, language: string): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const command = buildCommand(code, language);
      exec(command, { timeout: 2000, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
        if (err) {
          if ((err as any).killed) return resolve("Execution timed out");
          return resolve(stderr || "Execution error");
        }
        resolve(stdout || "No output");
      });
    } catch (e: any) {
      resolve(e.message);
    }
  });
};
