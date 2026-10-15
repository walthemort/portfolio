import { readdir, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
async function files(path) {
  const result = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const file = `${path}/${entry.name}`;
    if (entry.isDirectory()) result.push(...(await files(file)));
    else result.push(file);
  }
  return result;
}
let failed = false,
  totalJs = 0,
  totalCss = 0,
  totalImages = 0;
for (const file of await files(".next/static")) {
  if (!/\.(js|css)$/.test(file)) continue;
  const bytes = gzipSync(await readFile(file)).length;
  if (file.endsWith(".js")) {
    totalJs += bytes;
    if (bytes > 200 * 1024) {
      console.error(`JS chunk exceeds 200 KiB gzip: ${file}`);
      failed = true;
    }
  } else totalCss += bytes;
}
for (const file of await files("public")) {
  if (!/\.(png|jpe?g|webp|svg)$/.test(file)) continue;
  const bytes = (await readFile(file)).length;
  totalImages += bytes;
  if (bytes > 1.5 * 1024 * 1024) {
    console.error(`Image exceeds 1.5 MiB: ${file}`);
    failed = true;
  }
}
if (
  totalJs > 550 * 1024 ||
  totalCss > 80 * 1024 ||
  totalImages > 8 * 1024 * 1024
) {
  console.error(
    "Aggregate budget exceeded (JS 550 KiB gzip, CSS 80 KiB gzip, images 8 MiB).",
  );
  failed = true;
}
console.log(
  `Budgets: all client JS ${(totalJs / 1024).toFixed(1)} KiB gzip; CSS ${(totalCss / 1024).toFixed(1)} KiB gzip; public images ${(totalImages / 1024 / 1024).toFixed(2)} MiB.`,
);
if (failed) process.exitCode = 1;
