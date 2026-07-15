import { useMemo, useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isValid, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { maskDateInput } from "@/utils/maskDateInput";
import { productItems, type ProductItem } from "@/data/products";
import { useAddedProducts } from "@/store/addedProductsStore";

export default function AddProduct() {
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

  const addProduct = useAddedProducts((state) => state.addProduct);

  const productSuggestions: ProductItem[] = useMemo(() => {
    const q = productName.trim().toLowerCase();
    if (!q) return [];
    return productItems
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [productName]);

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

  return (
    <div className="w-full h-fit md:max-w-[312px] h-auto flex flex-col gap-5 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,242,236,0.98)_100%)] p-5 md:justify-self-end md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
      <div>
        <h2 className="text-2xl text-[#687063] font-bold">Добавить продукт</h2>

        <p className="text-xs text-[#687063]">Сохраняйте продукты свежими.</p>
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="product-name"
          className="text-sm text-[#687063] font-bold"
        >
          Название
        </label>
        <input
          type="text"
          placeholder="Введите название"
          className="w-full h-12 px-4 text-sm text-[#4F574D] placeholder:text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
            setIsSuggestionsOpen(true);
          }}
          onFocus={() => setIsSuggestionsOpen(true)}
          onBlur={() => {
            // Give the click on a suggestion time to register
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
                  setProductName(p.name);
                  setSelectedProduct(p);
                  setIsSuggestionsOpen(false);
                }}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <label
          htmlFor="expiry-date"
          className="text-sm text-[#687063] font-bold"
        >
          Срок годности
        </label>
        <input
          className="w-full h-12 px-4 text-sm text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
          id="date-input"
          type="text"
          value={dateValue}
          placeholder="дд/мм/гггг"
          onChange={handleInputChange}
        />
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCalender();
          }}
          aria-expanded={isCalendarOpen}
          aria-label="Откройте календарь и выберите дату"
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
          <div
            ref={calendarRef}
            className="absolute z-50 mt-2 w-max rounded-[16px] border border-[#F6F4EE] bg-white shadow-lg p-2 top-full left-0"
          >
            <DayPicker
              locale={ru}
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

      <button
        onClick={() => {
          if (selectedProduct && selectedDate) {
            addProduct({ ...selectedProduct, expDate: selectedDate });
            setProductName("");
            setDateValue("");
            setSelectedDate(undefined);
            setMonth(new Date());
          }
        }}
        className="flex justify-center items-center w-full h-6 transition-transform duration-100 ease-in-out active:translate-y-[3px] active:shadow-md active:bg-[#4c6046] hover:shadow-md bg-[#6F8D67] hover:bg-[#4c6046] text-white text-sm py-4 px-5 rounded-[22px]"
      >
        Сохранить
      </button>
    </div>
  );
}
