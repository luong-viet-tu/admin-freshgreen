import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import tagSlice from "./slices/tagSlice";
import newsSlice from "./slices/newsSlice";
import voucherSlice from "./slices/voucherSlice";
import productSlice from "./slices/productSlice";
import shopSlice from "./slices/shopSlice";
import orderSlice from "./slices/orderSlice";
import settingSlice from "./slices/settingSlice";
import notificationSlice from "./slices/notificationSlice";
import messageSlice from "./slices/messageSlice";
import unitSlice from "./slices/unitSlice";
import deliverySlice from "./slices/deliverySlice";
import roleSlice from "./slices/roleSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    category: categorySlice,
    tag: tagSlice,
    unit: unitSlice,
    news: newsSlice,
    voucher: voucherSlice,
    product: productSlice,
    shop: shopSlice,
    order: orderSlice,
    settings: settingSlice,
    notifications: notificationSlice,
    delivery: deliverySlice,
    messages: messageSlice,
    role: roleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
