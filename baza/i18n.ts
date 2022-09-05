import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from "translations/translations/uk.json";
import ru from "translations/translations/ru.json";
import en from "translations/translations/en.json";

const intl = {
  intlRelativeTime: "{{value, relativetime}}",
};

i18n.use(initReactI18next).init({
  resources: {
    uk: {
      translation: {
        ...uk,
        ...intl,
      },
    },
    ru: {
      translation: {
        ...ru,
        ...intl,
      },
    },
    en: {
      translation: {
        ...en,
        ...intl,
      },
    },
  },
  lng: "ru",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
