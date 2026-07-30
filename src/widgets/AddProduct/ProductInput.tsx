import { useState, useMemo, useEffect, useCallback } from "react";
import type { ProductItem } from "@/data/products";

type ProductInputProps = {
  firstSearch: React.Ref<HTMLInputElement> | null;
  placeholder: string;
  labelName: string;
  currentLanguage: keyof ProductItem["name"];
  productItems: ProductItem[];
  setSelectedProduct: (arg: ProductItem | null) => void;
  resetKey: number;
};

export default function ProductInput({
  firstSearch,
  currentLanguage,
  productItems,
  labelName,
  placeholder,
  setSelectedProduct,
  resetKey,
}: ProductInputProps) {
  const [productName, setProductName] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const chooseSuggestion = useCallback((p: ProductItem) => {
    setProductName(p.name[currentLanguage]);
    setSelectedProduct(p);
    setIsSuggestionsOpen(false);
    setActiveIndex(-1);
  }, [currentLanguage, setSelectedProduct]);

  const productSuggestions: ProductItem[] = useMemo(() => {
    const q = productName.trim().toLowerCase();

    if (!q) return [];

    return productItems
      .filter((product) =>
        product?.name?.[currentLanguage].toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [productName, currentLanguage, productItems]);

  useEffect(() => {
    if (!resetKey) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductName("");
    setSelectedProduct(null);
  }, [resetKey, setSelectedProduct]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isSuggestionsOpen || productSuggestions.length === 0) {
        return;
      }

      if (productSuggestions.length > 0) {
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault();
            setActiveIndex((prev) => (prev === -1 ? -1 : prev - 1));
            break;

          case "ArrowDown":
            event.preventDefault();
            setActiveIndex((prev) =>
              prev === productSuggestions.length - 1
                ? productSuggestions.length - 1
                : prev + 1,
            );
            break;

          case "Enter":
            if (activeIndex !== -1) {
              event.preventDefault();
              chooseSuggestion(productSuggestions[activeIndex]);
            }
            break;

          case "Escape":
            setIsSuggestionsOpen(false);
            setActiveIndex(-1);
            break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, productSuggestions, chooseSuggestion, isSuggestionsOpen]);

  return (
    <div className="relative flex flex-col gap-2 mb-5">
      <label htmlFor="product-name" className="text-sm   font-bold">
        {labelName}
      </label>
      <input
        role="combobox"
        aria-expanded={isSuggestionsOpen}
        aria-controls="product-suggestions"
        aria-activedescendant={
          activeIndex >= 0
            ? `product-suggestion-${productSuggestions[activeIndex].id}`
            : undefined
        }
        ref={firstSearch}
        type="text"
        placeholder={placeholder}
        className="w-full h-12 md:text-sm px-4 text-[#4F574D] placeholder:text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
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
        <div
          id="product-suggestions"
          role="listbox"
          className="absolute z-40 top-full mt-2 w-full rounded-[16px] border border-[#F6F4EE] bg-white shadow-lg overflow-hidden"
        >
          {productSuggestions.map((p, index) => (
            <button
              id={`product-suggestion-${p.id}`}
              role="option"
              aria-selected={activeIndex === index}
              type="button"
              key={p.id}
              className={`${activeIndex === index ? "bg-[#eaf3e3]" : ""} w-full text-left px-4 py-2 text-sm text-[#4F574D] hover:bg-[#ECF2E6] flex items-center gap-2`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => chooseSuggestion(p)}
            >
              <span>{p.emoji}</span>
              <span>{p.name[currentLanguage]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
