import { cp, mkdir, access } from "node:fs/promises";
import { spawn } from "node:child_process";
const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
}
const port = option("--port", process.env.PORT || "3000"),
  hostname = option("--hostname", "0.0.0.0");
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)
  throw Error("Provide a valid --port.");
await access(".next/standalone/server.js");
await mkdir(".next/standalone/.next", { recursive: true });
await cp("public", ".next/standalone/public", { recursive: true });
await cp(".next/static", ".next/standalone/.next/static", { recursive: true });
const child = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: { ...process.env, PORT: port, HOSTNAME: hostname },
});
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code, signal) =>
  process.exit(
    signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : (code ?? 1),
  ),
);
