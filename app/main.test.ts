import {
  onePageProductsResult,
  twoPageProductsResult,
} from "../test/helpers/mocks/products";
import { main } from "./main";

describe("test main() method", () => {
  let adapterInstance;

  it("should return expected list", async () => {
    adapterInstance = {
      fetchProducts: jest.fn(async (price) => {
        if (price == 0) {
          return onePageProductsResult;
        }
        return { products: [] };
      }),
    };
    const products = await main(adapterInstance);
    expect(products).toHaveLength(1);
    expect(products).toEqual(onePageProductsResult.products);
  });

  it("should call adapterInstance.fetchProducts as expected", async () => {
    adapterInstance = {
      fetchProducts: jest.fn(async () => onePageProductsResult),
    };
    await main(adapterInstance);
    expect(adapterInstance.fetchProducts).toBeCalledTimes(10);
  });

  it("should return expected list when total_items > count", async () => {
    adapterInstance = {
      fetchProducts: jest.fn(async (price, _, page) => {
        if (price == 0 && (page <= 2 || !page)) {
          return twoPageProductsResult;
        }
        return { products: [] };
      }),
    };
    const products = await main(adapterInstance);
    expect(products).toHaveLength(2);
    expect(products).toEqual([
      ...twoPageProductsResult.products,
      ...twoPageProductsResult.products,
    ]);
  });

  it("should call adapterInstance.fetchProducts expected times when total_items > count", async () => {
    adapterInstance = {
      fetchProducts: jest.fn(async (price, _, page) => {
        if (price == 0 && (page <= 2 || !page)) {
          return twoPageProductsResult;
        }
        return { products: [] };
      }),
    };
    await main(adapterInstance);
    expect(adapterInstance.fetchProducts).toBeCalledTimes(11);
    expect(adapterInstance.fetchProducts).toBeCalledWith(0, 1000);
  });
});
