import { format } from "date-fns";
import { ru, enGB } from "date-fns/locale";

export default function getDifferenceInDays(date: Date, language: "ru" | "en") {
  const currentDate = new Date().getTime();
  const expDate = date.getTime();
  const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
  const difInDays = Math.ceil(timeDif);

  const locale = language === "ru" ? ru : enGB;
  const parsedDate = format(date, "d MMMM", {
    locale,
  });

  return {
    difInDays,
    parsedDate,
  };
}
