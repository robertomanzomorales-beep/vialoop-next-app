import { spawn } from "node:child_process";
import { createRequire } from "node:module";

// Accept preview runners that use Vite's host/strictPort flags.
// With no extra arguments, this behaves exactly like `next dev`.
const require = createRequire(import.meta.url);
const inputs = process.argv.slice(2);
const mode = inputs[0] === "start" ? inputs.shift() : "dev";
const args = inputs.flatMap((arg) => {
  if (arg === "--strictPort") return [];
  if (arg === "--host") return ["--hostname"];
  if (arg.startsWith("--host=")) return [arg.replace("--host=", "--hostname=")];
  return [arg];
});
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), mode, ...args], { stdio: "inherit" });
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.on("exit", (code) => { process.exitCode = code ?? 1; });
