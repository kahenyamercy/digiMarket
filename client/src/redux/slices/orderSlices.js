import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  orders: [],
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
  },
});

export const {
    getUserOrdersStart,
    getUserOrdersSuccess,
    getUserOrdersFail

} = orderSlice.actions;

export default orderSlice.reducer;
