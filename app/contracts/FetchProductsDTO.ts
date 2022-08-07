import { ProductDTO } from "./ProductDTO";

export interface ListProductsDTO {
  total: number;

  count: number;

  products: ProductDTO[];
}
