import getDifferenceInDays from "./getDifferenceInDays";

export default function getProductStatus(date: Date): {
  isExpired: boolean;
  isSoon: boolean;
} {
  const { difInDays } = getDifferenceInDays(date);

  const isExpired = difInDays != null && difInDays < 0;
  const isSoon = difInDays != null && difInDays >= 0 && difInDays <= 3;
  //const isFresh = , != null && difInDays > 3;

  return {
    isExpired,
    isSoon,
  };
}
