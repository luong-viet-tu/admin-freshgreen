import { CategoryType } from "../../types/categoryType";
import axiosClient from "./axiosClient";

export const categoryApi = {
  create: (payload: CategoryType) => axiosClient.post("/categories", payload),

  update: (payload: CategoryType) =>
    axiosClient.put(`/categories${payload._id}`, payload),
  gets: () => axiosClient.get("/categories"),
  get: (payload: CategoryType) =>
    axiosClient.get(`/categories/${payload.name}`),

  delete: (payload: CategoryType) =>
    axiosClient.patch(`/categories/${payload._id}`),
};
