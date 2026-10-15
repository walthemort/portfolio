import { access } from "node:fs/promises";
import { projects, profile } from "../src/content/portfolio.js";
import { EXPERIMENTS } from "../src/lib/experiments.js";
const routes = new Set([
  "/",
  "/projects",
  "/cv",
  "/experiments",
  ...projects.map((p) => `/projects/${p.slug}`),
  ...EXPERIMENTS.map((e) => `/experiments/${e.id}`),
]);
const links = new Set();
for (const p of projects) {
  for (const image of [
    p.cover,
    ...(p.screenshots || []),
    p.comparison?.before,
    p.comparison?.after,
  ].filter(Boolean))
    links.add(image.src);
  for (const url of [
    p.source,
    p.demo,
    p.video?.src,
    p.video?.captions,
    p.video?.poster,
    ...(p.outcomes || []).map((o) => o.href),
  ].filter(Boolean))
    links.add(url);
}
for (const url of [profile.cvUrl, profile.github, profile.linkedin].filter(
  Boolean,
))
  links.add(url);
let failures = 0,
  local = 0,
  external = 0;
for (const link of links) {
  if (link.startsWith("/")) {
    const path = link.split(/[?#]/)[0];
    if (routes.has(path)) {
      local++;
      continue;
    }
    try {
      await access(new URL(`../public${path}`, import.meta.url));
      local++;
    } catch {
      console.error(`Missing local destination: ${path}`);
      failures++;
    }
  } else {
    let url;
    try {
      url = new URL(link);
      if (url.protocol !== "https:") throw Error();
    } catch {
      console.error(`Unsupported link: ${link}`);
      failures++;
      continue;
    }
    if (process.argv.includes("--external")) {
      try {
        let response = await fetch(url, {
          method: "HEAD",
          signal: AbortSignal.timeout(15000),
        });
        if (response.status === 405)
          response = await fetch(url, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw Error(`HTTP ${response.status}`);
        external++;
        console.log(`Reachable: ${url.hostname}${url.pathname}`);
      } catch (error) {
        console.error(
          `External destination failed: ${url.hostname}${url.pathname}: ${error.message}`,
        );
        failures++;
      }
    }
  }
}
console.log(
  `${local} local destinations checked; ${external} external destinations checked${process.argv.includes("--external") ? "" : " (external requests are opt-in)"}.`,
);
if (failures) process.exitCode = 1;
