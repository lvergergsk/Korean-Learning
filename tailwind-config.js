window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
                kr: ['Malgun Gothic', 'Dotum', 'sans-serif'],
            }
        }
    }
};

(function () {
    const storageKeys = {
        theme: 'korean-learning-theme',
        unlocked: 'korean-learning-unlocked',
    };

    const siteConfig = Object.assign({
        siteTitle: '韩语学习',
        sitePassword: 'michael',
    }, window.KOREAN_LEARNING_CONFIG || {});

    window.KOREAN_LEARNING_CONFIG = siteConfig;

    const root = document.documentElement;

    function readStorage(store, key) {
        try {
            return store.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function writeStorage(store, key, value) {
        try {
            store.setItem(key, value);
        } catch (error) {
            return null;
        }
        return value;
    }

    function resolveHomeUrl() {
        const script = Array.from(document.scripts).find((item) => {
            const src = item.getAttribute('src') || '';
            return /tailwind-config\.js(?:\?|$)/.test(src);
        });

        if (script && script.src) {
            return new URL('index.html', script.src).toString();
        }

        return new URL('index.html', window.location.href).toString();
    }

    function normalizePath(url) {
        return new URL(url, window.location.href).pathname.replace(/\/index\.html$/, '/');
    }

    function currentTheme() {
        return root.dataset.theme === 'light' ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        const nextTheme = theme === 'light' ? 'light' : 'dark';
        root.dataset.theme = nextTheme;
        root.style.colorScheme = nextTheme;
        writeStorage(window.localStorage, storageKeys.theme, nextTheme);
    }

    function applyUnlockedState(isUnlocked) {
        root.dataset.locked = isUnlocked ? 'false' : 'true';
    }

    const savedTheme = readStorage(window.localStorage, storageKeys.theme);
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');
    applyUnlockedState(readStorage(window.sessionStorage, storageKeys.unlocked) === siteConfig.sitePassword);

    function derivePageLabel() {
        const rawTitle = document.title || siteConfig.siteTitle;
        return rawTitle
            .replace(/\s+[—-]\s+韩语学习$/, '')
            .replace(/\s+\|\s+Korean Alphabet Chart$/, '')
            .trim();
    }

    function updateThemeToggle(button) {
        if (!button) {
            return;
        }

        const theme = currentTheme();
        const nextLabel = theme === 'light' ? '切换到深色' : '切换到浅色';
        button.textContent = nextLabel;
        button.setAttribute('aria-label', nextLabel);
        button.setAttribute('aria-pressed', String(theme === 'light'));
    }

    function collapseLegacyHomeLinks() {
        const links = Array.from(document.querySelectorAll('a')).filter((anchor) => {
            return anchor.textContent.replace(/\s+/g, ' ').trim() === '← 首页';
        });

        links.forEach((anchor) => {
            const wrapper = anchor.parentElement;
            if (
                wrapper &&
                wrapper.children.length === 1 &&
                wrapper.textContent.replace(/\s+/g, ' ').trim() === '← 首页'
            ) {
                wrapper.classList.add('legacy-home-wrapper');
                return;
            }

            anchor.classList.add('legacy-home-link');
        });
    }

    function mountGlobalHeader() {
        if (document.querySelector('.site-shell')) {
            return;
        }

        const homeUrl = resolveHomeUrl();
        const isHomePage = normalizePath(window.location.href) === normalizePath(homeUrl);

        const header = document.createElement('div');
        header.className = 'site-shell';

        const inner = document.createElement('div');
        inner.className = 'site-shell-inner';

        const brand = document.createElement('div');
        brand.className = 'site-shell-brand';

        const titleLink = document.createElement('a');
        titleLink.className = 'site-shell-title';
        titleLink.href = homeUrl;
        titleLink.textContent = siteConfig.siteTitle;

        const pageLabel = document.createElement('span');
        pageLabel.className = 'site-shell-page';
        pageLabel.textContent = isHomePage ? '学习目录' : derivePageLabel();

        brand.append(titleLink, pageLabel);

        const actions = document.createElement('div');
        actions.className = 'site-shell-actions';

        if (!isHomePage) {
            const homeLink = document.createElement('a');
            homeLink.className = 'site-shell-link';
            homeLink.href = homeUrl;
            homeLink.textContent = '首页';
            actions.appendChild(homeLink);
        }

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'site-theme-toggle';
        toggle.dataset.themeToggle = 'true';
        toggle.addEventListener('click', () => {
            applyTheme(currentTheme() === 'light' ? 'dark' : 'light');
            updateThemeToggle(toggle);
        });
        updateThemeToggle(toggle);
        actions.appendChild(toggle);

        inner.append(brand, actions);
        header.appendChild(inner);
        document.body.prepend(header);
    }

    function unlockSite() {
        writeStorage(window.sessionStorage, storageKeys.unlocked, siteConfig.sitePassword);
        applyUnlockedState(true);
        const gate = document.querySelector('.site-password-gate');
        if (gate) {
            gate.remove();
        }
    }

    function mountPasswordGate() {
        if (root.dataset.locked !== 'true' || document.querySelector('.site-password-gate')) {
            return;
        }

        const gate = document.createElement('div');
        gate.className = 'site-password-gate';
        gate.innerHTML = [
            '<div class="site-password-card">',
            '  <p class="site-password-eyebrow">静态访问限制</p>',
            `  <h1 class="site-password-title">${siteConfig.siteTitle}</h1>`,
            '  <p class="site-password-copy">输入密码后继续浏览。这个密码只做简单阻挡，不提供真正安全性。</p>',
            '  <form class="site-password-form">',
            '    <label class="site-password-label" for="site-password-input">访问密码</label>',
            '    <input id="site-password-input" class="site-password-input" type="password" autocomplete="current-password" placeholder="请输入密码">',
            '    <p class="site-password-error" data-password-error hidden>密码不正确，请重试。</p>',
            '    <button class="site-password-submit" type="submit">进入网站</button>',
            '  </form>',
            '</div>',
        ].join('');

        document.body.appendChild(gate);

        const form = gate.querySelector('.site-password-form');
        const input = gate.querySelector('.site-password-input');
        const error = gate.querySelector('[data-password-error]');

        if (!form || !input || !error) {
            return;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (input.value === siteConfig.sitePassword) {
                unlockSite();
                return;
            }

            error.hidden = false;
            input.value = '';
            input.focus();
            input.select();
        });

        window.setTimeout(() => {
            input.focus();
        }, 0);
    }

    function bootSiteChrome() {
        mountGlobalHeader();
        collapseLegacyHomeLinks();
        mountPasswordGate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootSiteChrome, { once: true });
    } else {
        bootSiteChrome();
    }
})();
