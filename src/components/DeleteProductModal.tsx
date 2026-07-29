import { useAddedProductStore } from "@/store/productStore";
import { useTranslation } from "react-i18next";

export default function DeleteProductModal({
  productIdToDelete,
  setIsToDelete,
}: {
  productIdToDelete: string;
  setIsToDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteProduct = useAddedProductStore((state) => state.deleteProduct);

  function confirmDeleteProduct() {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
    }
    setIsToDelete(false);
  }

  const { t } = useTranslation();

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex   gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <p>{t("deleteProductModal.description")}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsToDelete(false)}
            className="transition-all duration-300 hover:bg-[_rgba(236,242,230,0.9)] hover:  text-[_rgba(236,242,230,0.9)] bg-[#687063] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            {t("buttons.cancel")}
          </button>
          <button
            onClick={() => confirmDeleteProduct()}
            className="transition-all duration-300 bg-[#9A5752] text-[#F3DDDD] hover:text-[#9A5752] hover:bg-[#F3DDDD] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            {t("buttons.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
