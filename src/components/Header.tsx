import { format } from "date-fns";
import { ru, enGB } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import FresherLogo from "./../assets/fresher.svg";
import { useLanguage } from "@/utils/useLangugae";

export default function Header() {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const currentDate = new Date();
  const locale = currentLanguage === "ru" ? ru : enGB;
  const parsedDate = format(currentDate, "d MMMM, EEEE", {
    locale,
  });

  return (
    <>
      <header className="mb-3 relative text-[#8E9388] text-lg md:text-[28px] md:max-w-[264px] gap-2 font-bold uppercase flex flex-row-reverse md:h-fit md:mx-auto mx-auto items-center md:mb-4">
        <img
          className="w-[6.5rem] md:w-[140px]"
          src={FresherLogo}
          alt="brand logo"
        />
        <span className="flex bg-[#EEF2E9] select-none w-fit rounded-[100px] pt-3">
          🥬
        </span>
      </header>
      <div className="md:absolute w-fit leading-none md:top-[20%] md:left-[calc(1350/2)] md:p-4 mr-auto md:shadow-sm flex-col text-left md:w-fit md:mb-0 mb-4 flex md:gap-3 md:border-[#F4F2ECFA] md:border-2 rounded-[24px] md:bg-[_rgba(255,255,255,0.98)]">
        <p>{t("date.today")}</p>
        <p className="font-bold">{parsedDate}</p>
      </div>
    </>
  );
}
