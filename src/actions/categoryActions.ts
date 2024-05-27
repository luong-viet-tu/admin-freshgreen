import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../utils/api/categoryApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { CategoryType } from "../types/categoryType";

export const categoryActions = {
  gets: createAsyncThunk("category/ges", async () => {
    try {
      const res = await categoryApi.gets();
      return res.data;
    } catch (err: any) {
      NotificationToast({ message: err?.data, type: "error" });
      throw err;
    }
  }),

  get: createAsyncThunk("category/get", async (category: CategoryType) => {
    try {
      const res = await categoryApi.get(category);
      return res.data;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      throw error;
    }
  }),

  create: createAsyncThunk(
    "category/create",
    async (data: CategoryType, thunkAPI) => {
      try {
        const res = await categoryApi.create(data);
        NotificationToast({ message: "Created successfully", type: "success" });
        return res.data;
      } catch (error: any) {
        NotificationToast({ message: error?.data, type: "error" });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  update: createAsyncThunk(
    "category/update",
    async (category: CategoryType, thunkAPI) => {
      try {
        const res = await categoryApi.update(category);
        NotificationToast({
          message: "Category updated successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: "Category updated failure",
          type: "error",
        });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  delete: createAsyncThunk("category/delete", async (data: CategoryType) => {
    try {
      await categoryApi.delete(data);
      NotificationToast({
        message: "Category deleted successfully",
        type: "success",
      });
      return true;
    } catch (error: any) {
      NotificationToast({
        message: "Category deleted failure",
        type: "error",
      });
      throw error;
    }
  }),
};
