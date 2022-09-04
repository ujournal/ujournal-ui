import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      translation: {
        intlRelativeTime: "{{value, relativetime}}",
      },
    },
  },
  lng: "uk",
  fallbackLng: "uk",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
