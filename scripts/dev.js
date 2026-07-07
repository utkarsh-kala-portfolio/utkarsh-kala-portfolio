import { spawn } from "child_process";

// Start Vercel dev server on port 6823
const vercelDev = spawn("npx", ["vercel", "dev", "--listen", "6823"], {
  stdio: "inherit",
  shell: true,
});

vercelDev.on("close", (code) => {
  process.exit(code || 0);
});
