import { createSlice } from "@reduxjs/toolkit";
import { DeliveryType } from "../../types/deliveryType";
import { deliveryActions } from "../../actions/deliveryActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialStateType {
  methods: Array<DeliveryType>;
  loading: boolean;
}

const initialState: InitialStateType = {
  methods: [],
  loading: false,
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deliveryActions.gets.fulfilled, (state, action) => {
        state.methods = action.payload;
      })
      .addCase(deliveryActions.create.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.methods.push(action.meta.arg);
      })
      .addCase(deliveryActions.delete.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.methods = state.methods.filter((m) => m._id !== action.meta.arg);
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

export default deliverySlice.reducer;
