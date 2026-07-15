import { useAddedProducts } from "@/store/addedProductsStore";
import { type ExpirationStatus } from "@/data/products";
import getProductWord from "@/utils/getProductWord";

export default function ExpDateStats() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const currentDate = new Date().getTime();
  const expDates: ExpirationStatus = {};

  if (addedProducts.length == 0) return;

  addedProducts.forEach((p) => {
    const expDate = p.expDate.getTime();
    const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
    const difInDays = Math.floor(timeDif);

    if (difInDays < 0) {
      if (!expDates["expired"]) {
        expDates["expired"] = 1;
      } else expDates["expired"]++;
    } else if (difInDays <= 3) {
      if (!expDates["soon"]) {
        expDates["soon"] = 1;
      } else expDates["soon"]++;
    } else {
      if (!expDates["fresh"]) {
        expDates["fresh"] = 1;
      } else expDates["fresh"]++;
    }
  });

  return (
    <div className="flex flex-col h-fit md:flex-row gap-3">
      {expDates["fresh"] && (
        <div className="flex gap-3 flex-col min-w-[218px] p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#EAF3E3]">
              🥬
            </div>
            <span className="inline-block h-fit text-sm font-bold text-[#59744D] bg-[#E3EFDA] rounded-[100px] py-1 px-2">
              Свежее
            </span>
          </div>
          <div>
            <span className="text-lg font-bold mr-2">{expDates["fresh"]}</span>
            {getProductWord(expDates["fresh"])}
          </div>
        </div>
      )}
      {expDates["soon"] && (
        <div className="flex gap-3 flex-col min-w-[218px]  p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#F7EFD9]">
              ⏳
            </div>
            <span className="inline-block h-fit text-sm font-bold text-[#866921] bg-[#F7EFD9] rounded-[100px] py-1 px-2">
              Скоро
            </span>
          </div>
          <div>
            <span className="text-lg font-bold mr-2">{expDates["soon"]}</span>
            {getProductWord(expDates["soon"])}
          </div>
        </div>
      )}
      {expDates["expired"] && (
        <div className="flex gap-3 flex-col min-w-[218px] p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
          <div className="flex justify-between items-center">
            <div className="max-w-[48px] max-h-[48px] select-none w-fit rounded-[100px] p-3 bg-[#F3DDDD]">
              ❌
            </div>
            <span className="inline-block h-fit text-sm font-bold text-[#9A5752] bg-[#F3DDDD] rounded-[100px] py-1 px-2">
              Испортилось
            </span>
          </div>
          <div>
            <span className="text-lg font-bold mr-2">
              {expDates["expired"]}
            </span>
            {getProductWord(expDates["expired"])}
          </div>
        </div>
      )}
    </div>
  );
}
