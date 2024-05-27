import { createSlice } from "@reduxjs/toolkit";
import { authAction } from "../../actions/authActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface IntinialProps {
  isLoading: boolean;
  error: any;
}

const initialState: IntinialProps = {
  isLoading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authAction.login.rejected, (state, action) => {
        if (action.payload) state.error = action.payload;
        else state.error = action.error.message;
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

export default authSlice.reducer;
