/**
 * i18n.js — Language detection + translation manager
 * Uses SELISE Blocks UILM API for translations.
 * Auto-detects Bengali/Bangla browser language on first visit.
 */

const UILM_CONFIG = {
  projectKey: 'Pca81546c695f46d099eacb66adcb6899',
  baseUrl: 'https://api.seliseblocks.com/uilm/v1',
  defaultCulture: 'en-US',
  modules: ['common', 'dhaka-roads'],
  supportedCultures: {
    'en-US': { label: 'EN', name: 'English' },
    'bn-BD': { label: 'বাং', name: 'বাংলা' }
  }
};

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

    try {
      const fetches = UILM_CONFIG.modules.map(async (mod) => {
        const url = `${UILM_CONFIG.baseUrl}/Key/GetUilmFile?ProjectKey=${UILM_CONFIG.projectKey}&Language=${culture}&ModuleName=${mod}`;
        const res = await fetch(url, {
          headers: { 'x-blocks-key': UILM_CONFIG.projectKey }
        });
        if (res.ok) {
          const data = await res.json();
          Object.assign(this.translations, data);
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
    // Show loading state
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.classList.add('loading');

    await this.loadTranslations(culture);
    this.applyTranslations();

    if (switcher) switcher.classList.remove('loading');
  }

  renderSwitcher() {
    // Insert switcher into the nav (before the nav-toggle button)
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    let switcher = document.getElementById('lang-switcher');
    if (!switcher) {
      switcher = document.createElement('div');
      switcher.id = 'lang-switcher';
      switcher.setAttribute('role', 'radiogroup');
      switcher.setAttribute('aria-label', 'Language');

      // Insert before the nav-toggle button
      const toggle = nav.querySelector('.nav-toggle');
      if (toggle) {
        nav.insertBefore(switcher, toggle);
      } else {
        nav.appendChild(switcher);
      }
    }

    const cultures = Object.entries(UILM_CONFIG.supportedCultures);
    switcher.innerHTML = cultures.map(([code, info]) =>
      `<button class="lang-btn${code === this.currentCulture ? ' active' : ''}"
              data-lang="${code}"
              role="radio"
              aria-checked="${code === this.currentCulture}"
              aria-label="${info.name}"
              title="${info.name}">${info.label}</button>`
    ).join('');

    switcher.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });
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
