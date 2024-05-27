import { DeliveryType } from "../../types/deliveryType";
import axiosClient from "./axiosClient";

export const deliveryApi = {
  create: (data: DeliveryType) => axiosClient.post("/delivery", data),
  delete: (id: string) => axiosClient.delete(`/delivery/${id}`),
  gets: () => axiosClient.get("/delivery"),
};
