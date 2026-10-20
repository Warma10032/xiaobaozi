# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal homepage for "一只小包子" (ZeroTang05) — a Next.js 15 site with App Router, featuring an Anthropic-inspired warm cream aesthetic with real-time social stats.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js linter
```

## Architecture

```
app/
  page.tsx       # Home page — assembles all sections in order
  layout.tsx     # Root layout with font (Instrument Sans) and metadata
  globals.css    # Global CSS variables, resets, and typography
  api/stats/     # Edge API routes: github, bilibili, afdian, xiaohongshu
  api/feed/      # RSS feed aggregation

components/      # One folder per section, each with .tsx + .module.css
  Hero/          # Avatar, name, tagline
  StatsBar/      # Client component fetching real-time stats (github stars, b站, etc.)
  About/         # Personal bio section
  Academic/      # Publications/academic section
  Projects/      # GitHub projects showcase
  Sites/         # Grid of personal site links
  Feed/          # RSS-powered activity feed
  Footer/        # Contact links
```

## Key Patterns

- **CSS Modules** — each component has `ComponentName.module.css` co-located
- **CSS Variables** — defined in `app/globals.css` under `:root`:
  - `--bg: #F5F0E8` (warm cream background)
  - `--bg-secondary`, `--text`, `--text-muted`, `--border`, `--accent`
- **Client Components** — components using `useEffect`/`useState` are marked `'use client'` (e.g., StatsBar)
- **Edge Runtime** — API routes use `export const runtime = 'edge'`
- **Google Fonts** — Instrument Sans (headings, via next/font/google) + Source Serif 4 (body)

## Design Spec

Full design specification is in `docs/specs/2026-04-05-personal-homepage-design.md` — includes layout structure, color palette, component inventory, and data sources.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS Modules (no Tailwind)

## Git Remote & Push Policy (SSH only)

The **only** supported way to push to the remote repository is **SSH**. The `origin` remote is
`git@github.com:Warma10032/xiaobaozi.git` for both fetch and push.

### Rules

- **Never push over HTTPS.** Do not use an `https://github.com/...` URL for any remote and never run
  `git push https://...`.
- **Never change the remote protocol.** Do not run `git remote set-url origin https://...` and do not
  add an HTTPS remote — `origin` must stay on the SSH URL.
- **Never add URL rewrites.** Do not configure `url."https://github.com/".insteadOf` or any
  `pushInsteadOf` rule that would silently redirect SSH traffic to HTTPS.
- **Never put a token in a remote URL.** No PAT or password embedded in a push URL.
- **Never fall back to HTTPS when SSH fails.** If the push is rejected (e.g.
  `Permission denied (publickey)`, host key change, network block), report the error to the user
  instead of switching protocols.
- **Push only when the user asks.** Never push as a side effect of a build, test, or fix task.

### Standard workflow

```bash
git status
git add -A
git commit -m "<message>"
git push origin main
```

The active branch is `main`.

### Verify before pushing

```bash
git remote -v   # must show git@github.com:Warma10032/xiaobaozi.git for both fetch and push
```

### SSH setup already in place

- A working key is at `~/.ssh/id_rsa` (public key `~/.ssh/id_rsa.pub`), already registered with GitHub
  as `Warma10032`; `ssh -T git@github.com` authenticates successfully.
- Do not generate new SSH keys, overwrite `~/.ssh/id_rsa`, or rewrite `~/.ssh/config` for this repo.
- If authentication breaks, ask the user to restore the key — never fall back to HTTPS.
