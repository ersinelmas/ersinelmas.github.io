# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static single-page portfolio site (`ersinelmas.github.io`) served directly by GitHub Pages. There is no build system, package manager, or test suite — plain HTML/CSS/JS deployed as-is.

## Running locally

There is no build step. Serve the directory with any static file server and open it in a browser, e.g.:

```
npx serve .
```

(or open `index.html` directly, though `fetch('data/i18n.json')` requires a real HTTP server, not `file://`, due to CORS).

## Architecture

- `index.html` — single page containing all sections (hero, about, skills, experience, projects, education, certificates, contact). Content elements are empty/placeholder in markup and are populated at runtime — text nodes carry a `data-i18n="path.to.key"` attribute, and list-based sections (skills, experience, projects, education, certificates) have an empty container with an `id` (e.g. `#skills-list`) that JS fills in.
- `data/i18n.json` — the single source of truth for all page content, keyed by locale (`tr`, `en`). Each locale has the same shape (`meta`, `nav`, `subtitles`, `hero`, `about`, `skills`, `experience`, `projects`, `education`, `certificates`, `contact`). To change page copy or add/edit a skill, job, project, degree, or certificate, edit this file — not `index.html`.
- `js/main.js` — vanilla JS (ES module, no dependencies/build). On load it fetches `data/i18n.json`, then:
  - `applyTextContent()` walks every `[data-i18n]` element and sets `textContent` from the matching dotted path in the active locale.
  - `render*()` functions (`renderSkills`, `renderExperience`, `renderProjects`, `renderEducation`, `renderCertificates`, `renderAboutDetails`, `renderContact`) build innerHTML for the list-based sections from the locale's array data.
  - `updateMeta()` syncs `<title>` and OG meta tags per locale.
  - Language (`tr`/`en`) and theme (`dark`/`light`) are persisted in `localStorage` and reapplied on load; theme is a `data-theme` attribute on `<html>` that CSS variables key off of.
  - When adding a new content field, add it to **both** locales in `i18n.json` and wire a corresponding `data-i18n` attribute (static text) or a `render*`/element mapping in `main.js` (dynamic list/field) — the two files must stay in sync.
- `css/main.css` — all styling, theme-driven via CSS custom properties defined on `:root` (dark, default) and overridden under `:root[data-theme='light']`. No preprocessor/framework.

## Deployment

Pushing to `main` publishes directly via GitHub Pages — there is no CI build step, so what's committed is what ships.
