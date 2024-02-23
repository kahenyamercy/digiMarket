import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        const newItem = { ...existItem, quantity: existItem?.quantity + 1 };
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? newItem : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    decCartQty: (state, action) => {
      const dec_productId = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === dec_productId);

      const newItem = {
        ...existingItem,
        quantity: existingItem?.quantity - 1,
      };
      state.cartItems = state.cartItems.map((x) =>
        x.id === dec_productId ? newItem : x
      );
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
    },
    resetCart: (state) => {
        state.cartItems = [];
    },
  },
});

export const {addCartItem, removeCartItem, decCartQty, resetCart} = cartSlice.actions;

export default cartSlice.reducer;
