import { differenceInCalendarDays, format } from "date-fns";
import { ru, enGB } from "date-fns/locale";

export default function getDifferenceInDays(
  date: Date | string,
  language: "ru" | "en" = "ru",
) {
  const expDate = new Date(date);

  const currentDate = new Date();

  const timeDif = differenceInCalendarDays(expDate, currentDate);

  const difInDays = Math.ceil(timeDif);

  const locale = language === "ru" ? ru : enGB;

  const parsedDate = format(expDate, "d MMMM", {
    locale,
  });

  return {
    difInDays,
    parsedDate,
  };
}
