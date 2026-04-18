import { exec } from "child_process";

export const executeCode = (code: string, language: string): Promise<string> => {
  return new Promise((resolve) => {
    let command = "";

    if (language === "javascript") {
      command = `node -e "${code.replace(/"/g, '\\"')}"`;
    } else if (language === "python") {
      command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
    } else {
      return resolve("Unsupported language");
    }

    exec(command, { timeout: 3000 }, (err, stdout, stderr) => {
      if (err) {
        return resolve(stderr || "Execution error");
      }
      resolve(stdout);
    });
  });
};
