import { create } from "zustand";
import { type ProductItem } from "@/data/products";

type AddedProductsType = {
  addedProducts: ProductItem[];

  addProduct: (product: ProductItem) => void;
  deleteProduct: (productId: string) => void;
};

export const useAddedProducts = create<AddedProductsType>((set) => ({
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
