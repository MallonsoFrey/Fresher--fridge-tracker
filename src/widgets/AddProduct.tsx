import { useMemo, useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isValid, parse } from "date-fns";
import { enGB, ru } from "date-fns/locale";
import { maskDateInput } from "@/utils/maskDateInput";
import { productItems, type ProductItem } from "@/data/products";
import { useAddedProducts } from "@/store/store";
import { useOnboardingStore } from "@/store/store";
import { useTranslation, Trans } from "react-i18next";

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const lastValidDateInputRef = useRef("");
  const [month, setMonth] = useState(new Date());
  const [dateValue, setDateValue] = useState("");
  const [productName, setProductName] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );
  const firstSeach = useRef<HTMLInputElement | null>(null);
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
    firstSeach.current?.focus();
  };

  useEffect(() => {
    if (!searchFirstProduct) return;

    const timeoutId = window.setTimeout(() => {
      if (window.innerWidth < window.innerHeight) {
        scrollDown();
      } else {
        if (onboardingStep === 0) setNextStep(1);
        firstSeach.current?.focus();
      }

      setSearchFirstProduct(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [searchFirstProduct]);

  const productSuggestions: ProductItem[] = useMemo(() => {
    const q = productName.trim().toLowerCase();

    if (!q) return [];

    return productItems
      .filter((product) =>
        product?.name?.[currentLanguage].toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [productName, currentLanguage]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setDateValue("");
      lastValidDateInputRef.current = "";
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      const masked = format(date, "dd/MM/yyyy");
      lastValidDateInputRef.current = masked;
      setDateValue(masked);
    }
    setIsCalendarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, isComplete } = maskDateInput(e.target.value);

    if (!isComplete) {
      setDateValue(masked);
      setSelectedDate(undefined);
      return;
    }

    const parsedDate = parse(masked, "dd/MM/yyyy", new Date());

    const strictlyMatchesMask =
      isValid(parsedDate) && format(parsedDate, "dd/MM/yyyy") === masked;

    if (!strictlyMatchesMask) {
      setDateValue(lastValidDateInputRef.current);
      setSelectedDate(
        lastValidDateInputRef.current
          ? parse(lastValidDateInputRef.current, "dd/MM/yyyy", new Date())
          : undefined,
      );
      return;
    }

    lastValidDateInputRef.current = masked;
    setDateValue(masked);
    setSelectedDate(parsedDate);
    setMonth(parsedDate);
  };

  const toggleCalender = () => setIsCalendarOpen((prev) => !prev);
  const calendarLabel = `Calendar, ${format(month, "MMMM yyyy")}`;

  useEffect(() => {
    if (onboardingStep === 1) setNextStep(2);

    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        isCalendarOpen
      ) {
        toggleCalender();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const validateAndSave = () => {
    if (selectedProduct && selectedDate) {
      cleanErrors();
      addProduct({
        ...selectedProduct,
        expDate: selectedDate,
        addedDate: new Date(),
      });
      setProductName("");
      setDateValue("");
      setSelectedDate(undefined);
      setMonth(new Date());
      setSelectedProduct(null);
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

        <div className="relative flex flex-col gap-2 mb-5">
          <label
            htmlFor="product-name"
            className="text-sm text-[#687063] font-bold"
          >
            {t("addProduct.productName")}
          </label>
          <input
            ref={firstSeach}
            type="text"
            placeholder={t("addProduct.searchBar")}
            className="w-full h-12 px-4 text-sm text-[#4F574D] placeholder:text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              setIsSuggestionsOpen(true);
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            onBlur={() => {
              window.setTimeout(() => setIsSuggestionsOpen(false), 0);
            }}
          />
          {isSuggestionsOpen && productSuggestions.length > 0 && (
            <div className="absolute z-40 top-full mt-2 w-full rounded-[16px] border border-[#F6F4EE] bg-white shadow-lg overflow-hidden">
              {productSuggestions.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  className="w-full text-left px-4 py-2 text-sm text-[#4F574D] hover:bg-[#ECF2E6] flex items-center gap-2"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setProductName(p.name[currentLanguage]);
                    setSelectedProduct(p);
                    setIsSuggestionsOpen(false);
                  }}
                >
                  <span>{p.emoji}</span>
                  <span>{p.name[currentLanguage]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={calendarRef} className="relative flex flex-col gap-2">
          <label
            htmlFor="expiry-date"
            className="text-sm text-[#687063] font-bold"
          >
            {t("addProduct.productExpDate")}
          </label>
          <input
            className="w-full h-12 px-4 text-sm text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
            id="date-input"
            type="text"
            value={dateValue}
            placeholder={currentLanguage === "ru" ? "дд/мм/гггг" : "dd/mm/yyyy"}
            onChange={handleInputChange}
          />
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCalender();
            }}
            aria-expanded={isCalendarOpen}
            aria-label={t("addProduct.calendarAriaLabel")}
            className="cursor-pointer absolute w-5 h-5 right-4 bottom-3.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                  stroke="#4F574D"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </g>
            </svg>
          </span>
          {isCalendarOpen && (
            <div className="absolute z-50 md:mt-2 w-max rounded-[16px] border border-[#F6F4EE] bg-white shadow-lg p-2 top-full left-0">
              <DayPicker
                locale={locale}
                weekStartsOn={1}
                mode="single"
                month={month}
                onMonthChange={setMonth}
                autoFocus
                role="application"
                aria-label={calendarLabel}
                selected={selectedDate}
                onSelect={handleDayPickerSelect}
              />
            </div>
          )}
        </div>

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
            if (onboardingStep === 1) setNextStep(2);
            validateAndSave();
          }}
          className="flex justify-center items-center w-full h-6 transition-transform duration-100 ease-in-out active:translate-y-[3px] active:shadow-md active:bg-[#4c6046] hover:shadow-md bg-[#6F8D67] hover:bg-[#4c6046] text-white text-sm py-4 px-5 rounded-[22px]"
        >
          {t("buttons.save")}
        </button>
      </div>
      <button
        className={`md:hidden ${addedProducts.length > 1 ? "" : "hidden"} block fixed z-40 bottom-4 right-4 h-20 w-20 opacity-[0.8]`}
        onClick={() => scrollDown()}
      >
        <svg
          viewBox="-2.4 -2.4 28.80 28.80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#59744d"
        >
          <g
            id="SVGRepo_bgCarrier"
            stroke-width="0"
            transform="translate(3.6000000000000014,3.6000000000000014), scale(0.7)"
          >
            <rect
              x="-2.4"
              y="-2.4"
              width="28.80"
              height="28.80"
              rx="14.4"
              fill="#e3efda"
              strokeWidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M12 8V16M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#59744d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
      {onboardingStep === 1 && (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center">
          <div className="relative md:left-[34vw] md:top-[25vh] top-[15vh] w-[calc(100%-30px)] md:w-[350px] flex text-[#687063] gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
            <p className="font-bold">
              {t("addProduct.onboarding.description")}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  if (onboardingStep === 1) setNextStep(2);
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
