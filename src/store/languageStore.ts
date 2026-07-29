import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../../i18n";

export type AppLanguage = "ru" | "en";

type LanguageStore = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "ru",

      setLanguage: async (language) => {
        await i18n.changeLanguage(language);

        set({
          language,
        });
      },
    }),

    {
      name: "language-storage",

      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            i18n.changeLanguage(state.language);
          }
        };
      },
    },
  ),
);
