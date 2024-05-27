import { NewProductType, ProductType } from "../../types/productType";
import axiosClient from "./axiosClient";

export const productApi = {
  gets: () => axiosClient.get("/products?limit=admin"),
  get: (product: ProductType) => axiosClient.get(`/products/${product._id}`),
  create: (newProduct: NewProductType) =>
    axiosClient.post("/products/create", newProduct),
  update: (newProduct: NewProductType) => {
console.log(newProduct)
   return axiosClient.put(`/products/${newProduct._id}`, newProduct)
  },
  delete: (id: string) => axiosClient.patch(`/products/${id}`),
};
