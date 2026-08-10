import { useTranslation } from "react-i18next";
import type { FilterType } from "@/store/productStore";
import AddButton from "@/components/AddButton";

type FilterProps = {
  chosenFilter: FilterType;
  setChosenFilter: (filter: FilterType) => void;
  filters: Record<FilterType, string>;
  addProduct: (arg: boolean) => void;
};

export default function Filter({
  chosenFilter,
  setChosenFilter,
  filters,
  addProduct,
}: FilterProps) {
  const { t } = useTranslation();

  return (
    <ul className="h-11 md:h-auto md:w-fit w-full md:text-[12px] items-center leading-none rounded-3xl bg-[#F6F4EE] border-[#F4F2ECFA] flex gap-1 md:gap-3 md:justify-center">
      {Object.entries(filters).map(([key, label]) => (
        <li key={key}>
          <button
            type="button"
            aria-pressed={chosenFilter === key}
            onClick={() => setChosenFilter(key as FilterType)}
            className={`p-3 rounded-3xl transition-colors ${
              chosenFilter === key ? "bg-white font-bold" : "bg-[#F6F4EE] hover:bg-[#eef5e8]"
            }`}
          >
            {label}
          </button>
        </li>
      ))}
      <li className="ml-auto">
        <AddButton
          className={"justify-self-end"}
          addProduct={() => addProduct(true)}
          ariaLabel={t("buttons.addProduct")}
        />
      </li>
    </ul>
  );
}
