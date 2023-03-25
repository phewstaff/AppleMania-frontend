import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/dataTypes";

interface IState {
  products: IProduct[];
}

const initialState: IState = {
  products: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    removeFromBasket: (state, action: PayloadAction<string | undefined>) => {
      state.products = state.products.filter((p) => {
        return p._id !== action.payload && p.quantity !== 0;
      });
    },
    addToBasket: (state, action: PayloadAction<IProduct>) => {
      const { _id: productExists } = action.payload;
      if (!state.products.find((p) => p._id === productExists)) {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    increaseProductQuantity: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      const productIndex = state.products.findIndex(
        (p) => p._id === action.payload
      );
      if (productIndex !== -1) {
        state.products[productIndex].quantity++;
      }
    },
    decreaseProductQuantity: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      const productIndex = state.products.findIndex(
        (p) => p._id === action.payload
      );
      if (productIndex !== -1 && state.products[productIndex].quantity >= 1) {
        state.products[productIndex].quantity--;
      }
    },
    removeProductFromBasket: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      const productIndex = state.products.findIndex(
        (p) => p._id === action.payload
      );
      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
    },
  },
});

export {};
