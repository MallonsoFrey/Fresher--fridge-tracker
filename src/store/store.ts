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

type Step = 0 | 1 | 2;
interface OnboardingState {
  currentStep: Step;
  completed: boolean;

  nextStep: (step: Step) => void;
  completeOnboarding: () => void;
}

/* 
currentStep: 1 - pressed button "add first product"
currentStep: 2 - first product added after pressing button "add first product"
*/

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  completed: false,

  nextStep: (step: Step) => set(() => ({ currentStep: step })),
  completeOnboarding: () => set({ completed: true }),
}));
