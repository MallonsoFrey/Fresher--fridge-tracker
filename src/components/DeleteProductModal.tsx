import { useAddedProducts } from "@/store/store";

export default function DeleteProductModal({
  productIdToDelete,
  setIsToDelete,
}: {
  productIdToDelete: string;
  setIsToDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteProduct = useAddedProducts((state) => state.deleteProduct);

  function confirmDeleteProduct() {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
    }
    setIsToDelete(false);
  }

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex text-[#687063] gap-3 flex-col p-5 bg-[#F6F4EE] border-[#F4F2ECFA] border-2 rounded-[24px]">
        <p>Вы уверены, что хотите удалить этот продукт?</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsToDelete(false)}
            className="transition-all duration-300 bg-[_rgba(236,242,230,0.9)] hover:bg-[#687063] hover:text-[_rgba(236,242,230,0.9)] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            Отмена
          </button>
          <button
            onClick={() => confirmDeleteProduct()}
            className="transition-all duration-300 bg-[#9A5752] text-[#F3DDDD] hover:text-[#9A5752] hover:bg-[#F3DDDD] py-2 px-4 rounded-[100px] cursor-pointer"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
