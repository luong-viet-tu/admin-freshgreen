import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { roleApi } from "../utils/api/roleApi";

export interface RoleActionsType {
  _id?: string;
  name?: string;
  roles: string[];
  createdAt?: string;
}

export const roleActions = {
  gets: createAsyncThunk("role/gets", async () => {
    try {
      const res = await roleApi.gets();
      return res.data;
    } catch (error) {
      NotificationToast({
        message: "opps..., something wrong...",
        type: "error",
      });

      throw error;
    }
  }),
  get: createAsyncThunk("role/get", async (data: RoleActionsType) => {
    try {
      const res = await roleApi.get(data);
      return res.data;
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk(
    "role/create",
    async (data: RoleActionsType, thunkAPI) => {
      try {
        const res = await roleApi.create(data);
        NotificationToast({
          message: "Role created successfully",
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
  update: createAsyncThunk(
    "role/update",
    async (data: RoleActionsType, thunkAPI) => {
      try {
        const res = await roleApi.update(data);

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
  delete: createAsyncThunk("role/delete", async (data: RoleActionsType) => {
    try {
      const res = await roleApi.delete(data);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error: any) {
      NotificationToast({ message: error.data, type: "error" });
      return true;
    }
  }),
};
