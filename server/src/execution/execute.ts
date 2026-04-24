const { exec } = require("child_process");

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

const executeCode = (code: string, language: string): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const command = buildCommand(code, language);

      const child = exec(command, {
        timeout: 1500,
        maxBuffer: 1024 * 512,
      });

      let output = "";
      let error = "";

      child.stdout?.on("data", (d: any) => (output += d));
      child.stderr?.on("data", (d: any) => (error += d));

      child.on("close", () => {
        if (error) return resolve(error);
        resolve(output || "No output");
      });

      child.on("error", () => resolve("Execution failed"));
    } catch (e: any) {
      resolve("Sandbox error: " + e.message);
    }
  });
};

module.exports = { executeCode };