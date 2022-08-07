import { ListProductsDTO } from "../../../app/contracts/FetchProductsDTO";

export const onePageProductsResult: ListProductsDTO = {
  total: 1000,
  count: 1000,
  products: [
    { price: 1000, name: "test", description: "test", category: "test" },
  ],
};

export const twoPageProductsResult: ListProductsDTO = {
  total: 2000,
  count: 1000,
  products: [
    { price: 1000, name: "test", description: "test", category: "test" },
  ],
};
