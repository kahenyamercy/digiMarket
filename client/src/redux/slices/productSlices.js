import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  userProducts: [],
  product: {},
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
      state.products = action.payload;
    },
    getCategoryProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserProductsSuccess: (state, action) => {
      state.loading = false;
      state.userProducts = action.payload;
    },
    getUserProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProductInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductInfoSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductInfoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCategoryProductsStart,
  getCategoryProductsSuccess,
  getCategoryProductsFail,
  getUserProductsStart,
  getUserProductsSuccess,
  getUserProductsFail,
  getProductInfoStart,
  getProductInfoSuccess,
  getProductInfoFail,
} = productSlice.actions;

export default productSlice.reducer;
