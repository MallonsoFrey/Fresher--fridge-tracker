import { format } from "date-fns";
import { ru, enGB } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import FresherLogo from "./../assets/fresher.svg";

export default function Header() {
  const { t, i18n } = useTranslation();
  const currentDate = new Date();
  const locale = i18n.language === "ru" ? ru : enGB;
  const parsedDate = format(currentDate, "d MMMM, EEEE", {
    locale,
  });

  return (
    <>
      <header className="relative text-[#8E9388] text-lg md:text-[28px] md:max-w-[264px] font-bold uppercase flex md:flex-row-reverse justify-between md:h-fit md:gap-5 md:justify-normal items-center md:mb-4">
        <img className="w-[6.5rem] md:w-[140px]" src={FresherLogo} alt="brand logo" />
        <span className="flex bg-[#EEF2E9] select-none w-fit rounded-[100px] p-4">
          🥬
        </span>
      </header>
      <div className="md:absolute text-[#687063] w-full leading-none md:top-[20%] md:left-[calc(1350/2)] md:p-3 m-auto md:shadow-sm flex-col text-left md:w-fit md:mb-0 mb-4 flex md:gap-3 md:border-[#F4F2ECFA] md:border-2 rounded-[24px] md:bg-[_rgba(255,255,255,0.98)]">
        <p>{t("date.today")}</p>
        <p className="font-bold">{parsedDate}</p>
      </div>
    </>
  );
}
