export default function getProductWord(
  count: number,
  language: "ru" | "en",
): string {
  if (language === "en") {
    return count === 1 ? "product" : "products";
  }

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "продуктов";
  }

  if (lastDigit === 1) {
    return "продукт";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "продукта";
  }

  return "продуктов";
}
