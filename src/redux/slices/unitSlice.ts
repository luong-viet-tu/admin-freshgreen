import { createSlice } from "@reduxjs/toolkit";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { unitActions } from "../../actions/unitActions";
import { UnitType, initialUnit } from "../../types/unitType";

interface IntitialProps {
  units: UnitType[];
  unit: UnitType;
  isLoading: boolean;
}

const initialState: IntitialProps = {
  units: [],
  unit: initialUnit,
  isLoading: true,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(unitActions.gets.fulfilled, (state, action) => {
        state.units = action.payload;
      })
      .addCase(unitActions.get.fulfilled, (state, action) => {
        state.units = action.payload;
      })
      .addCase(unitActions.create.fulfilled, (state, action) => {
        state.units.push(action.payload);
      })
      .addCase(unitActions.delete.fulfilled, (state, action) => {
        const index = state.units.findIndex(
          (unit) => unit._id === action.meta.arg._id
        );
        state.units.splice(index, 1);
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
