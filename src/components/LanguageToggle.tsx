import { useLanguage } from "@/utils/useLanguage";

export default function LanguageToggle() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const isEnglish = currentLanguage === "en";

  return (
    <div className="absolute md:right-3 md:top-[3.5vh] right-5 top-[9vh] outline-none">
      <button
        onClick={() => changeLanguage()}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
      bg-gray-300"
      >
        <span
          className={`inline-block overflow-hidden h-4 w-4 transform rounded-full transition-transform bg-center bg-contain bg-no-repeat ${
            isEnglish
              ? "translate-x-6  bg-[url('@/assets/uk-flag.svg')]"
              : "translate-x-1 bg-[url('@/assets/russian-flag.svg')]"
          }`}
        />
        <span
          className={`text-xs font-bold baseline absolute ${isEnglish ? "left-1.5" : "right-1.5"}`}
        >
          {isEnglish ? "en" : "ru"}
        </span>
      </button>
    </div>
  );
}
