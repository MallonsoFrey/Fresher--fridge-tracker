import { useState, useEffect } from "react";
import AddProduct from "@/widgets/AddProduct/AddProduct";
import EmptyFridge from "@widgets/EmptyFridge";
import AddedProducts from "@/widgets/AddedProducts/AddedProducts";
import { useAddedProductStore } from "@/store/productStore";
import ExpDateStats from "@/widgets/ExpDateStats/ExpDateStats";
import AddProductModal from "@/widgets/AddProduct/AddProductModal";

export default function Home() {
  const addedProducts = useAddedProductStore((state) => state.addedProducts);
  const [searchFirstProduct, setSearchFirstProduct] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerHeight > window.innerWidth : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col h-fit md:flex-1 md:flex-row w-full gap-[30px] md:w-fit md:grow">
      {addedProducts.length > 0 ? (
        <div className="flex flex-col gap-[30px]">
          <ExpDateStats /> <AddedProducts />
        </div>
      ) : (
        <EmptyFridge setSearchFirstProduct={setSearchFirstProduct} setIsAddProductOpen={setIsAddProductOpen}/>
      )}
      {isMobile && isAddProductOpen ? (
        <AddProductModal
          isAddProductOpen={isAddProductOpen}
          setIsAddProductOpen={setIsAddProductOpen}
        />
      ) : (
        <AddProduct
          searchFirstProduct={searchFirstProduct}
          setSearchFirstProduct={setSearchFirstProduct}
        />
      )}
    </div>
  );
}
