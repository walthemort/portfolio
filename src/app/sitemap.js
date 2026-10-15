import { getSiteUrl } from "../lib/site";
import { projects } from "../content/portfolio";
import { EXPERIMENTS } from "../lib/experiments";
export default function sitemap() {
  const base = getSiteUrl();
  if (!base) return [];
  return [
    "/",
    "/projects",
    "/experiments",
    "/experiments/studio",
    "/cv",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...EXPERIMENTS.map((e) => `/experiments/${e.id}`),
  ].map((path) => ({ url: new URL(path, base).toString() }));
}
