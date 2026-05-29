# Update Index

Scan all sentence files under `sentense/`, verify each file's Google Translate link, update `index.html`, then report what changed.

## Steps

### 1. Discover sentence files

Run:
```bash
ls sentense/*.html | sort
```

### 2. Extract sentence text and Google Translate URL from each file

For each `.html` file found, use Python to parse out:
- The Korean sentence text (collect all `.ch` span text in order, plus any trailing punctuation character that appears after the last `.hc` span)
- The `href` of the `<a>` tag whose title is `"在 Google 翻译中朗读"`

Run a single Python script like this:

```python
import re, glob
from urllib.parse import unquote, quote

files = sorted(glob.glob('sentense/*.html'))
for path in files:
    html = open(path).read()
    # Extract Korean chars from .ch spans
    chars = re.findall(r'class="ch"[^>]*>([^<]+)<', html)
    # Extract trailing punctuation (。. ？ ！ etc.) after last .hc span
    punct_match = re.search(r'</span>\s*<span[^>]*>([。.？！…]+)</span>\s*</span>\s*</div>', html)
    sentence = ''.join(chars) + (punct_match.group(1) if punct_match else '')
    # Extract Google Translate URL
    url_match = re.search(r'title="在 Google 翻译中朗读"[^>]*href="([^"]+)"', html)
    if not url_match:
        url_match = re.search(r'href="(https://translate\.google\.com[^"]+)"', html)
    url = url_match.group(1) if url_match else ''
    # Decode text param from URL
    text_match = re.search(r'[?&]text=([^&]+)', url)
    decoded = unquote(text_match.group(1)) if text_match else ''
    correct = quote(sentence, safe='')
    ok = decoded == sentence
    print(f'{path}|{sentence}|{decoded}|{correct}|{ok}')
```

### 3. Fix any wrong Google Translate links

For each file where the decoded URL text does not match the extracted sentence:
- Rebuild the correct URL:  
  `https://translate.google.com/?sl=ko&tl=zh-CN&text=<URL-encoded sentence>&op=translate`
- Use the Edit tool to replace the old `href` value with the corrected one in that file.

### 4. Update index.html

Read `index.html`. The sentences section looks like:

```html
<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li>
        <a href="sentense/20260530-001.html" ...>
            한국어를 처음 배우는 중이니 너그럽게 봐주세요.
        </a>
    </li>
    ...
</ul>
```

- For every file in `sentense/` (sorted), ensure there is a matching `<li>` entry whose `href` points to it and whose link text is the extracted Korean sentence.
- Add missing entries; do not remove or reorder existing ones.
- Each `<li>` should follow the same HTML pattern as the existing entries.

### 5. Report

Print a summary:
- Files scanned
- Google Translate links fixed (list which files and what was wrong)
- Index entries added (list which files)
- "Nothing to change" if everything was already correct
