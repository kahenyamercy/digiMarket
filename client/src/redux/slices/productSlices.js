import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getCategoryProductsStart: (state) => {
      state.loading = true;
    },
    getCategoryProductsSuccess: (state, action) => {
      state.loading = false;
      state.products= action.payload;
    },
    getCategoryProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {getCategoryProductsStart, getCategoryProductsSuccess, getCategoryProductsFail } =
  productSlice.actions;

export default productSlice.reducer;
