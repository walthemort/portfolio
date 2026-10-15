# Content guide

## Profile inputs still needed

Edit `profile` in `src/content/portfolio.js`: `role`, `location`, `email`, `linkedin`, `experience`, `education`, `skills`, and `cvUrl`. Jonathan Walther is the supplied name. The GitHub link comes from the verified repository owner. Other identity/career facts remain empty until provided.

- Experience: `{ role, company, period, description }`.
- Education: `{ qualification, institution, period }`.
- Skills: strings describing actual skills.
- PDF: place the real document at `public/cv.pdf`, then set `cvUrl: '/cv.pdf'`. The download link remains hidden until configured.

The CV is visibly a draft while its content is missing. Update it before sending applications.

## Project content

Every project needs a unique URL-safe `slug`, `title`, `category`, `year`, `description`, `stack`, `brief`, `approach`, and `result`.

Optional fields:

- `featured: false` excludes a project from home; the archive remains complete.
- `featuredOrder` ranks homepage projects; unranked projects follow array order. At most five appear.
- `status`: an accurate label such as In progress, Live, or Archived.
- `source` and `demo`: working HTTPS destinations. Links appear only when supplied.
- `focus` and `contribution`: the work involved and the personal contribution. Separate individual work from collaborators and AI-assisted work.
- `collaborators`: `{ name, contribution }` entries.
- `outcomes`: `{ text, href, label }` evidence. Use real observations or measured results; do not invent metrics.
- `cover` and `screenshots`: `{ src, alt, width, height, caption }` using local public files.
- `decisions`: `{ title, text }` entries.
- `tradeoffs`, `lessons`, `nextSteps`: arrays of real observations.
- `timeline` and `updates`: `{ date, title, text }` entries with accurate dates.
- `architecture`: `{ title, text }` nodes for the readable architecture flow.
- `comparison`: `before` and `after` images, each with `src`, `alt`, `width`, and `height`. Use actual versions.
- `video`: `{ src, title, captions, poster }`. The supplied player uses WebM and a WebVTT caption track.

Related-project links and previous/next navigation appear once additional real projects exist. They deliberately do not point to fabricated examples.

## Creative studies

The catalog and validated state schemas live in `src/lib/experiments.js`; scenes are in `src/components/experiment-scene.jsx`, with controls/history/sharing/exports in `experiment-workbench.jsx`. Presets are centralized with the catalog. Removing a study from the catalog removes its generated route and selector.

Compositions are encoded in the URL. Malformed values are validated and bounded. Large drawings above the share-link limit show a notice and can still be exported. SVG/PNG files contain the current composition; user artwork is not sent to an external service.
