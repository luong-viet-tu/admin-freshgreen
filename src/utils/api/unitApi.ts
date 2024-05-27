import { TagActionsType } from "../../actions/tagActions";
import axiosClient from "./axiosClient";

export const unitApi = {
  gets: () => axiosClient.get("/unit"),
  get: (payload: TagActionsType) => axiosClient.get(`/unit/${payload.name}`),
  create: (payload: TagActionsType) => axiosClient.post("/unit", payload),
  delete: (payload: TagActionsType) =>
    axiosClient.patch(`/unit/${payload._id}`),
};
