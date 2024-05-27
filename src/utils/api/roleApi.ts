import { RoleActionsType } from "../../actions/roleActions";
import axiosClient from "./axiosClient";

export const roleApi = {
  gets: () => axiosClient.get("/role"),
  get: (payload: RoleActionsType) => axiosClient.get(`/role/${payload._id}`),
  create: (payload: RoleActionsType) => axiosClient.post("/role", payload),
  update: (payload: RoleActionsType) =>
    axiosClient.put(`/role/${payload._id}`, payload),
  delete: (payload: RoleActionsType) =>
    axiosClient.delete(`/role/${payload._id}`),
};
