import { useState, useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { enGB, ru } from "date-fns/locale";
import { productItems, type ProductCatalogItem } from "@/data/products";
import { useAddedProductStore } from "@/store/productStore";
import { useTranslation, Trans } from "react-i18next";
import { useLanguage } from "@/utils/useLanguage";
import getProductStatus from "@/utils/getProductStatus";
import DateInput from "./DateInput";
import ProductInput from "./ProductInput";
import ExpiredProductModal from "./ExpiredProductModal";
import DeleteButton from "@/components/DeleteButton";

type Errors = {
  product?: string;
  date?: string;
};

export default function AddProduct({
  searchFirstProduct,
  setSearchFirstProduct,
  setIsAddProductOpen,
}: {
  searchFirstProduct: boolean;
  setSearchFirstProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddProductOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isExpiredToSave, setIsExpiredToSave] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCatalogItem | null>(null);
  const firstSearch = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const cleanErrors = () => {
    setErrors({ product: "", date: "" });
  };

  const addProduct = useAddedProductStore((state) => state.addProduct);

  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const locale = currentLanguage === "ru" ? ru : enGB;

  useEffect(() => {
    if (!searchFirstProduct) return;

    const timeoutId = window.setTimeout(() => {
      firstSearch.current?.focus();
      setSearchFirstProduct(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [searchFirstProduct, setSearchFirstProduct]);

  const saveProduct = (product: ProductCatalogItem, date: Date) => {
    addProduct({
      ...product,
      expDate: date,
      addedDate: new Date(),
      id: window.crypto.randomUUID(),
    });
    setResetKey((prev) => prev + 1);
  };

  const validateAndSave = () => {
    if (!selectedProduct || !selectedDate) {
      setErrors({
        product: !selectedProduct ? "addProduct.errors.product" : "",
        date: !selectedDate ? "addProduct.errors.date" : "",
      });
      return;
    }

    const { isExpired } = getProductStatus(selectedDate);
    if (isExpired) {
      setIsExpiredToSave(true);
      return;
    }

    cleanErrors();
    saveProduct(selectedProduct, selectedDate);
    if (setIsAddProductOpen) setIsAddProductOpen(false);
  };

  return (
    <>
      <div
        className={`${setIsAddProductOpen ? "flex mx-5 relative" : "hidden"} md:flex w-full h-fit md:max-w-[312px] md:ml-auto flex-col border-[#F4F2ECFA] border-2 rounded-[24px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,242,236,0.98)_100%)] p-5 md:justify-self-end md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2`}
      >
        {setIsAddProductOpen && (
          <DeleteButton
            className={"absolute top-5 right-5 h-8 w-8"}
            onClick={() => setIsAddProductOpen(false)}
            ariaLabel={t("buttons.close")}
          />
        )}
        <div className="mb-5">
          <h2 id="add-product-title" className="text-2xl font-bold">
            {t("addProduct.title")}
          </h2>
          <p className="text-xs">{t("addProduct.subtitle")}</p>
        </div>

        <ProductInput
          labelName={t("addProduct.productName")}
          firstSearch={firstSearch}
          currentLanguage={currentLanguage}
          placeholder={t("addProduct.searchBar")}
          productItems={productItems}
          setSelectedProduct={setSelectedProduct}
          resetKey={resetKey}
        />

        <DateInput
          inputLabel={t("addProduct.productExpDate")}
          locale={locale}
          currentLanguage={currentLanguage}
          calendarAriaLabel={t("addProduct.calendarAriaLabel")}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          resetKey={resetKey}
        />

        <div className="h-[10px] text-[8px] w-full mt-2.5 mb-3">
          {errors.product ? (
            <p className="text-xs text-[#e43b2e]">
              <Trans
                i18nKey={errors.product}
                components={{
                  strong: <span className="font-bold" />,
                }}
              />
            </p>
          ) : errors.date ? (
            <p className="text-xs text-[#e43b2e]">{t(`${errors.date}`)}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => {
            validateAndSave();
          }}
          className="flex justify-center items-center w-full h-6 transition-transform duration-100 ease-in-out active:translate-y-[3px] active:shadow-md active:bg-[#4c6046] hover:shadow-md bg-[#6F8D67] hover:bg-[#4c6046] text-white text-sm py-4 px-5 rounded-[22px]"
        >
          {t("buttons.save")}
        </button>
      </div>
      {isExpiredToSave && (
        <ExpiredProductModal
          onCancel={() => setIsExpiredToSave(false)}
          onConfirm={() => {
            if (!selectedProduct || !selectedDate) {
              return;
            }

            cleanErrors();
            saveProduct(selectedProduct, selectedDate);
            setIsExpiredToSave(false);
          }}
        />
      )}
    </>
  );
}
