import { useAddedProductStore } from "@/store/productStore";
import { type ExpirationStatus, type AddedProductItem } from "@/data/products";
import getProductWord from "@/utils/getProductWord";
import getDayWord from "@/utils/getDayWord";
import { useTranslation } from "react-i18next";
import getProductStatus from "@/utils/getProductStatus";
import ExpDateCard from "./ExpDateCard";

export default function ExpDateStats() {
  const addedProducts = useAddedProductStore((state) => state.addedProducts);
  const currentDate = new Date().getTime();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("ru") ? "ru" : "en";

  if (!addedProducts.length) return null;

  const expDates = addedProducts.reduce(
    (acc: Record<ExpirationStatus, AddedProductItem[]>, p) => {
      const { isExpired, isSoon } = getProductStatus(p.expDate);

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
    {} as Record<ExpirationStatus, AddedProductItem[]>,
  );
  const theLastAdded = expDates.fresh?.at(-1);

  const soonToExpire: AddedProductItem | null = expDates["soon"]
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
      {expDates.fresh.length > 0 && (
        <ExpDateCard
          emoji="🥬"
          bgColor="bg-[#EAF3E3]"
          textColor="text-[#59744D]"
          status={t("expDateStats.fresh")}
          amount={expDates.fresh.length}
          expText={getProductWord(expDates.fresh.length, currentLanguage)}
        >
          <span>{t("expDateStats.lastAdded")}</span>

          <span className="font-bold">
            {theLastAdded?.name[currentLanguage]}
          </span>
        </ExpDateCard>
      )}
      {expDates.soon.length > 0 && (
        <ExpDateCard
          emoji="⏳"
          bgColor="bg-[#F7EFD9]"
          textColor="text-[#866921]"
          status={t("expDateStats.soon")}
          amount={expDates.soon.length}
          expText={getProductWord(expDates.soon.length, currentLanguage)}
        >
          <span>{t("expDateStats.nearest")}</span>

          <div className="font-bold flex flex-col">
            <span>{soonToExpire?.name[currentLanguage]}</span>

            {difInDays === 0 ? (
              <span>{t("expDateStats.spoilsToday")}</span>
            ) : (
              <span className="font-normal">
                {t("expDateStats.inDays")}

                <span className="font-bold">{difInDays}</span>

                {getDayWord(difInDays, currentLanguage)}
              </span>
            )}
          </div>
        </ExpDateCard>
      )}
      {expDates.expired.length > 0 && (
        <ExpDateCard
          emoji="❌"
          bgColor="bg-[#F3DDDD]"
          textColor="text-[#9A5752]"
          status={t("expDateStats.expired")}
          amount={expDates.expired.length}
          expText={getProductWord(expDates.expired.length, currentLanguage)}
        >
          <span className="font-bold">{t("expDateStats.checkFridge")}</span>
        </ExpDateCard>
      )}
    </div>
  );
}
