import axios from "axios";
import { envs } from "./constants/environments";
import { vars } from "./constants/variables";
import { ProductDTO } from "./contracts/ProductDTO";
import { ApiCommerceAdapter } from "./service/ApiCommerceAdapter";

/**
 * Fetches all products from API
 * @param apiCommerceAdapter adapter for API from where need to fetch data
 * @returns total products from API
 */
export async function main(apiCommerceAdapter: ApiCommerceAdapter) {
  const products: ProductDTO[] = [];
  for (let price = 0; price < 10000; price += vars.PRICE_STEP) {
    // fetches products with price range
    const productsList = await apiCommerceAdapter.fetchProducts(
      price,
      price + vars.PRICE_STEP
    );

    // pushes received products to products list
    products.push(...productsList.products);

    // calculates amount of pages
    const totalIterations = Math.round(
      productsList.total / vars.PRODUCTS_MAX_LIMIT
    );

    // if total > count then do the loop for next pages
    for (let page = 2; page <= totalIterations; page++) {
      const nextProductsList = await apiCommerceAdapter.fetchProducts(
        price,
        price + 1000,
        page
      );
      products.push(...nextProductsList.products);
    }
  }

  return products;
}

const adapter = new ApiCommerceAdapter(
  axios.create({
    baseURL: envs.BASE_URL,
    timeout: 1000,
  })
);
