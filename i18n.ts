import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from './src/locales/en/common.json';
import ru from './src/locales/ru/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: "ru",
  fallbackLng: "ru",
});

export default i18n;
