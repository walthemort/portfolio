# Portfolio

A focused Next.js portfolio for job applications. Only three sections:

- `/` — up to five selected projects, with a “View all projects” link.
- `/projects` — the complete project archive, part of the Projects section.
- `/experiments` — a playable lab: a pointer-responsive magnetic field, a typography composer, and a generative grid study.
- `/cv` — experience, education, skills, and an optional PDF download.

## Project selection

Add projects to the `projects` array in `src/content/portfolio.js`. Up to five selected projects appear on the homepage; `/projects` displays every entry in array order. Set `featured: false` to keep a project in the archive only; use `featuredOrder: 1`, `2`, and so on to control homepage order. Entries without a rank follow in array order. With fewer than five, only the available projects are shown. The archive link is always available. No demo projects are added to fill empty slots.

The vector adaptation of the supplied metallic ribbon-and-orbit logo is in `public/logo-mark.svg` and `public/logo.svg`. The header, footer, and CV use these assets; the monochrome logo adapts to Paper and Ink appearances. Replace these assets with original vector exports if you need exact source geometry.

## Project case studies

Each project with a unique `slug` gets a page at `/projects/[slug]`. Add `cover` and `screenshots` entries using local image paths, meaningful alt text, width, height, and captions. The portfolio’s current screenshots are real browser captures, not mockups. Screenshots are versioned captures; recapture them after significant visual changes.

Optional `focus`, `decisions` (`title` and `text`), and `demo` fields enrich the page. The existing `brief`, `approach`, and `result` fields provide its core narrative. Source and demo links appear only when supplied. Don’t invent outcomes or client work. Unknown project slugs return 404.

## Appearance

The Paper/Ink control switches the whole site between light and dark appearances and saves the choice locally. The CV uses a document cover on screen and a simpler layout when printed. Personal details remain editable in the shared content file.

## Motion

Page entrances, animated navigation and hover states, and pointer-responsive artwork are built with CSS and small React components; no animation library is needed. The artwork has theme and pause controls. The grid experiment offers optional play/pause variations and stops its timer when you navigate away. System reduced-motion preferences disable decorative animation and automatic playback.

## Add your real content

Edit `src/content/portfolio.js` for your name, role, contact details, projects, experience, education, and skills. The current project is this portfolio itself; no client work, qualifications, or employment history is invented. The CV is clearly marked as a draft until you add your details.

For a downloadable CV, add your real PDF at `public/cv.pdf` and set `profile.cvUrl` to `/cv.pdf`. The download link appears only when configured. A custom `cvUrl` should point to an existing file. Do not send the portfolio with placeholder personal details.

Page layouts live in `src/app/`; styling is in `src/app/globals.css`. The lab lives in `src/components/experiment-lab.jsx`; the original grid study is in `src/components/grid-study.jsx`.

## Development

Use Node.js 22.12 or newer (validated with Node.js 24.19.0).

```sh
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

## Production

```sh
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

Build output is in `.next/`. No credentials or external services are required.

In the Codex cloud environment, use `npm --cache /workspace/.npm-cache ci` if the default npm cache is not writable. Each cloud task has an isolated checkout; no extra Git worktree is needed.
