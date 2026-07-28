import { useState, useMemo, useEffect } from "react";
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

  const productSuggestions: ProductItem[] = useMemo(() => {
    const q = productName.trim().toLowerCase();

    if (!q) return [];

    return productItems
      .filter((product) =>
        product?.name?.[currentLanguage].toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [productName, currentLanguage]);

  useEffect(() => {
    if (!resetKey) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductName("");
    setSelectedProduct(null);
  }, [resetKey]);

  return (
    <div className="relative flex flex-col gap-2 mb-5">
      <label
        htmlFor="product-name"
        className="text-sm text-[#687063] font-bold"
      >
        {labelName}
      </label>
      <input
        ref={firstSearch}
        type="text"
        placeholder={placeholder}
        className="w-full h-12 px-4 text-[#4F574D] placeholder:text-[#4f574dbd] bg-[#F6F4EE] rounded-[24px]"
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
  );
}
