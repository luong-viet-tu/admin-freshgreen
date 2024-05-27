import { createAsyncThunk } from "@reduxjs/toolkit";
import { tagApi } from "../utils/api/tagApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export interface TagActionsType {
  _id?: string;
  name?: string;
  createdAt?: string;
}

export const tagActions = {
  gets: createAsyncThunk("tag/gets", async () => {
    try {
      const res = await tagApi.gets();
      return res.data;
    } catch (error) {
      NotificationToast({
        message: "opps..., something wrong...",
        type: "error",
      });

      throw error;
    }
  }),
  get: createAsyncThunk("tag/get", async (data: TagActionsType) => {
    try {
      const res = await tagApi.get(data);
      return res.data;
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk(
    "tag/create",
    async (data: TagActionsType, thunkAPI) => {
      try {
        const res = await tagApi.create(data);
        NotificationToast({
          message: "Tag created successfully",
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
  delete: createAsyncThunk("tag/delete", async (data: TagActionsType) => {
    try {
      const res = await tagApi.delete(data);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      return true;
    }
  }),
};
