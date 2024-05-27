import { SettingActionsProp } from "../../actions/settingActions";
import axiosClient from "./axiosClient";

export interface EmailPortType {
  email: string;
  password: string;
}

export const settingApi = {
  update: (data: SettingActionsProp) =>
    axiosClient.put(`/settings/${data._id}/update/${data.adminID}`, {
      images: data.images,
    }),

  get: (id: string) => axiosClient.get(`/settings/get/${id}`),

  mailPort: (data: EmailPortType) =>
    axiosClient.post("/settings/mailport", data),

  tokenGPT: (token: string) =>
    axiosClient.post("/settings/token-gpt", { token }),
};
