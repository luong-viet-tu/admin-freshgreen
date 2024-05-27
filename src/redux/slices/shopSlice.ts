import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialShop, ShopType } from "../../types/shopType";
import { shopActions } from "../../actions/shopActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialStateProps {
  shop: ShopType;
  shops: ShopType[];
  modal: {
    open: boolean;
    data?: ShopType;
  };
  loading: boolean;
}

const initialState: InitialStateProps = {
  shop: InitialShop,
  shops: [],
  modal: {
    open: false,
    data: undefined,
  },
  loading: false,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopModal: (
      state,
      action: PayloadAction<{ open: boolean; data?: ShopType }>
    ) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shopActions.gets.fulfilled, (state, action) => {
        state.shops = action.payload;
      })
      .addCase(shopActions.get.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(shopActions.create.fulfilled, (state, action) => {
        state.shops.push(action.payload);
      })
      .addCase(shopActions.update.fulfilled, (state, action) => {
        state.shops.find((shop, index) => {
          if (shop._id === action.payload._id) {
            state.shops[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(shopActions.delete.fulfilled, (state, action) => {
        const index = state.shops.findIndex(
          (shop) => shop._id === action.meta.arg
        );
        state.shops.splice(index, 1);
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

export const { setShopModal } = shopSlice.actions;

export default shopSlice.reducer;
