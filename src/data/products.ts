import raw from "./products.json";

export type StorageLocation = "fridge" | "freezer";
export type ExpirationStatus = "expired" | "soon" | "fresh";

export type ProductCatalogItem = {
  id: string;
  emoji: string;
  name: {
    en: string;
    ru: string;
  };
  category: string;
  storage: StorageLocation[];
};

export type ProductsDataset = {
  version: number;
  items: ProductCatalogItem[];
};

export const catalog: ProductsDataset = raw as ProductsDataset;
export const productItems: ProductCatalogItem[] = catalog.items;

export type AddedProductItem = ProductCatalogItem & {
  id: string;
  expDate: Date;
  addedDate: Date;
};

export type CustomProductItem = Omit<
  ProductCatalogItem,
  "id" | "category" | "storage"
>;

export type CustomAddedProductItem = CustomProductItem & {
  id: string;
  expDate: Date;
  addedDate: Date;
};
