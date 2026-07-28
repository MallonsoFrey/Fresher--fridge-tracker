import { useState, useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { enGB, ru } from "date-fns/locale";
import { productItems, type ProductItem } from "@/data/products";
import { useAddedProducts } from "@/store/store";
import { useOnboardingStore } from "@/store/store";
import { useTranslation, Trans } from "react-i18next";
import AddButton from "@/components/AddButton";
import DateInput from "./DateInput";
import ProductInput from "./ProductInput";
import Onboarding from "./Onboarding";

type Errors = {
  product?: string;
  date?: string;
};

export default function AddProduct({
  searchFirstProduct,
  setSearchFirstProduct,
}: {
  searchFirstProduct: boolean;
  setSearchFirstProduct: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [resetKey, setResetKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );
  const firstSearch = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const cleanErrors = () => {
    setErrors({ product: "", date: "" });
  };

  const addProduct = useAddedProducts((state) => state.addProduct);
  const addedProducts = useAddedProducts((state) => state.addedProducts);
  const onboardingStep = useOnboardingStore((state) => state.currentStep);
  const setNextStep = useOnboardingStore((state) => state.nextStep);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("ru") ? "ru" : "en";
  const locale = i18n.language === "ru" ? ru : enGB;

  const scrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    firstSearch.current?.focus();
  };

  useEffect(() => {
    if (!searchFirstProduct) return;

    const timeoutId = window.setTimeout(() => {
      if (window.innerWidth < window.innerHeight) {
        scrollDown();
      } else {
        if (onboardingStep === 0) setNextStep(1);
        firstSearch.current?.focus();
      }

      setSearchFirstProduct(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [searchFirstProduct]);

  const validateAndSave = () => {
    if (selectedProduct && selectedDate) {
      cleanErrors();
      addProduct({
        ...selectedProduct,
        expDate: selectedDate,
        addedDate: new Date(),
      });
      setResetKey((prev) => prev + 1);
    } else {
      setErrors({
        product: !selectedProduct ? "addProduct.errors.product" : "",
        date: !selectedDate ? "addProduct.errors.date" : "",
      });
    }
  };

  return (
    <>
      <div
        className={`w-full h-fit md:max-w-[312px] md:ml-auto flex flex-col border-[#F4F2ECFA] border-2 rounded-[24px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,242,236,0.98)_100%)] p-5 md:justify-self-end md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 ${onboardingStep === 1 ? "z-30" : ""}`}
      >
        <div className="mb-5">
          <h2 className="text-2xl text-[#687063] font-bold">
            {t("addProduct.title")}
          </h2>

          <p className="text-xs text-[#687063]">{t("addProduct.subtitle")}</p>
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
          onClick={() => {
            if (onboardingStep === 1) {
              setNextStep(2);
            }
            validateAndSave();
          }}
          className="flex justify-center items-center w-full h-6 transition-transform duration-100 ease-in-out active:translate-y-[3px] active:shadow-md active:bg-[#4c6046] hover:shadow-md bg-[#6F8D67] hover:bg-[#4c6046] text-white text-sm py-4 px-5 rounded-[22px]"
        >
          {t("buttons.save")}
        </button>
      </div>
      <AddButton
        addedProductsLength={addedProducts.length}
        onClick={() => scrollDown()}
      />
      {onboardingStep === 1 && (
        <Onboarding
          description={t("addProduct.onboarding.description")}
          onboardingStep={onboardingStep}
          setNextStep={() => setNextStep(2)}
        />
      )}
    </>
  );
}
