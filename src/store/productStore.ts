import { create } from "zustand";
import { type AddedProductItem } from "@/data/products";

type AddedProductsType = {
  addedProducts: AddedProductItem[];

  addProduct: (product: AddedProductItem) => void;
  deleteProduct: (productId: string) => void;
};

export const useAddedProductStore = create<AddedProductsType>((set) => ({
  addedProducts: [],

  addProduct: (product) =>
    set((state) => ({
      addedProducts: [...state.addedProducts, product],
    })),
  deleteProduct: (productId: string) =>
    set((state) => ({
      addedProducts: state.addedProducts.filter(
        (product) => product.id !== productId,
      ),
    })),
}));

export type FilterType = "all" | "fresh" | "soon" | "expired";
