import { useAddedProducts } from "@/store/store";
import { type ExpirationStatus, type ProductItem } from "@/data/products";
import getProductWord from "@/utils/getProductWord";
import getDayWord from "@/utils/getDayWord";

export default function ExpDateStats() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const currentDate = new Date().getTime();

  if (addedProducts.length == 0) return;

  const expDates = addedProducts.reduce(
    (acc: Record<ExpirationStatus, ProductItem[]>, p) => {
      const expDate = p.expDate.getTime();
      const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
      const difInDays = Math.floor(timeDif);

      if (difInDays < 0) {
        if (!acc["expired"]) {
          acc["expired"] = [];
        }
        acc["expired"].push(p);
      } else if (difInDays <= 3) {
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
  const theLastAdded: ProductItem =
    expDates["fresh"]?.[expDates["fresh"].length - 1];

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
  const difInDays = Math.floor(timeDif);

  return (
    <div className="flex flex-col h-fit md:flex-row gap-3">
      {expDates["fresh"] && (
        <div className="flex gap-3 flex-col min-w-[218px] p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#EAF3E3]">
              🥬
            </div>
            <span className="inline-block h-fit text-[20px] md:text-sm font-bold text-[#59744D] bg-[#E3EFDA] rounded-[100px] py-1 px-2">
              Свежее
            </span>
          </div>
          <div>
            <span className="text-[40px] md:text-lg font-bold mr-2">
              {expDates["fresh"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[10px]">
              {getProductWord(expDates["fresh"].length)}
            </span>
          </div>
          <div className="flex flex-col md:text-[10px] text-[#687063]">
            Последнее добавление:
            <span className="font-bold">{theLastAdded.name}</span>
          </div>
        </div>
      )}
      {expDates["soon"] && (
        <div className="flex gap-3 flex-col min-w-[218px]  p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#F7EFD9]">
              ⏳
            </div>
            <span className="inline-block h-fit text-[20px] md:text-sm font-bold text-[#866921] bg-[#F7EFD9] rounded-[100px] py-1 px-2">
              Скоро
            </span>
          </div>
          <div>
            <span className="text-[40px] md:text-lg font-bold mr-2">
              {expDates["soon"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[10px]">
              {getProductWord(expDates["soon"].length)}
            </span>
          </div>
          <div className="flex flex-col md:text-[10px] text-[#687063]">
            Ближайший:
            <span className="font-bold flex justify-between items-end">
              {soonToExpire?.name}
              {difInDays == 0 ? (
                <span className="font-bold">Испортится сегодня</span>
              ) : (
                <span className="font-normal">
                  Через <span className="font-bold">{difInDays}</span>
                  {getDayWord(difInDays)}
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
            <span className="inline-block h-fit text-[20px] md:text-sm font-bold text-[#9A5752] bg-[#F3DDDD] rounded-[100px] py-1 px-2">
              Испортилось
            </span>
          </div>
          <div>
            <span className="text-[40px] md:text-lg font-bold mr-2">
              {expDates["expired"].length}
            </span>
            <span className="text-[20px] font-bold md:text-[10px]">
              {getProductWord(expDates["expired"].length)}
            </span>
          </div>
          <div className="flex font-bold md:text-[10px] text-[#687063]">
            Не забудьте проверить холодильник
          </div>
        </div>
      )}
    </div>
  );
}
