# Update Index

Scan `character/` and `sentense/` folders, verify Google Translate links **only for files changed since the last index.html commit**, update `index.html`, then report.

## Steps

### 1. Discover files and changed set

Run both commands:
```bash
ls character/*.html sentense/*.html 2>/dev/null | sort
git diff $(git log -1 --format=%H -- index.html)..HEAD --name-only -- character/ sentense/
```

First command = all files (both folders). Second command = files changed since last index update (need URL verification for `sentense/` files). If second command returns nothing, skip steps 2–3.

### 2. Verify Google Translate links (changed sentense/ files only)

Only `sentense/` files have Google Translate links. Run this Python script passing only changed `sentense/` files:

```python
import re, sys
from urllib.parse import unquote, quote

files = sorted(sys.argv[1:])
for path in files:
    html = open(path).read()
    chars = re.findall(r'class="ch"[^>]*>([^<]+)<', html)
    punct_match = re.search(r'</span>\s*<span[^>]*>([。.？！…]+)</span>\s*</span>\s*</div>', html)
    sentence = ''.join(chars) + (punct_match.group(1) if punct_match else '')
    url_match = re.search(r'href="(https://translate\.google\.com[^"]+)"', html)
    url = url_match.group(1) if url_match else ''
    text_match = re.search(r'[?&]text=([^&]+)', url)
    decoded = unquote(text_match.group(1)) if text_match else ''
    ok = decoded == sentence
    print(f'{path}|{sentence}|{decoded}|{quote(sentence, safe="")}|{ok}')
```

### 3. Fix wrong links

For any `sentense/` file where the last column is `False`, replace the old `href` with:
`https://translate.google.com/?sl=ko&tl=zh-CN&text=<URL-encoded sentence>&op=translate`

### 4. Handle bad filenames

For any file (in either folder) not already in the index whose filename does not match `YYYYMMDD-NNN.html`:

1. Read the file. Determine its type:
   - **`sentense/`**: Korean sentence note if it contains `.ch` span elements.
   - **`character/`**: Korean character note if it contains `<h2>` section headings with Korean characters.
   - If neither matches, skip and report as unrecognised.
2. Determine the correct name:
   - Extract the date: look for a Google Translate link or date signal in the HTML; fall back to `git log -1 --format=%cs -- <path>`; fall back to today's date.
   - Find the next free sequence number for that date in the same folder (`ls <folder>/YYYYMMDD-*.html`).
   - Rename: if tracked use `git mv`, else plain `mv`.

### 5. Update index.html

Read `index.html`. It has two `<section>` blocks — **字母** (character/) and **句子** (sentense/) — each containing a `<ul>`. For every file that passes validation (sorted), ensure a matching `<li>` exists in the correct section's `<ul>`. Do not remove or reorder existing entries.

**Label to use:**
- `sentense/` file: the Korean sentence text from the Google Translate URL (`text=` param, URL-decoded).
- `character/` file: `<h2>` headings joined with ` / ` (strip all HTML tags).

**Date prefix:** from filename `YYYYMMDD-NNN.html` → `YYYY.MM.DD`.

Each new `<li>` must follow this pattern:
```html
                <li>
                    <a href="FOLDER/YYYYMMDD-NNN.html" class="entry-link">
                        <span class="entry-date">YYYY.MM.DD</span>
                        <span class="entry-text">…label…</span>
                        <svg class="entry-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </li>
```

### 6. Report

- Changed files checked / links fixed (which files, what was wrong)
- Files renamed (old → new)
- Index entries added (which section)
- Unrecognised files skipped
- "Nothing to change" if all was already correct
