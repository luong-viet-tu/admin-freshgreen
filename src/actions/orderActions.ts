import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../utils/api/orderApi";
import { OrderStatus } from "../types/orderType";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export interface SubmitProps {
  adminId: string;
  orderId: string;
  userId: string;
  status: OrderStatus.access | OrderStatus.refuse;
  message?: string;
}

export const orderActions = {
  gets: createAsyncThunk("order/gets", async (id: string) => {
    try {
      const res = await orderApi.gets(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  submitStatusOrder: createAsyncThunk<
    { orderId: string; status: OrderStatus.access; message?: string },
    SubmitProps
  >("order/status", async ({ adminId, userId, orderId, status, message }) => {
    try {
      const res = await orderApi.statusOrder({
        adminId,
        userId,
        orderId,
        status:
          status === OrderStatus.access
            ? OrderStatus.access
            : OrderStatus.refuse,
        message,
      });
      NotificationToast({
        message: `${
          status === OrderStatus.access ? "Xác nhận" : "Từ chối"
        } đơn hàng thành công`,
        type: "success",
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
