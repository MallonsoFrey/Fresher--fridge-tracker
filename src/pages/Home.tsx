import AddProduct from "@widgets/AddProduct";
import EmptyFridge from "@widgets/EmptyFridge";
import AddedProducts from "@/widgets/AddedProducts";
import { useAddedProducts } from "@/store/addedProductsStore";
import ExpDateStats from "@/widgets/ExpDateStats";

export default function Home() {
  const addedProducts = useAddedProducts((state) => state.addedProducts);

  return (
    <div className="flex flex-col md:flex-row w-full gap-[30px] md:w-fit md:grow">
      {addedProducts.length > 0 ? (
        <div className="flex flex-col gap-[30px]">
          <ExpDateStats /> <AddedProducts />
        </div>
      ) : (
        <EmptyFridge />
      )}
      <AddProduct />
    </div>
  );
}
