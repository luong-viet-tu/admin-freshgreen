import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialProduct, ProductType } from "../../types/productType";
import { productActions } from "../../actions/productActions";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../../types/silceType";

interface InitialStateProps {
  products: Array<ProductType>;
  product: ProductType;
  totalProducts: number;
  loading: boolean;
  modal: {
    data?: ProductType;
    open: boolean;
  };
}

const initialState: InitialStateProps = {
  products: [],
  product: InitialProduct,
  totalProducts: 0,
  loading: false,
  modal: {
    data: undefined,
    open: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductModal: (
      state,
      action: PayloadAction<{ open: boolean; data?: ProductType }>
    ) => {
      state.modal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productActions.gets.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(productActions.get.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(productActions.create.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(productActions.update.fulfilled, (state, action) => {
        state.products.find((product, index) => {
          if (product._id === action.payload._id) {
            state.products[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(productActions.delete.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.meta.arg
        );
        state.products.splice(index, 1);
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

export const { setProductModal } = productSlice.actions;
export default productSlice.reducer;
