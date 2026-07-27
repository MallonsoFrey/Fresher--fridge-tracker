import { useAddedProducts } from "@/store/store";
import { type ExpirationStatus, type ProductItem } from "@/data/products";
import getProductWord from "@/utils/getProductWord";
import getDayWord from "@/utils/getDayWord";
import { useTranslation } from "react-i18next";

export default function ExpDateStats() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const currentDate = new Date().getTime();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("ru") ? "ru" : "en";

  if (!addedProducts.length) return null;

  const expDates = addedProducts.reduce(
    (acc: Record<ExpirationStatus, ProductItem[]>, p) => {
      const expDate = p.expDate.getTime();
      const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
      const difInDays = Math.ceil(timeDif);

      const isExpired = difInDays != null && difInDays < 0;
      const isSoon = difInDays != null && difInDays >= 0 && difInDays <= 3;
      //const isFresh = , != null && difInDays > 3;

      if (isExpired) {
        if (!acc["expired"]) {
          acc["expired"] = [];
        }
        acc["expired"].push(p);
      } else if (isSoon) {
        if (!acc["soon"]) {
          acc["soon"] = [];
        }
        acc["soon"].push(p);
      } else {
        if (!acc["fresh"]) {
          acc["fresh"] = [];
        }
        acc["fresh"].push(p);
      }
      return acc;
    },
    {} as Record<ExpirationStatus, ProductItem[]>,
  );
  const theLastAdded = expDates.fresh?.at(-1);

  const soonToExpire: ProductItem | null = expDates["soon"]
    ? expDates["soon"].length > 1
      ? expDates["soon"]?.sort(
          (a, b) => a.expDate.getTime() - b.expDate.getTime(),
        )[0]
      : expDates["soon"][0]
    : null;
  const soonToExpDate = soonToExpire?.expDate.getTime();
  const timeDif = soonToExpDate
    ? (soonToExpDate - currentDate) / (1000 * 60 * 60 * 24)
    : 0;
  const difInDays = Math.ceil(timeDif);

  return (
    <div
      className="flex pb-5 md:pb-0 overflow-x-auto
md:overflow-hidden h-auto gap-3"
    >
      {expDates["fresh"] && (
        <div className="flex gap-3 flex-col min-w-[218px] p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#EAF3E3]">
              🥬
            </div>
            <span className="inline-block h-fit text-[18px] md:text-sm font-bold text-[#59744D] bg-[#E3EFDA] rounded-[100px] py-1 px-2">
              {t("expDateStats.fresh")}
            </span>
          </div>
          <div>
            <span className="text-[28px] md:text-lg font-bold mr-2">
              {expDates["fresh"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[10px]">
              {getProductWord(expDates["fresh"].length, currentLanguage)}
            </span>
          </div>
          <div className="flex flex-col text-[14px] md:text-[12px] text-[#687063]">
            {t("expDateStats.lastAdded")}
            <span className="font-bold">
              {theLastAdded?.name[currentLanguage]}
            </span>
          </div>
        </div>
      )}
      {expDates["soon"] && (
        <div className="flex gap-3 flex-col min-w-[218px]  p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#F7EFD9]">
              ⏳
            </div>
            <span className="inline-block h-fit text-[18px] md:text-sm font-bold text-[#866921] bg-[#F7EFD9] rounded-[100px] py-1 px-2">
              {t("expDateStats.soon")}
            </span>
          </div>
          <div>
            <span className="text-[28px] md:text-lg font-bold mr-2">
              {expDates["soon"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[14px]">
              {getProductWord(expDates["soon"].length, currentLanguage)}
            </span>
          </div>
          <div className="flex text-[14px] flex-col md:text-[12px] text-[#687063]">
            {t("expDateStats.nearest")}
            <span className="font-bold flex-col flex-wrap flex justify-between">
              {soonToExpire?.name[currentLanguage]}
              {difInDays == 0 ? (
                <span className="font-bold">
                  {" "}
                  {t("expDateStats.spilsToday")}
                </span>
              ) : (
                <span className="font-normal">
                  {t("expDateStats.inDays")}
                  <span className="font-bold">{difInDays}</span>
                  {getDayWord(difInDays, currentLanguage)}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
      {expDates["expired"] && (
        <div className="flex gap-3 flex-col min-w-[218px] p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#F3DDDD]">
              ❌
            </div>
            <span className="inline-block h-fit text-[18px] md:text-sm font-bold text-[#9A5752] bg-[#F3DDDD] rounded-[100px] py-1 px-2">
              {t("expDateStats.expired")}
            </span>
          </div>
          <div>
            <span className="text-[28px] md:text-lg font-bold mr-2">
              {expDates["expired"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[14px]">
              {getProductWord(expDates["expired"].length, currentLanguage)}
            </span>
          </div>
          <div className="text-[14px] flex font-bold md:text-[12px] text-[#687063]">
            {t("expDateStats.checkFridge")}
          </div>
        </div>
      )}
    </div>
  );
}
