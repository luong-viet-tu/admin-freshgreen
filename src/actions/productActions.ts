import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../utils/api/productApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { NewProductType, ProductType } from "../types/productType";

export const productActions = {
  gets: createAsyncThunk("product/gets", async () => {
    try {
      const res = await productApi.gets();
      return res.data;
    } catch (error) {
      NotificationToast({ message: "Opps..wrong something...", type: "error" });
      throw error;
    }
  }),

  get: createAsyncThunk("product/get", async (product: ProductType) => {
    try {
      const res = await productApi.get(product);
      return res.data;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      throw error;
    }
  }),

  create: createAsyncThunk(
    "product/create",
    async (newProduct: NewProductType, thunkAPI) => {
      try {
        const res = await productApi.create(newProduct);
        NotificationToast({
          message: "Product created successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({
          message: "Product created failure",
          type: "error",
        });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  update: createAsyncThunk(
    "product/update",
    async (newProduct: NewProductType, thunkAPI) => {
      // console.log("newProduct",newProduct)

      try {
        const res = await productApi.update(newProduct);
        NotificationToast({
          message: "Product updated successfully",
          type: "success",
        });
        return res.data;
      } catch (error: any) {
        NotificationToast({ message: "Product update failure", type: "error" });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  delete: createAsyncThunk("product/delete", async (id: string) => {
    try {
      const res = await productApi.delete(id);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error) {
      NotificationToast({ message: "Product delete failure", type: "success" });
      throw error;
    }
  }),
};
