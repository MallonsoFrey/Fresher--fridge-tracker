import { useState } from "react";
import { useAddedProductStore } from "@/store/productStore";
import DeleteProductModal from "./DeleteProductModal";
import ProductCard from "@/widgets/AddedProducts/ProductCard";
import getDifferenceInDays from "@/utils/getDifferenceInDays";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/useLanguage";
import { type FilterType } from "@/store/productStore";
import Filter from "./Filter";
import Search from "./Search";
import AddProductModal from "@widgets/AddProduct/AddProductModal";

export default function AddedProducts() {
  const addedProducts = useAddedProductStore((state) => state.addedProducts);
  const [isToDelete, setIsToDelete] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null,
  );
  const [chosenFilter, setChosenFilter] = useState<FilterType>("all");
  const [searchedProduct, setSearchedProduct] = useState<string>("");
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const ITEMS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  function onDeleteProduct(productId: string) {
    setIsToDelete(true);
    setProductIdToDelete(productId);
  }

  const filteredProducts = addedProducts?.filter((product) => {
    if (!product.expDate) return false;

    const { difInDays } = getDifferenceInDays(product.expDate, currentLanguage);

    if (chosenFilter === "all") return true;
    if (chosenFilter === "soon" && difInDays >= 0 && difInDays <= 3)
      return true;
    if (chosenFilter === "fresh" && difInDays > 3) return true;
    if (chosenFilter === "expired" && difInDays < 0) return true;
    return false;
  });

  const searchedProducts =
    filteredProducts?.filter((product) =>
      product?.name?.[currentLanguage]
        .toLowerCase()
        .includes(searchedProduct.toLowerCase()),
    ) ?? [];

  const onShowMore = () => {
    if (visibleCount < searchedProducts.length) {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, searchedProducts.length),
      );
    } else {
      setVisibleCount(ITEMS_PER_PAGE);
    }
  };

  const filters: Record<FilterType, string> = {
    all: t("addedProducts.filters.all"),
    fresh: t("addedProducts.filters.fresh"),
    soon: t("addedProducts.filters.soon"),
    expired: t("addedProducts.filters.expired"),
  };

  return (
    <>
      <div className="shadow-[inset_0_8px_10px_-8px_rgba(0,0,0,0.1)] md:shadow-none fixed bottom-0 left-0 z-10 bg-[#f6f4ee] md:bg-transparent p-2 pb-5 md:p-0 md:static w-full text-[14px] flex flex-col md:grid md:grid-cols-[3fr_2fr] gap-2">
        {addedProducts.length > 0 && (
          <>
            <Filter
              chosenFilter={chosenFilter}
              setChosenFilter={setChosenFilter}
              filters={filters}
              addProduct={setIsAddProductOpen}
            />
            <Search
              searchedProduct={searchedProduct}
              setSearchedProduct={setSearchedProduct}
              placeholder={t("addedProducts.search")}
            />
          </>
        )}
      </div>
      <div className="md:mb-20 relative flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <h2 className="text-[20px]   font-bold flex justify-between">
          {t("addedProducts.title")}
        </h2>
        <p className="sr-only" aria-live="polite">
          {t("addedProducts.screenReaderResults", {
            count: searchedProducts.length,
          })}
        </p>
        <div className="grid md:min-w-[613px] md:grid-cols-2 gap-2 flex-col md:flex-row">
          {searchedProducts.length > 0 &&
            searchedProducts.slice(0, visibleCount).map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDeleteProduct={onDeleteProduct}
                />
              );
            })}
          {searchedProducts.length > ITEMS_PER_PAGE && (
            <button
              type="button"
              className="md:col-span-2 flex justify-center"
              onClick={onShowMore}
              aria-label={
                visibleCount >= searchedProducts.length
                  ? t("buttons.showLess")
                  : t("buttons.showMore")
              }
            >
              <svg
                className={`${visibleCount >= searchedProducts.length ? "rotate-180" : ""} cursor-pointer transition-all duration-300 hover:scale-90 col-span-2 h-8 w-8`}
                fill="#687063"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M0 16c0 8.837 7.163 16 16 16s16-7.163 16-16c0-8.836-7.163-16-16-16s-16 7.163-16 16zM30.032 16c0 7.72-6.312 14-14.032 14s-14-6.28-14-14 6.28-14 14-14 14.032 6.28 14.032 14zM14.989 8.99v11.264l-3.617-3.617c-0.39-0.39-1.024-0.39-1.414 0s-0.39 1.023 0 1.414l6.063 5.907 6.063-5.907c0.195-0.195 0.293-0.451 0.293-0.707s-0.098-0.512-0.293-0.707c-0.39-0.39-1.023-0.39-1.414 0l-3.68 3.68v-11.326c0-0.553-0.448-1-1-1s-1.001 0.447-1.001 1z"></path>{" "}
                </g>
              </svg>
            </button>
          )}
        </div>
        {isToDelete && productIdToDelete && (
          <DeleteProductModal
            productIdToDelete={productIdToDelete}
            setIsToDelete={setIsToDelete}
          />
        )}
        {isAddProductOpen && (
          <AddProductModal
            isAddProductOpen={isAddProductOpen}
            setIsAddProductOpen={setIsAddProductOpen}
          />
        )}
      </div>
    </>
  );
}
