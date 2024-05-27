import { createAsyncThunk } from "@reduxjs/toolkit";
import { voucherApi } from "../utils/api/voucherApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export interface VoucherActionsType {
  _id?: string;
  voucher?: string;
  discount?: number;
  author?: string;
  lastDate?: string;
}

export const voucherActions = {
  gets: createAsyncThunk("voucher/gets", async () => {
    try {
      const res = await voucherApi.gets();
      return res.data;
    } catch (error) {
      return false;
    }
  }),
  get: createAsyncThunk(
    "voucher/get",
    async (data: VoucherActionsType, thunkAPI) => {
      try {
        const res = await voucherApi.get(data);
        return res.data;
      } catch (error: any) {
        if (error.data) {
          thunkAPI.rejectWithValue(error.data``);
        }
        throw error;
      }
    }
  ),
  create: createAsyncThunk(
    "voucher/create",
    async (data: VoucherActionsType, thunkAPI) => {
      try {
        const res = await voucherApi.create(data);
        NotificationToast({ message: res.data, type: "success" });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: "Voucher created failure",
          type: "error",
        });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),
  update: createAsyncThunk(
    "voucher/update",
    async (data: VoucherActionsType, thunkAPI) => {
      try {
        const res = await voucherApi.update(data);
        NotificationToast({ message: res.data, type: "success" });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: "Voucher update failure",
          type: "error",
        });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),
  delete: createAsyncThunk(
    "voucher/delete",
    async (data: VoucherActionsType) => {
      try {
        const res = await voucherApi.delete(data);
        NotificationToast({ message: res.data, type: "success" });
        return true;
      } catch (error: any) {
        NotificationToast({ message: error.data, type: "error" });
        return false;
      }
    }
  ),
};
