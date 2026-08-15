import { create } from "zustand";
import { type AddedProductItem, type CustomAddedProductItem } from "@/data/products";

type AddedProduct = AddedProductItem | CustomAddedProductItem;

type AddedProductsType = {
  addedProducts: AddedProduct[] | [];

  addProduct: (product: AddedProduct) => void;
  deleteProduct: (productId: string) => void;
};

const getInitialAddedProducts = (): AddedProduct[] | [] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedProducts = localStorage.getItem("addedProducts");

  if (!storedProducts) {
    return [];
  }

  try {
    const parsedProducts: AddedProductItem[] = JSON.parse(storedProducts);

    return Array.isArray(parsedProducts) ? parsedProducts : [];
  } catch {
    return [];
  }
};

export const useAddedProductStore = create<AddedProductsType>((set) => ({
  addedProducts: getInitialAddedProducts(),

  addProduct: (product) =>
    set((state) => {
      const updatedProducts = [...state.addedProducts, product];
      localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
      return { addedProducts: updatedProducts };
    }),
  deleteProduct: (productId: string) =>
    set((state) => {
      const updatedProducts = state.addedProducts.filter(
        (product) => product.id !== productId,
      );
      localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
      return { addedProducts: updatedProducts };
    }),
}));

export type FilterType = "all" | "fresh" | "soon" | "expired";
