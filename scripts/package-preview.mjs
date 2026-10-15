import { cp, mkdir, rm, mkdtemp } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
const staging = await mkdtemp(join(tmpdir(), "portfolio-preview-build-"));
try {
  await cp(".next/standalone", staging, { recursive: true });
  await mkdir(join(staging, ".next"), { recursive: true });
  await rm(join(staging, "public"), { recursive: true, force: true });
  await rm(join(staging, ".next/static"), { recursive: true, force: true });
  await cp("public", join(staging, "public"), { recursive: true });
  await cp(".next/static", join(staging, ".next/static"), { recursive: true });
  await mkdir("dist", { recursive: true });
  const destination = resolve("dist/portfolio-preview.tgz");
  const result = spawnSync(
    "tar",
    [
      "-czf",
      destination,
      "--exclude=.env",
      "--exclude=.env.*",
      "-C",
      staging,
      ".",
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0)
    throw Error(`Preview archive failed: ${result.status}`);
  console.log(
    "Created dist/portfolio-preview.tgz. Extract it and run HOSTNAME=0.0.0.0 PORT=3000 node server.js with Node.js 24.",
  );
} finally {
  await rm(staging, { recursive: true, force: true });
}
