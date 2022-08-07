import { AxiosInstance } from "axios";
import { envs } from "../constants/environments";
import { ListProductsDTO } from "../contracts/FetchProductsDTO";

export class ApiCommerceAdapter {
  constructor(private readonly axios: AxiosInstance) {}

  /**
   * Fetches products from API
   * @param minPrice minimal price to fetch products from API
   * @param maxPrice maximum price range to fetch products from API
   * @param page page number of the list
   * @returns list of products
   */
  public async fetchProducts(
    minPrice: number,
    maxPrice: number,
    page: number = 1
  ) {
    for (let i = 0; i < envs.MAX_ERR_ATTEMPS; i++) {
      try {
        const { data } = await this.axios.get<ListProductsDTO>(
          `products/?page=${page}&limit=1000&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        return data;
      } catch (err) {}
    }
    throw new Error();
  }
}
