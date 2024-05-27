import { getMessaging, onMessage } from "firebase/messaging";
import { socket } from "../socketConfirm";
import { NotificationToast } from "./NotificationToast";

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

export const notificationOrder = () => {
  socket.on("new-order", () => {
    NotificationToast({ message: "Bạn có 1 đơn hàng mới", type: "default" });
  });
  socket.on("access-order", () => {
    NotificationToast({
      message: "Có một đợn hàng đã được giao thành công",
      type: "default",
    });
  });
  socket.on("refuse-order", () => {
    NotificationToast({
      message: "Có một đợn hàng đã bị từ chối",
      type: "default",
    });
  });
};
