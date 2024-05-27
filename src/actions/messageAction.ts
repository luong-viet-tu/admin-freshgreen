import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageApi } from "../utils/api/messageApi";
import { socket } from "../utils/socketConfirm";
import { SendType } from "../types/messageType";

export const messageActions = {
  ask: createAsyncThunk<any, { message: string; userId: string }>(
    "message/ask-ai",
    async ({ message, userId }) => {
      try {
        const res = await messageApi.ask({ message, userId });
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
  send: createAsyncThunk("message/send", async (data: SendType) => {
    try {
      const res = await messageApi.send(data);
      socket.emit("send-message", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  get: createAsyncThunk(
    "message/get",
    async (data: { from: string; to: string }) => {
      try {
        const res = await messageApi.get(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
  gets: createAsyncThunk("message/gets", async (id: string) => {
    try {
      const res = await messageApi.gets(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
