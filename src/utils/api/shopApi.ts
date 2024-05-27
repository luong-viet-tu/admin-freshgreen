import { ShopType } from "../../types/shopType";
import axiosClient from "./axiosClient";

export const shopAPI = {
  gets: () => axiosClient.get("/shops"),
  get: (id: string) => axiosClient.get(`/shops/${id}`),
  create: (newShop: ShopType) => axiosClient.post("/shops/create", newShop),
  update: (newShop: ShopType) => axiosClient.put(`/shops/${newShop._id}`),
  delete: (id: string) => axiosClient.patch(`/shops/${id}`),
};
