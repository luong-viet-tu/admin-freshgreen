import { createAsyncThunk } from "@reduxjs/toolkit";
import { shopAPI } from "../utils/api/shopApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { ShopType } from "../types/shopType";

export const shopActions = {
  gets: createAsyncThunk("shop/gets", async () => {
    try {
      const shops = await shopAPI.gets();
      return shops.data;
    } catch (error) {
      NotificationToast({ message: "Get shops failure", type: "success" });
      throw error;
    }
  }),
  get: createAsyncThunk("shop/get", async (id: string) => {
    try {
      const shops = await shopAPI.get(id);
      return shops.data;
    } catch (error: any) {
      if (error.data) NotificationToast({ message: error.data, type: "error" });
      NotificationToast({ message: "Get shops failure", type: "error" });
      throw error;
    }
  }),
  create: createAsyncThunk(
    "shop/create",
    async (newShop: ShopType, thunkAPI) => {
      try {
        const shops = await shopAPI.create(newShop);
        NotificationToast({
          message: "Shop created successully",
          type: "success",
        });
        return shops.data;
      } catch (error: any) {
        if (error.data) {
          NotificationToast({ message: error.data, type: "error" });
          return thunkAPI.rejectWithValue(error.data);
        }
        throw error;
      }
    }
  ),
  update: createAsyncThunk(
    "shop/update",
    async (newShop: ShopType, thunkAPI) => {
      try {
        const shops = await shopAPI.update(newShop);
        NotificationToast({
          message: "Shop updated successully",
          type: "success",
        });
        return shops.data;
      } catch (error: any) {
        if (error.data) {
          NotificationToast({ message: error.data, type: "error" });
          return thunkAPI.rejectWithValue(error.data);
        }
        throw error;
      }
    }
  ),
  delete: createAsyncThunk("shop/delete", async (id: string) => {
    try {
      const shops = await shopAPI.delete(id);
      NotificationToast({
        message: "Shop deleted successully",
        type: "success",
      });
      return shops.data;
    } catch (error: any) {
      if (error.data) {
        NotificationToast({ message: error.data, type: "error" });
      }
      NotificationToast({ message: "Shop deleted failure", type: "error" });
      throw error;
    }
  }),
};
