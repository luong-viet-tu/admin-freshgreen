import { SendType } from "../../types/messageType";
import axiosClient from "./axiosClient";

export const messageApi = {
  ask: ({ userId, message }: { userId: string; message: string }) =>
    axiosClient.post(`/messages/${userId}/ask-ai`, { message }),
  send: (data: SendType) => axiosClient.post("/messages/send", data),
  get: ({ from, to }: { from: string; to: string }) =>
    axiosClient.get(`/messages/get/${from}/${to}`),
  gets: (id: string) => axiosClient.get(`/messages/gets/${id}`),
};
