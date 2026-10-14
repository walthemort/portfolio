# Portfolio

A focused Next.js portfolio for job applications. Only three sections:

- `/` — projects with source links and expandable project notes.
- `/experiments` — a working generative grid study with density, palette, and variation controls.
- `/cv` — experience, education, skills, and an optional PDF download.

## Motion

Page entrances, animated navigation and hover states, and pointer-responsive artwork are built with CSS and small React components; no animation library is needed. The artwork has theme and pause controls. The grid experiment offers optional play/pause variations and stops its timer when you navigate away. System reduced-motion preferences disable decorative animation and automatic playback.

## Add your real content

Edit `src/content/portfolio.js` for your name, role, contact details, projects, experience, education, and skills. The current project is this portfolio itself; no client work, qualifications, or employment history is invented. The CV is clearly marked as a draft until you add your details.

For a downloadable CV, add your real PDF at `public/cv.pdf` and set `profile.cvUrl` to `/cv.pdf`. The download link appears only when configured. A custom `cvUrl` should point to an existing file. Do not send the portfolio with placeholder personal details.

Page layouts live in `src/app/`; styling is in `src/app/globals.css`. The interactive study lives in `src/components/grid-study.jsx`.

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
