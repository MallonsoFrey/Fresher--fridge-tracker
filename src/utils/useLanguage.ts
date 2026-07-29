import { useLanguageStore } from "@/store/languageStore";

export type AppLanguage = "ru" | "en";

export function useLanguage() {
  const currentLanguage = useLanguageStore((state) => state.language);

  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const changeLanguage = () => {
    setLanguage(currentLanguage === "ru" ? "en" : "ru");
  };

  return {
    currentLanguage,
    changeLanguage,
  };
}
