import { create } from "zustand";
import { type AddedProductItem } from "@/data/products";

type AddedProductsType = {
  addedProducts: AddedProductItem[] | [];

  addProduct: (product: AddedProductItem) => void;
  deleteProduct: (productId: string) => void;
};

const getInitialAddedProducts = (): AddedProductItem[] | [] => {
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
