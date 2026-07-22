import { useState } from "react";
import { useAddedProducts } from "@/store/store";
import { useOnboardingStore } from "@/store/store";
import DeleteProductModal from "../components/DeleteProductModal";
import ProductCard from "@/components/ProductCard";

export default function AddedProducts() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const onboardingStep = useOnboardingStore((state) => state.currentStep);
  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding,
  );
  const setNextStep = useOnboardingStore((state) => state.nextStep);
  const [isToDelete, setIsToDelete] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null,
  );
  const [chosenFilter, setChosenFilter] = useState<string>("all");

  function onDeleteProduct(productId: string) {
    setIsToDelete(true);
    setProductIdToDelete(productId);
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
      <div className="w-full md:w-fit text-[14px] flex flex-col md:flex-row gap-2">
        {addedProducts.length > 0 && (
          <>
            <ul className="leading-none rounded-3xl bg-[#F6F4EE] border-[#F4F2ECFA] border-2 text-[#687063] w-full list-none list-inside items-center flex gap-5 justify-center text-center md:text-left">
              <li
                className={`cursor-pointer p-3 rounded-3xl ${chosenFilter === "all" ? "bg-white font-bold" : "bg-[#F6F4EE]"}`}
                onClick={() => setChosenFilter("all")}
              >
                Все
              </li>
              <li
                className={`cursor-pointer p-3 rounded-3xl ${chosenFilter === "fresh" ? "bg-white font-bold" : "bg-[#F6F4EE]"}`}
                onClick={() => setChosenFilter("fresh")}
              >
                Свежее
              </li>
              <li
                className={`cursor-pointer p-3 rounded-3xl ${chosenFilter === "soon" ? "bg-white font-bold" : "bg-[#F6F4EE]"}`}
                onClick={() => setChosenFilter("soon")}
              >
                Скоро испортится
              </li>
              <li
                className={`cursor-pointer p-3 rounded-3xl ${chosenFilter === "spoilt" ? "bg-white font-bold" : "bg-[#F6F4EE]"}`}
                onClick={() => setChosenFilter("spoilt")}
              >
                Испортилось
              </li>
            </ul>
            <div className="relative w-full md:w-fit flex justify-start items-center">
              <svg
                className="absolute left-0 pointer-events-none h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#687063"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="#687063"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <input
                className="ml-7 text-[#687063]"
                type="text"
                placeholder="Поиск..."
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`relative flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px] ${onboardingStep === 2 ? "z-40" : ""}`}
      >
        <h2 className="text-lg text-[#687063] font-bold flex justify-between">
          В холодильнике
          <span className="bg-[#EDF2E7] rounded-full py-2 px-4 text-sm">
            {addedProducts.length > 0 ? addedProducts.length : 0}
          </span>
        </h2>
        <div className="grid md:min-w-[613px] md:grid-cols-2 gap-2 flex-col md:flex-row">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => {
              return (
                <ProductCard
                  product={product}
                  onDeleteProduct={onDeleteProduct}
                />
              );
            })}
        </div>
        {isToDelete && productIdToDelete && (
          <DeleteProductModal
            productIdToDelete={productIdToDelete}
            setIsToDelete={setIsToDelete}
          />
        )}
      </div>
      {addedProducts.length === 1 && onboardingStep === 2 && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-start justify-center">
          <div className="relative md:left-[5%] top-[15%] w-[calc(100%-30px)] md:w-[360px] flex text-[#687063] gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
            <p className="font-bold">
              Вы добавили свой первый продукт! <span>🎉</span>
            </p>
            <p className="flex flex-col leading-none gap-1">
              Далее они будут появляться в виджете
              <span className="font-bold">"В холодильнике"</span>
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setNextStep(0);
                  completeOnboarding();
                }}
                className="transition-all duration-300 bg-[_rgba(236,242,230,0.9)] hover:bg-[#687063] hover:text-[_rgba(236,242,230,0.9)] py-2 px-4 rounded-[100px] cursor-pointer"
              >
                ОK!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
