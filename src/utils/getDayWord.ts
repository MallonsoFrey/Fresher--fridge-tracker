export default function getDayWord(
  count: number,
  language: "ru" | "en",
): string {
  if (language === "en") {
    return count === 1 ? "day" : "days";
  }

  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "дней";
  }

  if (last === 1) {
    return "день";
  }

  if (last >= 2 && last <= 4) {
    return "дня";
  }

  return "дней";
}
