/**
 * i18n.js - Plain JavaScript Translation Manager for SELISE Blocks UILM
 */

const UILM_CONFIG = {
    projectKey: 'Pca81546c695f46d099eacb66adcb6899',
    baseUrl: 'https://api.seliseblocks.com/uilm/v1',
    defaultCulture: 'en-US',
    modules: ['common', 'dhaka-roads']
};

class Translator {
    constructor() {
        this.currentCulture = localStorage.getItem('selectedLanguage') || UILM_CONFIG.defaultCulture;
        this.translations = {};
        this.languages = [];
    }

    async init() {
        await this.fetchLanguages();
        await this.loadTranslations(this.currentCulture);
        this.renderSwitcher();
        this.applyTranslations();
    }

    async fetchLanguages() {
        try {
            const response = await fetch(`${UILM_CONFIG.baseUrl}/Language/Gets?ProjectKey=${UILM_CONFIG.projectKey}`, {
                headers: { 'x-blocks-key': UILM_CONFIG.projectKey }
            });
            this.languages = await response.json();
        } catch (error) {
            console.error('Failed to fetch languages:', error);
            // Fallback to basic set if API fails
            this.languages = [
                { languageName: 'English', languageCode: 'en-US' },
                { languageName: 'Bengali', languageCode: 'bn-BD' }
            ];
        }
    }

    async loadTranslations(culture) {
        this.currentCulture = culture;
        localStorage.setItem('selectedLanguage', culture);

        // Reset translations to avoid stale keys
        this.translations = {};

        try {
            // Fetch each module individually to match the GetUilmFile API
            const fetchPromises = UILM_CONFIG.modules.map(async (moduleName) => {
                const url = `${UILM_CONFIG.baseUrl}/Key/GetUilmFile?ProjectKey=${UILM_CONFIG.projectKey}&Language=${culture}&ModuleName=${moduleName}`;

                const response = await fetch(url, {
                    headers: { 'x-blocks-key': UILM_CONFIG.projectKey }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Merge module translations into the global object
                    Object.assign(this.translations, data);
                }
            });

            await Promise.all(fetchPromises);
        } catch (error) {
            console.error(`Failed to load translations for ${culture}:`, error);
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[key]) {
                el.innerHTML = this.translations[key];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentCulture.split('-')[0];
    }

    async setLanguage(culture) {
        await this.loadTranslations(culture);
        this.applyTranslations();
        this.renderSwitcher(); // Re-render to show active
    }

    renderSwitcher() {
        let switcher = document.getElementById('language-switcher');
        if (!switcher) {
            switcher = document.createElement('div');
            switcher.id = 'language-switcher';
            document.body.appendChild(switcher);
        }

        switcher.innerHTML = this.languages.map(l =>
            `<button class="lang-btn${l.languageCode === this.currentCulture ? ' active' : ''}"
                     data-lang="${l.languageCode}">${l.languageName}</button>`
        ).join('');

        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                translator.setLanguage(btn.dataset.lang);
            });
        });
    }
}

// Global instance
const translator = new Translator();
document.addEventListener('DOMContentLoaded', () => translator.init());
