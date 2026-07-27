export default function getProductStatus(date: Date): {
  isExpired: boolean;
  isSoon: boolean;
} {
  const currentDate = new Date().getTime();
  const expDate = date.getTime();
  const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
  const difInDays = Math.ceil(timeDif);

  const isExpired = difInDays != null && difInDays < 0;
  const isSoon = difInDays != null && difInDays >= 0 && difInDays <= 3;
  //const isFresh = , != null && difInDays > 3;

  return {
    isExpired,
    isSoon,
  };
}
