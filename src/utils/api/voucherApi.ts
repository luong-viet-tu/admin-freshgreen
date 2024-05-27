import { VoucherActionsType } from "../../actions/voucherActions";
import axiosClient from "./axiosClient";

export const voucherApi = {
  gets: () => axiosClient.get("/vouchers"),
  get: (payload: VoucherActionsType) =>
    axiosClient.get(`/vouchers/${payload.voucher}`),
  create: (payload: VoucherActionsType) =>
    axiosClient.post("/vouchers", payload),
  update: (payload: VoucherActionsType) =>
    axiosClient.put(`/vouchers/${payload._id}`, payload),
  delete: (payload: VoucherActionsType) =>
    axiosClient.patch(`/vouchers/${payload._id}`),
};
