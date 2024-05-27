import { createSlice } from "@reduxjs/toolkit";
import { TagType, initialTag } from "../../types/tagType";
import { tagActions } from "../../actions/tagActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface IntitialProps {
  tags: TagType[];
  tag: TagType;
  isLoading: boolean;
}

const initialState: IntitialProps = {
  tags: [],
  tag: initialTag,
  isLoading: true,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tagActions.gets.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(tagActions.get.fulfilled, (state, action) => {
        state.tag = action.payload;
      })
      .addCase(tagActions.create.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      .addCase(tagActions.delete.fulfilled, (state, action) => {
        const index = state.tags.findIndex(
          (tag) => tag._id === action.meta.arg._id
        );
        state.tags.splice(index, 1);
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
