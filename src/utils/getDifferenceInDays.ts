import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function getDifferenceInDays(date: Date) {
  const currentDate = new Date().getTime();
  const expDate = date.getTime();
  const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
  const difInDays = Math.ceil(timeDif);
  const parsedDate = format(new Date(expDate), "d MMMM", {
    locale: ru,
  });

  return {
    difInDays,
    parsedDate,
  };
}
