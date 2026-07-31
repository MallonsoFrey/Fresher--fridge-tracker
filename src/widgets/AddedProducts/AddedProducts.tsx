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
import AddProductModal from "./AddProductModal";

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

  const filters: Record<FilterType, string> = {
    all: t("addedProducts.filters.all"),
    fresh: t("addedProducts.filters.fresh"),
    soon: t("addedProducts.filters.soon"),
    expired: t("addedProducts.filters.expired"),
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 bg-[#f6f4ee] p-3 md:p-0 md:static w-full md:w-fit text-[14px] flex flex-col md:grid md:grid-cols-[3fr_2fr] gap-3">
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
      <div className="relative flex gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <h2 className="text-[20px]   font-bold flex justify-between">
          {t("addedProducts.title")}
          {/* <span className="bg-[#EDF2E7] rounded-full py-2 px-4 text-sm">
            {addedProducts.length > 0 ? addedProducts.length : 0}
          </span> */}
        </h2>
        <div className="grid md:min-w-[613px] md:grid-cols-2 gap-2 flex-col md:flex-row">
          {searchedProducts.length > 0 &&
            searchedProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
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
