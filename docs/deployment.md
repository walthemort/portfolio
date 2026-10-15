# Deployment and preview status

## Verified now

- Production build and the standalone start helper.
- A packaged preview extracted outside the checkout and started independently.
- Homepage, an experiment, case-study route, social PNG, and demo video from that extracted preview.
- Unit/browser tests, accessibility/contrast audits, local destinations, existing external destinations, and byte budgets.

GitHub Actions is configured to run checks and upload `portfolio-preview.tgz`. The workflow itself runs on GitHub after pushing; local verification is not a claim that a remote CI run or hosted deployment has completed.

## Production domain still needed

Set the non-secret `SITE_URL` deployment variable to the real production origin **before building**. Copy `.env.example` to a local `.env` when developing with a chosen domain. Canonical URLs, Open Graph/Twitter links, structured project URLs, and the sitemap use that explicit origin.

Without it, canonical URLs are omitted, the sitemap is empty, and robots disallows crawling. No placeholder domain or loopback address is published as a canonical URL.

Preview builds should set `CONTEXT=deploy-preview` or `VERCEL_ENV=preview` at build time. They receive noindex metadata and robots restrictions, even when a production origin is configured. The pull-request workflow sets the preview context automatically.

## Hosted previews still need a provider

Choose a provider/account and connect the repository through its supported authorization flow. No Vercel/Netlify deployment token is currently configured in this cloud instance, and no production domain was supplied. No account, deployment, or domain has been invented or published.

The preview archive is ready for a Node.js 24 host compatible with the build’s OS and architecture. GitHub CI produces a Linux x64 artifact; native image dependencies are platform-specific. After extraction:

```sh
HOSTNAME=0.0.0.0 PORT=3000 node server.js
```

## Optional container recipe

The Dockerfile builds standalone output and runs it as the unprivileged Node user. A production origin can be passed with `--build-arg SITE_URL=https://your-actual-domain`.

Container verification is currently limited: this environment's Docker network could not resolve/reach the package-registry route, including when using its provisioned proxy bindings. The optional image build was cancelled rather than left hanging. The Node preview archive was verified independently; the container recipe is not claimed as successfully built here.
