// i18n (internationalization) utility for language switching
class I18n {
  constructor() {
    this.currentLang = this.getStoredLanguage() || "ar"; // Default to Arabic
    this.translations = translations; // From translations.js
  }

  // Get language from localStorage
  getStoredLanguage() {
    return localStorage.getItem("language");
  }

  // Set language in localStorage
  setStoredLanguage(lang) {
    localStorage.setItem("language", lang);
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Set current language and update page
  setLanguage(lang) {
    if (lang !== "ar" && lang !== "en") {
      console.error('Invalid language. Use "ar" or "en"');
      return;
    }

    this.currentLang = lang;
    this.setStoredLanguage(lang);
    this.updatePageLanguage();
    this.updateDirection();
  }

  // Toggle between Arabic and English
  toggleLanguage() {
    const newLang = this.currentLang === "ar" ? "en" : "ar";
    this.setLanguage(newLang);
  }

  // Get translation for a key
  translate(key) {
    const translation = this.translations[this.currentLang][key];
    if (!translation) {
      console.warn(
        `Translation not found for key: ${key} in language: ${this.currentLang}`,
      );
      return key;
    }
    return translation;
  }

  // Update all elements with data-i18n attribute
  updatePageLanguage() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.translate(key);

      // Check if element has data-i18n-attr to update attribute instead of text
      const attrToUpdate = element.getAttribute("data-i18n-attr");
      if (attrToUpdate) {
        element.setAttribute(attrToUpdate, translation);
      } else {
        // Update text content
        element.textContent = translation;
      }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", this.currentLang);

    // Dispatch custom event for other components to react
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: this.currentLang },
      }),
    );
  }

  // Update page direction (RTL for Arabic, LTR for English)
  updateDirection() {
    const direction = this.currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", direction);
    document.body.setAttribute("dir", direction);

    // Update text-align based on direction
    if (this.currentLang === "en") {
      document.body.style.textAlign = "left";
    } else {
      document.body.style.textAlign = "right";
    }
  }

  // Initialize language on page load
  init() {
    this.updatePageLanguage();
    this.updateDirection();
  }

  // Get language button text
  getLanguageButtonText() {
    return this.currentLang === "ar" ? "EN" : "عربي";
  }
}

// Create global instance
const i18n = new I18n();
