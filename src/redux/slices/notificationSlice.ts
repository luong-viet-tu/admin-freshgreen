import { createSlice } from "@reduxjs/toolkit";
import { notificationsActions } from "../../actions/notificationsActions";
import { NotificationType } from "../../types/notificationType";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialProps {
  notifications: Array<NotificationType>;
  loading: boolean;
}

const initialState: InitialProps = {
  notifications: [],
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(notificationsActions.gets.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(notificationsActions.create.fulfilled, (state, action) => {
        state.notifications.push(action.payload);
      })
      .addCase(notificationsActions.update.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.notifications.findIndex(
            (notification) => notification._id === action.meta.arg.id
          );
          state.notifications[index] = {
            ...state.notifications[index],
            status: action.meta.arg.status,
          };
        }
      })
      .addCase(notificationsActions.delete.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== action.meta.arg
        );
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default notificationSlice.reducer;
