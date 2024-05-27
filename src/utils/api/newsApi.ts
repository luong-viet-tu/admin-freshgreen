import { NewNewsType, NewsType } from "../../types/newsType";
import axiosClient from "./axiosClient";

export const newsApi = {
  gets: () => axiosClient.get("/news"),
  create: (payload: NewNewsType) =>
    axiosClient.post<NewsType>("/news/create", payload),

  update: (payload: NewNewsType) =>
    axiosClient.put(`/news/${payload._id}`, payload),

  delete: (id: string) => axiosClient.patch(`/news/${id}`),
};
