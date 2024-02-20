import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  userProducts: [],
  product: {},
  success: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProductStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    createProductSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCategoryProductsStart: (state) => {
      state.loading = true;
      state.error = null;
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
    resetProductState: (state) => {
      state.error = null;
      state.success = false;
    }
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
  createProductStart,
  createProductSuccess,
  createProductFail,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
