import { createSlice } from "@reduxjs/toolkit";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { roleActions } from "../../actions/roleActions";
import { RoleType, initialRole } from "../../types/roleType";

interface IntitialProps {
  roles: RoleType[];
  role: RoleType;
  isLoading: boolean;
}

const initialState: IntitialProps = {
  roles: [],
  role: initialRole,
  isLoading: true,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roleActions.gets.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(roleActions.get.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(roleActions.create.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(roleActions.update.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (role) => role._id === action.meta.arg._id
        );
        state.roles[index] = action.payload;
      })
      .addCase(roleActions.delete.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (role) => role._id === action.meta.arg._id
        );
        state.roles.splice(index, 1);
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

export default tagSlice.reducer;
