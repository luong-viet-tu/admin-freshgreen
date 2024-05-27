import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { unitApi } from "../utils/api/unitApi";

export interface UnitActionsType {
  _id?: string;
  name?: string;
  createdAt?: string;
}

export const unitActions = {
  gets: createAsyncThunk("unit/gets", async () => {
    try {
      const res = await unitApi.gets();
      return res.data;
    } catch (error) {
      NotificationToast({
        message: "opps..., something wrong...",
        type: "error",
      });

      throw error;
    }
  }),
  get: createAsyncThunk("unit/get", async (data: UnitActionsType) => {
    try {
      const res = await unitApi.get(data);
      return res.data;
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk(
    "unit/create",
    async (data: UnitActionsType, thunkAPI) => {
      try {
        const res = await unitApi.create(data);
        NotificationToast({
          message: "unit created successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: error.data,
          type: "error",
        });
        throw error;
      }
    }
  ),
  delete: createAsyncThunk("unit/delete", async (data: UnitActionsType) => {
    try {
      const res = await unitApi.delete(data);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      return true;
    }
  }),
};
