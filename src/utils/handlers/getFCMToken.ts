import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { notificationApi } from "../api/notificationApi";
import app from "../../firebaseConfig";
import { orderActions } from "../../actions/orderActions";
import { NotificationToast } from "./NotificationToast";

const messaging = getMessaging(app);
const key =
  "BBsV3PdyoP4Jvt-s07ZxhpgyoKA8Rtowqbgl8zXO3TmOG8yK9U_F5ZZ5BkoE1inv3tMzY0JXoJSwgbZGGUdZgyc";

export const requestForToken = (userId: string) => {
  return getToken(messaging, { vapidKey: key })
    .then((currentToken) => {
      if (currentToken) {
        notificationApi.pushToken({
          id: userId,
          token: currentToken,
          platform: "web",
        });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const requestPermissionNotification = (userId: string) => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      requestForToken(userId);
    }
  });
};

export const onListentingMessage = async (dispatch: any, userId: string) => {
  await onMessage(messaging, (payload) => {
    dispatch(orderActions.gets(userId));
    NotificationToast({
      type: "default",
      message: payload.notification?.body!,
    });
  });
};
