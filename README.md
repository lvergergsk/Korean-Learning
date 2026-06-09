# Korean Learning

A GitHub Pages site for Korean sentence study notes.

https://lvergergsk.github.io/Korean-Learning/

## Structure

- `index.html` — root page linking to all sentences
- `sentense/` — individual sentence pages with vocabulary, grammar notes, and pronunciation tips

## Skills

### `/update-index`

Run this after adding new files to `sentense/`. It will:

1. Scan all `sentense/*.html` files
2. Verify each file's Google Translate pronunciation link matches the actual sentence — fixes any mismatch
3. Add missing entries to `index.html`
4. Report what was changed
