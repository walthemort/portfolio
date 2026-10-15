# Jonathan Walther — Portfolio

A Next.js portfolio with Projects, Experiments, and CV. The identity is live typography, without an illustrated logo.

- `/`: up to five selected projects.
- `/projects`: searchable archive with discipline/technology filters, sorting, and grid/list views. Filters are shareable through the URL.
- `/projects/[slug]`: case studies with screenshot lightboxes, contribution/evidence, timelines, decisions, architecture, comparisons, captioned video, lessons, contents navigation, and section links.
- `/experiments`: seven studies. Each has its own `/experiments/[slug]` URL, presets, bounded undo/redo, composition links, and SVG/PNG exports.
- `/experiments/studio`: 100 interactive interpretations in ten collections, with a searchable catalog, per-study saved compositions, favorites, history, sharing, and SVG/PNG exports. Collaboration studies are explicitly local to one device. See the [studio implementation notes](docs/studio.md).
- `/cv`: experience, education, skills, contact links, and an optional supplied CV PDF.

The only real project supplied so far is this portfolio. Career details, a CV PDF, other projects, email/LinkedIn, target role, live-demo URLs, and the production domain/hosting are still awaiting input. No employment, qualifications, project metrics, or client work have been invented. See the [50-item implementation status](docs/roadmap.md).

## Development

Use Node.js 24 (Node.js 22.12+ is supported by the manifest).

```sh
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

In the cloud environment use `npm --cache /workspace/.npm-cache ci` when the default cache is not writable. Each cloud task is isolated; use its existing checkout without creating an extra Git worktree unless requested.

## Production and previews

```sh
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

The build produces Next.js standalone output. The start helper copies the required public/static assets into generated output and forwards process signals.

```sh
npm run preview:package
```

This creates `dist/portfolio-preview.tgz`. Extract it and run `HOSTNAME=0.0.0.0 PORT=3000 node server.js` with Node.js 24. The archive excludes `.env` files. Its independent startup, routes, image response, and media were verified locally.

The GitHub workflow runs the checks on pushes and pull requests, then uploads a runnable preview build. This prepares previews without publishing a website or selecting a hosting account. A hosted preview URL still requires a provider and its authorized configuration. See [deployment details](docs/deployment.md).

## Verification

```sh
npm run check
npm run test:e2e
node scripts/check-links.mjs --external
```

`check` runs unit tests, local destination checks, the production build, and compressed client-code/image budgets. Browser tests cover the hiring journey, archive state, dialogs/focus, all studies, downloads, motion preferences, mobile layouts, and axe accessibility/contrast checks in both appearances. System Chromium is used when present; otherwise install the Playwright browser with `npx playwright install chromium`.

External link requests are opt-in because remote availability can fluctuate. No API keys are required for the site.

## Content and appearance

Edit `src/content/portfolio.js`. See the [content guide](docs/content-guide.md) for required and optional fields. Set `featured: false` to keep a project only in the archive; `featuredOrder` controls homepage priority. The maximum remains five.

Paper/Ink appearance and the manual Reduced/System motion setting persist locally. System reduced-motion preferences are honored. Experiment artwork exports run in the browser and require no upload service. Very large drawings can exceed the share-link length limit; image exports remain available. Undo history retains 40 states.

Screenshots and the ten-second captioned demo are actual browser captures. The comparison intentionally shows two real versions of the lab. These are versioned captures, rather than automatically regenerated previews.
