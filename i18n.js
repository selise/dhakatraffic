/**
 * i18n.js — Language detection + translation manager
 * Uses SELISE Blocks UILM API for translations.
 * Auto-detects Bengali/Bangla browser language on first visit.
 */

const runtimeEnv = window.__APP_ENV__ || {};

function normalizeBaseUrl(url) {
  if (!url) return '';
  return url.replace(/\/+$/, '');
}

function resolveUilmConfig() {
  const projectKey = runtimeEnv.REACT_APP_PUBLIC_X_BLOCKS_KEY || runtimeEnv.UILM_PROJECT_KEY || '';
  const blocksApiBase =
    runtimeEnv.REACT_APP_PUBLIC_BLOCKS_API_URL ||
    runtimeEnv.REACT_APP_PUBLIC_API_URL ||
    runtimeEnv.UILM_BASE_URL ||
    '';

  return {
    projectKey,
    baseUrl: blocksApiBase.includes('/uilm/v1')
      ? normalizeBaseUrl(blocksApiBase)
      : `${normalizeBaseUrl(blocksApiBase)}/uilm/v1`
  };
}

const resolvedConfig = resolveUilmConfig();

const UILM_CONFIG = {
  projectKey: resolvedConfig.projectKey,
  baseUrl: resolvedConfig.baseUrl,
  defaultCulture: 'en-US',
  modules: ['common', 'dhaka-roads'],
  supportedCultures: {
    'en-US': { label: 'EN', name: 'English' },
    'bn-BD': { label: 'বাং', name: 'বাংলা' }
  }
};

function hasUilmConfig() {
  return Boolean(UILM_CONFIG.projectKey && UILM_CONFIG.baseUrl);
}

/**
 * Detect if the user's browser language is Bengali/Bangla.
 * Checks navigator.languages (array) and navigator.language (string).
 * Returns 'bn-BD' if Bengali detected, otherwise 'en-US'.
 */
function detectLanguage() {
  const langs = navigator.languages
    ? navigator.languages.map(l => l.toLowerCase())
    : [navigator.language.toLowerCase()];

  const isBengali = langs.some(l => l.startsWith('bn'));
  return isBengali ? 'bn-BD' : 'en-US';
}

class Translator {
  constructor() {
    // Use stored preference, or auto-detect on first visit
    const stored = localStorage.getItem('selectedLanguage');
    if (stored && UILM_CONFIG.supportedCultures[stored]) {
      this.currentCulture = stored;
    } else {
      this.currentCulture = detectLanguage();
      localStorage.setItem('selectedLanguage', this.currentCulture);
    }
    this.translations = {};
    this.originalContent = {};
  }

  async init() {
    // Snapshot original English HTML so we can restore if API fails
    this.snapshotOriginals();
    this.renderSwitcher();
    await this.loadTranslations(this.currentCulture);
    this.applyTranslations();
  }

  /** Save the original innerHTML of every [data-i18n] element */
  snapshotOriginals() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!this.originalContent[key]) {
        this.originalContent[key] = el.innerHTML;
      }
    });
  }

  async loadTranslations(culture) {
    this.currentCulture = culture;
    localStorage.setItem('selectedLanguage', culture);
    this.translations = {};

    if (!hasUilmConfig()) {
      console.warn(
        'UILM configuration missing. Define REACT_APP_PUBLIC_X_BLOCKS_KEY and REACT_APP_PUBLIC_BLOCKS_API_URL in runtime env.'
      );
      return;
    }

    try {
      const fetches = UILM_CONFIG.modules.map(async (mod) => {
        const url = `${UILM_CONFIG.baseUrl}/Key/GetUilmFile?ProjectKey=${UILM_CONFIG.projectKey}&Language=${culture}&ModuleName=${mod}`;
        const res = await fetch(url, {
          headers: { 'x-blocks-key': UILM_CONFIG.projectKey }
        });
        if (res.ok) {
          const text = await res.text();
          if (text && text.trim()) {
            const data = JSON.parse(text);
            Object.assign(this.translations, data);
          }
        }
      });
      await Promise.all(fetches);
    } catch (err) {
      console.warn('Translation load failed, keeping current content:', err);
    }
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.translations[key];
      if (translated) {
        el.innerHTML = translated;
      } else if (this.originalContent[key]) {
        // Fallback to original English content
        el.innerHTML = this.originalContent[key];
      }
    });

    // Update <html lang> and dir attributes
    const langCode = this.currentCulture.split('-')[0];
    document.documentElement.lang = langCode;
    document.documentElement.dir = 'ltr';

    // Update active state on switcher buttons
    this.updateSwitcherState();
  }

  async setLanguage(culture) {
    if (culture === this.currentCulture) return;
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.classList.add('loading');

    await this.loadTranslations(culture);
    this.applyTranslations();

    // Re-create Lucide icons in case translations replaced icon markup
    if (typeof lucide !== 'undefined') lucide.createIcons();

    if (switcher) switcher.classList.remove('loading');
  }

  renderSwitcher() {
    // Switcher markup lives in index.html; just attach click handlers and sync state
    const switcher = document.getElementById('lang-switcher');
    if (!switcher) return;

    switcher.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setLanguage(btn.dataset.lang);
      });
    });

    // Sync active state with the current culture (may differ from HTML default)
    this.updateSwitcherState();
  }

  updateSwitcherState() {
    const btns = document.querySelectorAll('#lang-switcher .lang-btn');
    btns.forEach(btn => {
      const isActive = btn.dataset.lang === this.currentCulture;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive);
    });
  }
}

// Boot
const translator = new Translator();
document.addEventListener('DOMContentLoaded', () => translator.init());
