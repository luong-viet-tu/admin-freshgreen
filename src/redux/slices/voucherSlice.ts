import { createSlice } from "@reduxjs/toolkit";
import { voucherActions } from "../../actions/voucherActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { VoucherType, initialVoucher } from "../../types/voucherType";

interface InitialStateProps {
  vouchers: Array<VoucherType>;
  voucher: VoucherType;
  loading: boolean;
}

const initialState: InitialStateProps = {
  vouchers: [],
  voucher: initialVoucher,
  loading: false,
};

export const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(voucherActions.gets.fulfilled, (state, action) => {
        state.vouchers = action.payload;
      })
      .addCase(voucherActions.get.fulfilled, (state, action) => {
        state.voucher = action.payload;
      })
      .addCase(voucherActions.update.fulfilled, (state, action) => {
        // eslint-disable-next-line array-callback-return
        state.vouchers.find((voucher, index) => {
          if (voucher._id === action.payload._id) {
            state.vouchers[index] = action.payload;
          }
        });
      })
      .addCase(voucherActions.delete.fulfilled, (state, action) => {
        const index = state.vouchers.findIndex(
          (voucher) => voucher._id === action.meta.arg._id
        );
        state.vouchers.splice(index, 1);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = false;
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

export default voucherSlice.reducer;
