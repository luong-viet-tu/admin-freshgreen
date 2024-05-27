import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailPortType, settingApi } from "../utils/api/settingApi";

export interface SettingActionsProp {
  _id: string;
  images: Array<string>;
  adminID: string;
}

export const settingsActions = {
  getSetting: createAsyncThunk("/settings/get", async (adminId: string) => {
    try {
      const res = await settingApi.get(adminId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  updateSetting: createAsyncThunk(
    "/settings/update",
    async (data: SettingActionsProp) => {
      try {
        const res = await settingApi.update(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  emailPortAction: createAsyncThunk(
    "settings/email-port",
    async (data: EmailPortType) => {
      try {
        const res = await settingApi.mailPort(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  tokenGPT: createAsyncThunk("settings/tokenGPT", async (token: string) => {
    try {
      const res = await settingApi.tokenGPT(token);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
