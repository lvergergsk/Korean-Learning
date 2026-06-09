# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static GitHub Pages site for Korean language study notes, written in Chinese (zh-CN). Two content types:

- **`sentense/`** — sentence study pages, one per Korean sentence
- **`character/`** — character/alphabet reference pages

No build step, no dependencies, no server. All pages are standalone HTML files using Tailwind CSS via CDN.

## Mandatory references before any HTML/CSS edit

Before writing or editing any HTML or CSS in this project, you MUST read these two files:

1. **`styling.md`** (project root) — the authoritative design system: dark theme, color palette, component specs.
2. **Modern web guidance** — run the `modern-web-guidance` skill to search for best practices relevant to what you're about to implement.

## Page templates — MUST use when generating new content

When creating any new page, read the corresponding template first and follow it exactly:

| Page type | Template file | Output location |
|---|---|---|
| Sentence study page | `templates/sentense.html` | `sentense/YYYYMMDD-NNN.html` |
| Jamo detail page | `templates/character-jamo.html` | `character/jamo-<name>.html` |
| Character combination page | `templates/character-combo.html` | `character/YYYYMMDD-NNN.html` |
| Vocabulary list page | `templates/word.html` | `word/YYYYMMDD.html` |

Each template has `<!-- FILL: ... -->` comments marking every placeholder. Replace all of them; leave no template comment in the generated file. The templates also contain inline rules explaining constraints specific to that page type (e.g. which CSS classes to use for syllable chars, how to format the Google Translate URL, etc.).

## Maintaining the index

After adding new files to `sentense/` or `character/`, run `/update-index`. This skill:
1. Verifies Google Translate pronunciation links in changed `sentense/` files match the actual sentence text
2. Fixes any mismatches
3. Adds missing entries to `index.html`

## File naming convention

`YYYYMMDD-NNN.html` (e.g. `20260530-001.html`). Special files like `alphabet.html` in `character/` are exempt.

## Page structure

**Sentence pages (`sentense/`):**
- `.ch` spans hold individual Korean syllables (used by `/update-index` to reconstruct the sentence). The `.ch` class in `shared.css` provides the dark-mode color — do NOT add inline `color:` styles.
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

All pages share the same **dark** visual design defined in `styling.md`. Use these as canonical templates.

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
Subdirectories other than `sentense/` and `character/` (e.g. `word/`) also use `../`.

**Page shell (dark theme):**
```html
<body class="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen">
    <div class="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        ...
    </div>
</body>
```

**Korean text** — always add `font-kr` class to any element containing Hangul characters.

**Section headings:**
- Primary sections (vocabulary, grammar): `class="text-sm font-semibold text-slate-300 uppercase tracking-wider border-l-4 border-indigo-500 pl-3 mb-4"`
- Secondary sections (tips, notes): same but `border-amber-500`
- Larger headings (like in `alphabet.html`): `class="text-xl font-bold text-slate-100 border-l-4 border-indigo-500 pl-3 mb-1 tracking-wide"`

**Card / content block:**
```html
<div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
```
Indigo accent bar inside a card: `<div class="accent-bar"></div>`

**Tables:**
```html
<div class="overflow-hidden bg-slate-900 border border-slate-800 rounded-xl mb-8">
    <table class="min-w-full divide-y divide-slate-800">
        <thead class="bg-slate-800/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <tr><th scope="col" class="px-5 py-3 text-left tracking-wider">…</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-800 bg-transparent">
            <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="px-5 py-3 align-top text-slate-400 text-xs leading-relaxed">…</td>
            </tr>
        </tbody>
    </table>
</div>
```

**Character grid cards** (used in `alphabet.html`):
```html
<div class="bg-slate-900 rounded-xl ring-1 ring-slate-700 p-3 flex flex-col items-center hover:ring-indigo-500 transition-all cursor-default">
    <span class="font-kr text-3xl font-bold text-indigo-400">ㅏ</span>
    <span class="mt-1 text-xs text-slate-400 font-mono">a</span>
</div>
```

**Inline keyboard key** (character/jamo pages — use `kbd-key` class from `shared.css`):
```html
<kbd class="kbd-key">r</kbd>
```

**Tips/notes list** (sentence pages):
```html
<div class="border-l-4 border-amber-500 pl-4">
    <ul style="list-style:none;padding:0;margin:0;">
        <li class="tip-item text-sm text-slate-400 leading-relaxed mb-4">…</li>
    </ul>
</div>
```
The `.tip-item` class (diamond bullet `◆`) comes from `shared.css` — no inline `<style>` block needed.

**Sentence page CSS** — `.ch`/`.wrd`/`.hc`/`.ks`/`.k`/`.k-sh` syllable layout classes and `.tip-item` are all in `shared.css`. No per-page `<style>` block is needed for sentence pages.

## Git workflow

**Branch names:** must start with `feature/` or `fix/` followed by a brief summary (e.g. `feature/add-greetings-sentences`, `fix/translate-link-mismatch`).

**PR titles:** keep short — one concise phrase, no long descriptions.
