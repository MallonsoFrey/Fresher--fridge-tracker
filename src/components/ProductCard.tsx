import { type ProductItem } from "@/data/products";
import getDayWord from "@/utils/getDayWord";
import getDifferenceInDays from "@/utils/getDifferenceInDays";

type ProductCardProps = {
  product: ProductItem;
  onDeleteProduct: (id: ProductItem["id"]) => void;
};

export default function ProductCard({
  product,
  onDeleteProduct,
}: ProductCardProps) {
  const { difInDays, parsedDate } = getDifferenceInDays(product.expDate);

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
          <div className="flex gap-1 items-end">
            <span
              className={`inline-block h-fit text-[10px] rounded-[100px] py-1 px-2 ${difInDays != null && difInDays < 0 ? "spoilt-delete  text-[#9A5752] bg-[#F3DDDD]" : difInDays != null && difInDays <= 3 ? "soon-delete text-[#866921] bg-[#F5E8BF]" : "fresh-delete text-[#59744D] bg-[#E3EFDA]"}`}
            >
              {difInDays != null && difInDays < 0
                ? "Испортилось"
                : difInDays != null && difInDays <= 3
                  ? "Скоро"
                  : "Свежее"}
            </span>
            <svg
              onClick={() => onDeleteProduct(product.id)}
              className="h-4 w-4 hover:fill-[#98a292] cursor-pointer"
              fill="#687063"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path>{" "}
              </g>
            </svg>
          </div>
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
