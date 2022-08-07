import { ApiCommerceAdapter } from "./ApiCommerceAdapter";

describe("test ApiCommerceAdapter", () => {
  describe("test fetchProducts() method", () => {
    let axiosInstance;
    let adapter;
    beforeEach(() => {
      axiosInstance = {
        get: jest.fn((url) => {
          if (url === `products/?page=1&limit=1000&minPrice=-1&maxPrice=-1`) {
            throw new Error("mock_err");
          }
          return { data: { count: 1 } };
        }),
      };
      adapter = new ApiCommerceAdapter(axiosInstance);
    });
    it("should call axios instance with expected data", async () => {
      await adapter.fetchProducts(1, 1000);
      expect(axiosInstance.get).toBeCalledTimes(1);
      expect(axiosInstance.get).toBeCalledWith(
        "products/?page=1&limit=1000&minPrice=1&maxPrice=1000"
      );
    });

    it("should return expected data", async () => {
      const result = await adapter.fetchProducts(1, 1000);
      expect(result.count).toBe(1);
    });

    it("should do expected behaviour with errors", async () => {
      try {
        await adapter.fetchProducts(-1, -1);
      } catch (err) {
        expect(axiosInstance.get).toBeCalledTimes(2);
      }
    });
  });
});
