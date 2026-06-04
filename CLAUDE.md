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

## Style guide

All pages share the same visual design. Use this as the template when creating new pages.

**`<head>` boilerplate** — every page links to the two shared files. Use `../` prefix for pages inside `sentense/` or `character/`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="../tailwind-config.js"></script>
<link rel="stylesheet" href="../shared.css">
```
Root-level pages (`index.html`, etc.) omit the `../`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="tailwind-config.js"></script>
<link rel="stylesheet" href="shared.css">
```

**Page shell:**
```html
<body class="bg-slate-50 text-slate-800 antialiased font-sans min-h-screen">
    <div class="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        ...
    </div>
</body>
```

**Korean text** — always add `font-kr` class to any element containing Hangul characters.

**Section headings:**
- Primary sections (vocabulary, grammar): `class="text-sm font-semibold text-slate-700 uppercase tracking-wider border-l-4 border-blue-600 pl-3 mb-4"`
- Secondary sections (tips, notes): same but `border-amber-500`
- Larger headings (like in `alphabet.html`): `class="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-1 tracking-wide"`

**Card / content block:**
```html
<div class="bg-white shadow-sm ring-1 ring-slate-200 rounded-xl p-6 mb-8">
```
Blue accent bar inside a card: `<div class="accent-bar"></div>`

**Tables:**
```html
<div class="overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 rounded-xl mb-8">
    <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-semibold">
            <tr><th scope="col" class="px-5 py-3 text-left tracking-wider">…</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-200 bg-white">
            <tr class="hover:bg-slate-50/80 transition-colors">
                <td class="px-5 py-3 align-top text-slate-500 text-xs leading-relaxed">…</td>
            </tr>
        </tbody>
    </table>
</div>
```

**Character grid cards** (used in `alphabet.html`):
```html
<div class="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-3 flex flex-col items-center hover:shadow-md hover:ring-blue-300 transition-all cursor-default">
    <span class="font-kr text-3xl font-bold text-blue-700">ㅏ</span>
    <span class="mt-1 text-xs text-slate-500 font-mono">a</span>
</div>
```

**Tips/notes list** (sentence pages):
```html
<div class="border-l-4 border-amber-500 pl-4">
    <ul style="list-style:none;padding:0;margin:0;">
        <li class="tip-item text-sm text-slate-500 leading-relaxed mb-4">…</li>
    </ul>
</div>
```
The `.tip-item` class (diamond bullet `◆`) comes from `shared.css` — no inline `<style>` block needed.

**Sentence page CSS** — `.wrd`/`.hc`/`.ks`/`.k`/`.k-sh` syllable layout classes and `.tip-item` are all in `shared.css`. No per-page `<style>` block is needed for sentence pages.

## Git workflow

**Branch names:** must start with `feature/` or `fix/` followed by a brief summary (e.g. `feature/add-greetings-sentences`, `fix/translate-link-mismatch`).

**PR titles:** keep short — one concise phrase, no long descriptions.
