import { SubmitProps } from "../../actions/orderActions";
import axiosClient from "./axiosClient";

export const orderApi = {
  gets: (adminId: string) => axiosClient.get(`/orders/admin/${adminId}`),
  statusOrder: ({
    userId,
    orderId,
    status,
    message = "",
    adminId,
  }: SubmitProps) =>
    axiosClient.put(`/orders/${orderId}/user/${userId}`, {
      adminId,
      status,
      message,
    }),
};
