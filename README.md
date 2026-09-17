# Cinematic Resume Experience

A production-ready cinematic portfolio/resume template built with Next.js, Tailwind CSS, and GSAP.

Designed for developers and designers who want a high-end personal site that is:

- easy to fork
- fast to customize
- free to deploy on GitHub Pages

## Live Demo

[https://amirho3inh.github.io/cinematic-resume-nextjs/](https://amirho3inh.github.io/cinematic-resume-nextjs/)

## Why This Project

Most portfolio templates are static cards with little personality.  
This one is narrative-driven: scene-based sections, motion choreography, and visual rhythm.

If you want your portfolio to feel like a directed experience (not just a list of blocks), this template is for you.

## Features

- Scene-based storytelling layout
- Cinematic `Scene Navigator` overlay
- GSAP-powered entry motion and scroll glide
- Responsive across mobile and desktop
- Section visibility toggles (`show/hide`) from one data file
- GitHub profile + pinned open-source data snapshot at build time
- Static export ready (`output: "export"`)
- Automatic deploy to GitHub Pages via GitHub Actions

## Sections Included

- Hero / Opening
- About / Identity
- Journey Timeline
- Skills
- Education
- Open Source (Pinned Repositories)
- Projects
- Achievements
- Blogs
- Podcast (custom styled audio player)
- GitHub Presence
- Experience Highlights
- Philosophy
- Contact

## Tech Stack

- Next.js (App Router)
- JavaScript
- Tailwind CSS
- GSAP + ScrollTrigger

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

Production build:

```bash
npm run build
npm run start
```

## Project Map

```txt
app/
  layout.js
  page.js
  globals.css
  robots.js
  sitemap.js
components/
  Navigation.js
  SectionGlideController.js
  sections/
data/
  resumeContent.js
  themeConfig.json
  githubSnapshot.json
scripts/
  fetch-github-snapshot.mjs
.github/workflows/
  deploy-pages.yml
```

## Customize Content Fast

Main file: [`data/resumeContent.js`](./data/resumeContent.js)

Edit these first:

- `sectionVisibility` to enable/disable sections
- `personal` for hero/about identity
- `journey`, `skills`, `education`, `projects`, `achievements`, `blogs`, `podcasts`
- `contact`
- `githubProfile.username`
- `siteMeta`

Theme and typography:

- [`data/themeConfig.json`](./data/themeConfig.json)

Images:

- replace files in `public/` (example: `profile-photo.jpg`, `og-profile.jpg`)

## GitHub Pages (Fully Automatic)

This repository is configured for static GitHub Pages deployment.

- static export config: [`next.config.mjs`](./next.config.mjs)
- GitHub snapshot script: [`scripts/fetch-github-snapshot.mjs`](./scripts/fetch-github-snapshot.mjs)
- deploy workflow: [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)

### One-time setup

1. Open `Settings -> Pages` in your repo.
2. Set `Source` to `GitHub Actions`.
3. Keep default branch as `main` (or update workflow trigger).

### CI/CD flow on every push to `main`

1. Install dependencies (`npm ci`)
2. Build GitHub snapshot (`npm run snapshot:github`)
3. Build static site (`npm run build`, output in `out/`)
4. Deploy to GitHub Pages

## Fork -> Edit -> Publish (For Everyone)

1. Fork this repo.
2. Clone your fork.
3. Edit [`data/resumeContent.js`](./data/resumeContent.js) with your own profile data.
4. Replace images in `public/`.
5. Commit and push to `main`.
6. Enable Pages with `GitHub Actions` in repo settings.
7. Wait for workflow `Deploy To GitHub Pages`.
8. Open: `https://<your-username>.github.io/<your-repo>/`

## How To Get More Visibility

To help people actually discover your project:

1. Use a strong repository name and clear tagline.
2. Add screenshots/GIFs in the README (top of file).
3. Pin the repo on your GitHub profile.
4. Add topics/tags (`portfolio`, `nextjs`, `tailwindcss`, `gsap`, `github-pages`).
5. Share on X, Reddit, Dev.to, Hashnode, and LinkedIn with a short demo clip.
6. Write a short “How I built this” post and link the repo.
7. Keep commits and releases active so GitHub shows recent activity.

## Notes

- Keep `siteMeta.siteUrl` aligned with your final public URL.
- `robots.txt` and `sitemap.xml` are static-compatible.
- If GitHub API rate limits happen during snapshot fetch, fallback data is used automatically.
