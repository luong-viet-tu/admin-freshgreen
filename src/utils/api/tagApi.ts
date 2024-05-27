import { TagActionsType } from "../../actions/tagActions";
import axiosClient from "./axiosClient";

export const tagApi = {
  gets: () => axiosClient.get("/tags"),
  get: (payload: TagActionsType) => axiosClient.get(`/tags/${payload.name}`),
  create: (payload: TagActionsType) => axiosClient.post("/tags", payload),
  delete: (payload: TagActionsType) =>
    axiosClient.patch(`/tags/${payload._id}`),
};
