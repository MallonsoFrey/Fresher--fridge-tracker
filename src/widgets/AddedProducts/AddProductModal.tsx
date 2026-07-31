import { useState } from "react";
import AddProduct from "../AddProduct/AddProduct";

export default function AddProductModal({
  setIsAddProductOpen,
}: {
  isAddProductOpen: boolean;
  setIsAddProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchFirstProduct, setSearchFirstProduct] = useState(false);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <AddProduct
        searchFirstProduct={searchFirstProduct}
        setSearchFirstProduct={setSearchFirstProduct}
        setIsAddProductOpen={setIsAddProductOpen}
      />
    </div>
  );
}
