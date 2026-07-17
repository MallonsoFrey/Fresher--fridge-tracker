import { useAddedProducts } from "@/store/addedProductsStore";
import getDayWord from "@/utils/getDayWord";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";

export default function AddedProducts() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const deleteProduct = useAddedProducts((state) => state.deleteProduct);
  const [isToDelete, setIsToDelete] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null,
  );
  const [chosenFilter, setChosenFilter] = useState<string>("all");

  function onDeleteProduct(productId: string) {
    setIsToDelete(true);
    setProductIdToDelete(productId);
  }

  function confirmDeleteProduct() {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
    }
    setIsToDelete(false);
  }

  const filteredProducts = addedProducts?.filter((product) => {
    const currentDate = new Date().getTime();
    const expDate = product.expDate.getTime();
    const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
    const difInDays = Math.ceil(timeDif);

    if (chosenFilter === "all") return true;
    if (chosenFilter === "soon" && difInDays > 0 && difInDays <= 3) return true;
    if (chosenFilter === "fresh" && difInDays > 3) return true;
    if (chosenFilter === "spoilt" && difInDays < 0) return true;
    return false;
  });

  return (
    <>
      <div className="w-full md:w-fit text-[12px] md:text-[16px] flex gap-1 md:gap-3 p-3 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        {addedProducts.length > 0 && (
          <ul className="text-[#687063] w-full list-none list-inside flex gap-5 justify-center text-center md:text-left">
            <li
              className={`cursor-pointer ${chosenFilter === "all" ? "bg-white p-3 rounded-2xl font-bold" : "bg-[#F6F4EE] p-3"}`}
              onClick={() => setChosenFilter("all")}
            >
              Все
            </li>
            <li
              className={`cursor-pointer ${chosenFilter === "fresh" ? "bg-white p-3 rounded-2xl font-bold" : "bg-[#F6F4EE] p-3"}`}
              onClick={() => setChosenFilter("fresh")}
            >
              Свежее
            </li>
            <li
              className={`cursor-pointer ${chosenFilter === "soon" ? "bg-white p-3 rounded-2xl font-bold" : "bg-[#F6F4EE] p-3"}`}
              onClick={() => setChosenFilter("soon")}
            >
              Скоро испортится
            </li>
            <li
              className={`cursor-pointer ${chosenFilter === "spoilt" ? "bg-white p-3 rounded-2xl font-bold" : "bg-[#F6F4EE] p-3"}`}
              onClick={() => setChosenFilter("spoilt")}
            >
              Испортилось
            </li>
          </ul>
        )}
      </div>
      <div className="flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <h2 className="text-lg text-[#687063] font-bold flex justify-between">
          В холодильнике
          <span className="bg-[#EDF2E7] rounded-full py-2 px-4 text-sm">
            {addedProducts.length > 0 ? addedProducts.length : 0}
          </span>
        </h2>
        <div className="grid md:min-w-[613px] md:grid-cols-2 gap-2 flex-col md:flex-row">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => {
              const currentDate = new Date().getTime();
              const expDate = product.expDate.getTime();
              const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
              const difInDays = Math.ceil(timeDif);
              const parsedDate = format(new Date(product.expDate), "d MMMM", {
                locale: ru,
              });
              return (
                <div
                  key={product.id}
                  className="shadow-sm md:min-w-[280px] md:max-w-[300px] text-left w-full h-auto flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-3 text-sm"
                >
                  <div className="select-none w-fit rounded-[100px] p-4 bg-[_rgba(236,242,230,0.9)]">
                    <span className="flex">{product.emoji}</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full leading-none">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{product.name}</span>
                      <span
                        onClick={() => onDeleteProduct(product.id)}
                        className={`cursor-pointer inline-block h-fit text-[10px] rounded-[100px] py-1 px-2 ${difInDays < 0 ? "spoilt-delete  text-[#9A5752] bg-[#F3DDDD]" : difInDays <= 3 ? "soon-delete text-[#866921] bg-[#F5E8BF]" : "fresh-delete text-[#59744D] bg-[#E3EFDA]"}`}
                      >
                        {difInDays < 0
                          ? "Испортилось"
                          : difInDays <= 3
                            ? "Скоро"
                            : "Свежее"}
                      </span>
                    </div>
                    <span className="text-xs">
                      {difInDays > 0
                        ? `Осталось: ${difInDays} ${getDayWord(difInDays)}`
                        : difInDays == 0
                          ? "Испортится сегодня"
                          : "Уже испортилось :("}
                    </span>
                    {difInDays && (
                      <span className="text-[8px] text-[#687063]">
                        До: {parsedDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        {isToDelete && (
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex text-[#687063] gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
              <p>Вы уверены, что хотите удалить этот продукт?</p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsToDelete(false)}
                  className="transition-all duration-300 bg-[_rgba(236,242,230,0.9)] hover:bg-[#687063] hover:text-[_rgba(236,242,230,0.9)] py-2 px-4 rounded-[100px] cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  onClick={() => confirmDeleteProduct()}
                  className="transition-all duration-300 bg-[#9A5752] text-[#F3DDDD] hover:text-[#9A5752] hover:bg-[#F3DDDD] py-2 px-4 rounded-[100px] cursor-pointer"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
