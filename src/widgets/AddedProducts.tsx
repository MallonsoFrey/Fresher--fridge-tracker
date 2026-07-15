import { useAddedProducts } from "@/store/addedProductsStore";
import { format } from "date-fns";

export default function AddedProducts() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);

  return (
    <div className="flex gap-3 flex-col p-5 bg-[#FFFFFFD1] border-[#F4F2ECFA] border-2 rounded-[24px]">
      <h2 className="text-lg text-[#687063] font-bold flex justify-between">
        В холодильнике
        <span className="bg-[#EDF2E7] rounded-full py-2 px-4 text-sm">
          {addedProducts.length > 0 ? addedProducts.length : 0}
        </span>
      </h2>
      <div className="flex flex-wrap gap-2 flex-col md:flex-row">
        {addedProducts.length > 0 &&
          addedProducts.map((product) => {
            const currentDate = new Date().getTime();
            const expDate = product.expDate.getTime();
            const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24)
            const difInDays = Math.floor(timeDif);
            const parsedDate = format(product.expDate, "dd/MM/yyyy");
            return (
              <div
                key={product.id}
                className="shadow-sm md:max-w-[300px] text-left w-full h-auto flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-3 text-sm"
              >
                <div className="select-none w-fit rounded-[100px] p-4 bg-[_rgba(236,242,230,0.9)]">
                  <span className="flex">{product.emoji}</span>
                </div>
                <div className="flex flex-col gap-1 w-full leading-none">
                  <div className="flex justify-between items-start">
                    <span className="font-bold">{product.name}</span>
                    {difInDays < 0 ? (
                      <span className="inline-block h-fit text-[8px] text-[#9A5752] bg-[#F3DDDD] rounded-[100px] py-1 px-2">
                        Испортилось
                      </span>
                    ) : timeDif <= 3 ? (
                      <span className="inline-block h-fit text-[8px] text-[#866921] bg-[#F5E8BF] rounded-[100px] py-1 px-2">
                        Скоро
                      </span>
                    ) : (
                      <span className="inline-block h-fit text-[8px] text-[#59744D] bg-[#E3EFDA] rounded-[100px] py-1 px-2">
                        Свежее
                      </span>
                    )}
                  </div>
                  <span className="text-xs">До: {parsedDate}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
