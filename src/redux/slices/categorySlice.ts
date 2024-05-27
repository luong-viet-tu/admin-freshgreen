import { createSlice } from "@reduxjs/toolkit";
import { CategoryType, initialCategory } from "../../types/categoryType";
import { categoryActions } from "../../actions/categoryActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialProps {
  categories: CategoryType[];
  category: CategoryType;
  loading: boolean;
}

const initialState: InitialProps = {
  categories: [],
  category: initialCategory,
  loading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryActions.gets.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoryActions.get.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(categoryActions.create.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(categoryActions.update.fulfilled, (state, action) => {
        state.categories.find((category, index) => {
          if (category._id === action.payload._id) {
            state.categories[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(categoryActions.delete.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category._id === action.meta.arg._id
        );
        state.categories.splice(index, 1);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default categorySlice.reducer;
