import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userActions } from "../../actions/userActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { InitialUser, UserType } from "../../types/userType";

export interface UserStateProps {
  users: UserType[];
  user: UserType;
  isLoading: boolean;
  error: boolean;
  errMsg: string;
  userViewData: UserType;
}

const initialState: UserStateProps = {
  users: [],
  user: InitialUser,
  isLoading: false,
  error: false,
  errMsg: "",
  userViewData: InitialUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    userChangeAvatar: (
      state,
      action: PayloadAction<{ _id: string; avatar: string }>
    ) => {
      if (state.user) {
        state.user.avatar = action.payload?.avatar;
      }
    },
    deleteUser: (
      state,
      action: PayloadAction<{ _id: string | null | undefined }>
    ) => {
      state.users.filter((user) => !(user._id === action.payload._id));
    },
    setViewUserData: (state, action: PayloadAction<UserType>) => {
      state.userViewData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userActions.getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(userActions.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.userUpdate.fulfilled, (state, action) => {
        if (state.user._id === action.payload._id) state.user = action.payload;
        state.userViewData = action.payload;
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { setUserReducer, userChangeAvatar, deleteUser, setViewUserData } =
  userSlice.actions;
export default userSlice.reducer;
