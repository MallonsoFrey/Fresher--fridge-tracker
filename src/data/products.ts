import raw from "./products.json";

export type StorageLocation = "fridge" | "freezer";

export type ProductItem = {
  id: string;
  emoji: string;
  name: {
    en: string;
    ru: string;
  };
  category: string;
  storage: StorageLocation[];
};

export type AddedProductItem = ProductItem & {
  id: string;
  expDate: Date;
  addedDate: Date;
};

export type ProductsDataset = {
  version: number;
  locale: "ru" | "en";
  items: ProductItem[];
};

export type ExpirationStatus = "expired" | "soon" | "fresh";

export const products = raw as ProductsDataset;
export const productItems: ProductItem[] = products.items;
