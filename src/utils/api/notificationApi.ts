import { NotificationType } from "../../types/notificationType";
import axiosClient from "./axiosClient";

export const notificationApi = {
  gets: () => axiosClient.get("/notifications"),
  create: (data: NotificationType) =>
    axiosClient.post("/notifications/create", data),
  update: (notificationId: string, status: boolean) =>
    axiosClient.put(`/notifications/${notificationId}`, { status }),
  delete: (notificationId: string) =>
    axiosClient.patch(`/notifications/${notificationId}`),

  pushToken: ({
    token,
    id,
    platform = "web",
  }: {
    token: string;
    id: string;
    platform?: string;
  }) => axiosClient.put("/notifications/token/push", { token, id, platform }),
};
