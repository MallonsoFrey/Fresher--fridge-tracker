import { useState } from "react";
import { ru, enGB } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import RussianFlagSVG from "@/assets/russian-flag.svg";
import UKFlagSVG from "@/assets/uk-flag.svg";

export default function LanguageToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { i18n } = useTranslation();
  const locale = i18n.language === "ru" ? ru : enGB;

  const changeLanguage = () => {
    if (locale === ru && !isEnabled) {
      i18n.changeLanguage('en');
      setIsEnabled(true);
    } else {
      i18n.changeLanguage('ru');
      setIsEnabled(false);
    }
  };

  return (
    <div className="absolute right-3 top-4 outline-none"><button
      onClick={() => changeLanguage()}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
      bg-gray-300"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />

      <img
        className={`absolute h-4 w-full left-2 ${!isEnabled ? "block" : "hidden"}`}
        src={RussianFlagSVG}
        alt=""
      />

      <img
        className={`absolute h-4 w-full right-2 ${isEnabled ? "block" : "hidden"}`}
        src={UKFlagSVG}
        alt=""
      />
    </button></div>
    
  );
}
