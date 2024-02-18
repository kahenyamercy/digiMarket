import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  success_create: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getUserOrdersStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getUserOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getUserOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_create = false;
    },
    createOrderSuccess: (state) => {
      state.loading = false;
      state.success_create = true;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    getUserOrdersStart,
    getUserOrdersSuccess,
    getUserOrdersFail,
    createOrderStart,
    createOrderSuccess,
    createOrderFail

} = orderSlice.actions;

export default orderSlice.reducer;
