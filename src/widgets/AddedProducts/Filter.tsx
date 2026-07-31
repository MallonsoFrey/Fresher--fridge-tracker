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
  return (
    <ul className="md:text-[12px] w-full items-center leading-none rounded-3xl bg-[#F6F4EE] border-[#F4F2ECFA]   flex gap-3 justify-center">
      {Object.entries(filters).map(([key, label]) => (
        <li
          key={key}
          className={`cursor-pointer p-3 rounded-3xl ${
            chosenFilter === key ? "bg-white font-bold" : "bg-[#F6F4EE]"
          }`}
          onClick={() => setChosenFilter(key as FilterType)}
        >
          {label}
        </li>
      ))}
      <li>
        <AddButton addProduct={() => addProduct(true)} />
      </li>
    </ul>
  );
}
