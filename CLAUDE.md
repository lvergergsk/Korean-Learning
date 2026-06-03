# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static GitHub Pages site for Korean language study notes, written in Chinese (zh-CN). Two content types:

- **`sentense/`** — sentence study pages, one per Korean sentence
- **`character/`** — character/alphabet reference pages

No build step, no dependencies, no server. All pages are standalone HTML files using Tailwind CSS via CDN.

## Maintaining the index

After adding new files to `sentense/` or `character/`, run `/update-index`. This skill:
1. Verifies Google Translate pronunciation links in changed `sentense/` files match the actual sentence text
2. Fixes any mismatches
3. Adds missing entries to `index.html`

## File naming convention

`YYYYMMDD-NNN.html` (e.g. `20260530-001.html`). Special files like `alphabet.html` in `character/` are exempt.

## Page structure

**Sentence pages (`sentense/`):**
- `.ch` spans hold individual Korean syllables (used by `/update-index` to reconstruct the sentence)
- `.k` / `.k-sh` spans are keyboard key badges showing IME input sequences
- `.wrd` / `.hc` / `.ks` spans handle the syllable layout
- Google Translate link with `text=<URL-encoded sentence>` for pronunciation
- Vocabulary table + grammar notes section

**Index (`index.html`):**
- Two `<section>` blocks: **字母** (character/) and **句子** (sentense/)
- Each `<li>` uses `.entry-link` with `.entry-date` (from filename) and `.entry-text` (Korean sentence or character heading)

**Character pages (`character/`):**
- Use `<h2>` section headings with Korean characters (used by `/update-index` for index labels)

## Git workflow

**Branch names:** must start with `feature/` or `fix/` followed by a brief summary (e.g. `feature/add-greetings-sentences`, `fix/translate-link-mismatch`).

**PR titles:** keep short — one concise phrase, no long descriptions.
