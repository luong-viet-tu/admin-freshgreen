import { createAsyncThunk } from "@reduxjs/toolkit";
import { deliveryApi } from "../utils/api/deliveryApi";
import { DeliveryType } from "../types/deliveryType";

export const deliveryActions = {
  gets: createAsyncThunk("delivery/gets", async () => {
    try {
      const res = await deliveryApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  delete: createAsyncThunk("delivery/delete", async (id: string) => {
    try {
      const res = await deliveryApi.delete(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  create: createAsyncThunk("delivery/create", async (data: DeliveryType) => {
    try {
      const res = await deliveryApi.create(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
