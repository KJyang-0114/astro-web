# KJyang Website

Astro static website for `kjyang0114.dev`.

This repo contains the personal site, the KJyang Studio section, Web Highlighter Pro pages, static assets, Docker deployment scripts, and GitHub Actions deployment workflow.

## Structure

```text
src/pages/                 Astro routes
src/pages/studio/          KJyang Studio sub-site
src/pages/web-highlighter-pro/
                            Web Highlighter Pro Astro pages
src/components/            Shared Astro components
src/data/                  Studio content, SEO, guides, demos, work cases
src/styles/                Global and Studio styles
public/brand/              Brand images
public/demo-assets/        Studio demo images
public/web-highlighter-pro/
                            Static Web Highlighter Pro SEO pages and assets
```

## Commands

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Docker Deployment

Production currently runs on the Mac mini through Docker:

```bash
./rebuild-docker.sh
```

The script rebuilds the Docker image and restarts `kjyang-wbs-astro-container` on port `3000`.

## GitHub Actions Deployment

`.github/workflows/deploy-macmini.yml` builds the site on every push to `main`, syncs the source to the Mac mini, then runs `./rebuild-docker.sh` remotely.

Required GitHub repository secrets:

```text
MACMINI_HOST
MACMINI_USER
MACMINI_PORT
MACMINI_DEPLOY_PATH
MACMINI_SSH_KEY
```

`MACMINI_DEPLOY_PATH` should point to the project directory on the Mac mini.

## Git Hygiene

Tracked source should include `src/`, selected `public/` assets, Docker files, package files, Astro config, TypeScript config, and deployment workflow.

Ignored files include build output, local dependencies, Astro cache, logs, backups, zip exports, old sync artifacts, and macOS metadata.
