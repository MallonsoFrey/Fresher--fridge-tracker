import { useState } from "react";
import { ru, enGB } from "date-fns/locale";
import { useLanguage } from "@/utils/useLangugae";

export default function LanguageToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const locale = currentLanguage === "ru" ? ru : enGB;

  const toggleLanguage = () => {
    if (locale === ru && !isEnabled) {
      changeLanguage();
      setIsEnabled(true);
    } else {
      changeLanguage();
      setIsEnabled(false);
    }
  };

  return (
    <div className="absolute md:right-3 md:top-[3.5vh] right-5 top-[9vh] outline-none">
      <button
        onClick={() => toggleLanguage()}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
      bg-gray-300"
      >
        <span
          className={`inline-block overflow-hidden h-4 w-4 transform rounded-full transition-transform bg-center bg-contain bg-no-repeat ${
            isEnabled
              ? "translate-x-6  bg-[url('@/assets/uk-flag.svg')]"
              : "translate-x-1 bg-[url('@/assets/russian-flag.svg')]"
          }`}
        />
        <span
          className={`text-xs font-bold baseline absolute ${isEnabled ? "left-1.5" : "right-1.5"}`}
        >
          {isEnabled ? "en" : "ru"}
        </span>
      </button>
    </div>
  );
}
