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
