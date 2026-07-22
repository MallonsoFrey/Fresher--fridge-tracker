import { useState } from "react";
import { useAddedProducts } from "@/store/store";
import { useOnboardingStore } from "@/store/store";
import DeleteProductModal from "../components/DeleteProductModal";
import ProductCard from "@/components/ProductCard";
import getDifferenceInDays from "@/utils/getDifferenceInDays";

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
  const [searchedProduct, setSearchedProduct] = useState<string>("");

  function onDeleteProduct(productId: string) {
    setIsToDelete(true);
    setProductIdToDelete(productId);
  }

  const filteredProducts = addedProducts?.filter((product) => {
    const { difInDays } = getDifferenceInDays(product.expDate);

    if (chosenFilter === "all") return true;
    if (chosenFilter === "soon" && difInDays > 0 && difInDays <= 3) return true;
    if (chosenFilter === "fresh" && difInDays > 3) return true;
    if (chosenFilter === "spoilt" && difInDays < 0) return true;
    return false;
  });

  const searchedProducts =
    filteredProducts?.filter((product) => {
      console.log(searchedProduct);
      if (product.name.toLowerCase().startsWith(searchedProduct.toLowerCase()))
        return true;
      return false;
    }) ?? [];

  return (
    <>
      <div className="w-full md:w-fit text-[14px] flex flex-col md:grid md:grid-cols-[3fr_2fr] gap-3">
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
            <div className="relative w-full flex justify-start items-center">
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
              <svg
                onClick={() => setSearchedProduct('')}
                className="absolute right-3 h-4 w-4 hover:fill-[#98a292] cursor-pointer"
                fill="#687063"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path>{" "}
                </g>
              </svg>
              <input
                className="border-[#F4F2ECFA] border-2 rounded-[24px] ml-7 bg-transparent w-full h-8 pl-3"
                type="text"
                placeholder="Поиск..."
                value={searchedProduct}
                onChange={(e) => setSearchedProduct(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`relative flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px] ${onboardingStep === 2 ? "z-40" : ""}`}
      >
        <h2 className="text-[20px] text-[#687063] font-bold flex justify-between">
          В холодильнике
          <span className="bg-[#EDF2E7] rounded-full py-2 px-4 text-sm">
            {addedProducts.length > 0 ? addedProducts.length : 0}
          </span>
        </h2>
        <div className="grid md:min-w-[613px] md:grid-cols-2 gap-2 flex-col md:flex-row">
          {searchedProducts.length > 0 &&
            searchedProducts.map((product) => {
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
