import { createSlice } from "@reduxjs/toolkit";
import { orderActions } from "../../actions/orderActions";
import { OrderItemType, OrderType } from "../../types/orderType";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";
import { UserType } from "../../types/userType";

interface DataProps {
  user: UserType;
  orders: OrderItemType[];
}

interface InitialProps {
  data: OrderType[];
  loading: boolean;
}
const initialState: InitialProps = {
  data: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderActions.gets.fulfilled, (state, action) => {
        const orders = action.payload.flatMap((data: DataProps) =>
          data.orders.map((order: OrderItemType) => ({
            order,
            user: data.user,
          }))
        );

        state.data = orders;
      })
      .addCase(orderActions.submitStatusOrder.fulfilled, (state, action) => {
        if (action.payload.status) {
          const index = state.data.findIndex(
            (value) => value.order._id === action.payload.orderId
          );

          if (index !== -1) {
            state.data[index].order.status = action.payload.status;
          }

          if (action.payload.message) {
            state.data[index].order.message = action.payload.message;
          }
        }
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

export default orderSlice.reducer;
