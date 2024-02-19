import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  orderDetails: {},
  success_create: false,
  isOrderModalOpen: false,
  orderOpened: null,
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
    getOrderDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    },
    getOrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
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
    clearState: (state) => {
      state.error = null;
      state.success_create = false;
    },
    openOrderModal: (state, action) => {
      state.isOrderModalOpen = true;
      state.orderOpened = action.payload;
    },
    closeOrderModal: (state) => {
      state.isOrderModalOpen = false;
      state.orderOpened = null;
    },
  },
});

export const {
  getUserOrdersStart,
  getUserOrdersSuccess,
  getUserOrdersFail,
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  clearState,
  openOrderModal,
  closeOrderModal,
  getOrderDetailsStart,
  getOrderDetailsSuccess,
  getOrderDetailsFail,
} = orderSlice.actions;

export default orderSlice.reducer;
