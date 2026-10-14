# Portfolio

A personal portfolio starter built with Next.js App Router and React. Edit the placeholder name, biography, projects, and contact details in `src/app/page.jsx`. Styles are in `src/app/globals.css`; page metadata is in `src/app/layout.jsx`.

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

Build output is in `.next/`. No credentials or external services are required. There is no automated test suite yet.

In the Codex cloud environment, use `npm --cache /workspace/.npm-cache ci` if the default npm cache is not writable. Each cloud task has an isolated checkout; no extra Git worktree is needed.
