import { type ProductItem } from "@/data/products";
import getDayWord from "@/utils/getDayWord";
import getDifferenceInDays from "@/utils/getDifferenceInDays";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@/components/DeleteIcon";
import getProductStatus from "@/utils/getProductStatus";

type ProductCardProps = {
  product: ProductItem;
  onDeleteProduct: (id: ProductItem["id"]) => void;
};

export default function ProductCard({
  product,
  onDeleteProduct,
}: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("ru") ? "ru" : "en";

  const { difInDays, parsedDate } = getDifferenceInDays(
    product.expDate,
    currentLanguage,
  );

  const { isExpired, isSoon } = getProductStatus(product.expDate);

  let statusText: string;
  let statusClass: string;

  if (isExpired) {
    statusText = t("productCard.status.expired");
    statusClass = "spoilt-delete  text-[#9A5752] bg-[#F3DDDD]";
  } else if (isSoon) {
    statusText = t("productCard.status.soon");
    statusClass = "soon-delete text-[#866921] bg-[#F5E8BF]";
  } else {
    //isFresh - difInDays > 3
    statusText = t("productCard.status.fresh");
    statusClass = "fresh-delete text-[#59744D] bg-[#E3EFDA]";
  }

  let expiresText: string;

  if (isExpired) {
    expiresText = t("productCard.expires.expired");
  } else if (difInDays === 0) {
    expiresText = t("productCard.expires.today");
  } else {
    expiresText = `${t("productCard.expires.left")} ${difInDays} ${getDayWord(difInDays, currentLanguage)}`;
  }

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
          <span className="font-bold">{product.name[currentLanguage]}</span>
          <div className="flex gap-1 items-end">
            <span
              className={`inline-block h-fit text-[10px] rounded-[100px] py-1 px-2 ${statusClass}`}
            >
              {statusText}
            </span>
            <DeleteIcon onDeleteProduct={() => onDeleteProduct(product.id)} />
          </div>
        </div>
        <span className="text-xs">{expiresText}</span>
        {parsedDate && (
          <span className="text-[8px] text-[#687063]">
            {t("productCard.expires.until")} {parsedDate}
          </span>
        )}
      </div>
    </div>
  );
}
