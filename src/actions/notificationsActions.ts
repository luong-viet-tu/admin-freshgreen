import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationApi } from "../utils/api/notificationApi";
import { NotificationType } from "../types/notificationType";

export const notificationsActions = {
  gets: createAsyncThunk("notification/gets", async () => {
    try {
      const res = await notificationApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  create: createAsyncThunk(
    "notification/create",
    async (data: NotificationType) => {
      try {
        const res = await notificationApi.create(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
  update: createAsyncThunk(
    "notification/update",
    async ({ id, status }: { id: string; status: boolean }) => {
      try {
        const res = await notificationApi.update(id, status);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
  delete: createAsyncThunk(
    "notification/delete",
    async (notificationId: string) => {
      try {
        const res = await notificationApi.delete(notificationId);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
};
