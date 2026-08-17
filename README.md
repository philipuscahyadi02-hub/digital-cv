# Philipus Cahyadi — Digital CV

A single-page, dark-mode-first portfolio site built with Next.js (App Router) and Tailwind CSS.

## Structure

- `data/resume.ts` — all resume content (summary, experience, skills, projects). Edit this file to update the site's content.
- `components/` — Nav, Hero, Experience, Skills, Projects, Contact, plus `Reveal` (scroll-in animation) and `Spotlight` (cursor-follow glow).
- `public/Philipus-Cahyadi-Resume.pdf` — the downloadable resume served by the "Resume ↓" button.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset auto-detects as Next.js — no config needed. Click Deploy.

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Updating content

Edit `data/resume.ts` for text content. To replace the downloadable resume, swap the file at `public/Philipus-Cahyadi-Resume.pdf` (keep the same filename, or update the href in `components/Nav.tsx`).
