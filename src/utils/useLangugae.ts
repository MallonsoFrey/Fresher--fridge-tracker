import { useTranslation } from "react-i18next";

export type AppLanguage = "ru" | "en";

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage: AppLanguage = i18n.language.startsWith("ru")
    ? "ru"
    : "en";

  const changeLanguage = () => {
    i18n.changeLanguage(currentLanguage.startsWith("ru") ? "en" : "ru");
  };

  return {
    currentLanguage,
    changeLanguage,
  };
}
