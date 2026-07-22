import { type ProductItem } from "@/data/products";
import getDayWord from "@/utils/getDayWord";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type ProductCardProps = {
  product: ProductItem;
  onDeleteProduct: (id: ProductItem["id"]) => void;
};

export default function ProductCard({
  product,
  onDeleteProduct,
}: ProductCardProps) {
  const currentDate = new Date().getTime();
  const expDate = product.expDate.getTime();
  const timeDif = (expDate - currentDate) / (1000 * 60 * 60 * 24);
  const difInDays = Math.ceil(timeDif);
  const parsedDate = format(new Date(product.expDate), "d MMMM", {
    locale: ru,
  });

  return (
    <div
      key={product.id}
      className="shadow-sm md:min-w-[280px] md:max-w-[300px] text-left w-full h-auto flex items-center gap-3 border-[#F4F2ECFA] border-2 rounded-[24px] bg-[_rgba(255,255,255,0.98)] p-3 text-sm"
    >
      <div className="select-none w-fit rounded-[100px] p-4 bg-[_rgba(236,242,230,0.9)]">
        <span className="flex">{product.emoji}</span>
      </div>
      <div className="flex flex-col gap-1 w-full leading-none">
        <div className="flex justify-between items-center">
          <span className="font-bold">{product.name}</span>
          <span
            onClick={() => onDeleteProduct(product.id)}
            className={`cursor-pointer inline-block h-fit text-[10px] rounded-[100px] py-1 px-2 ${difInDays != null && difInDays < 0 ? "spoilt-delete  text-[#9A5752] bg-[#F3DDDD]" : difInDays != null && difInDays <= 3 ? "soon-delete text-[#866921] bg-[#F5E8BF]" : "fresh-delete text-[#59744D] bg-[#E3EFDA]"}`}
          >
            {difInDays != null && difInDays < 0
              ? "Испортилось"
              : difInDays != null && difInDays <= 3
                ? "Скоро"
                : "Свежее"}
          </span>
        </div>
        <span className="text-xs">
          {difInDays != null && difInDays > 0
            ? `Осталось: ${difInDays} ${getDayWord(difInDays)}`
            : difInDays != null && difInDays == 0
              ? "Испортится сегодня"
              : "Уже испортилось :("}
        </span>
        {difInDays && (
          <span className="text-[8px] text-[#687063]">До: {parsedDate}</span>
        )}
      </div>
    </div>
  );
}
