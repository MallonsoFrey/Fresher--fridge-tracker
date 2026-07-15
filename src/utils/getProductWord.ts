export default function getProductWord(count: number): string {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'продуктов';
  }

  if (lastDigit === 1) {
    return 'продукт';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'продукта';
  }

  return 'продуктов';
}