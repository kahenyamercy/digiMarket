import axios from "axios";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";
import { createOrderFail, createOrderStart, createOrderSuccess, getOrderDetailsFail, getOrderDetailsStart, getOrderDetailsSuccess, getUserOrdersFail, getUserOrdersStart, getUserOrdersSuccess } from "../slices/orderSlices";
import { resetCart } from "../slices/cartSlices";

// GET USER ORDERS
export const listUserOrders = () => async (dispatch, getState) => {
  dispatch(getUserOrdersStart());
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/users/${userInfo.id}/orders`, config);

    dispatch(getUserOrdersSuccess(data));
  } catch (err) {
    const errorMessage = err.response ? err.response.data.message : err.message;
    dispatch(getUserOrdersFail(errorMessage));

    if (errorMessage === "Token has expired") {
      dispatch(logout());
    }
  }
};

//  CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createOrderStart());

     const {
       user: { userInfo },
     } = getState();
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
       },
     };

    await axios.post(`${BASE_URL}/orders/create`, order, config);

    dispatch(createOrderSuccess());
    dispatch(resetCart());
  } catch (err) {
    const errorMessage = err.response ? err.response.data.message : err.message;
    dispatch(
      createOrderFail(err.response ? err.response.data.message : err.message)
    );
    if (errorMessage === "Token has expired") {
      dispatch(logout());
    }
  }
};

// GET SINGLE ORDERS
export const getOrderDetails = () => async (dispatch, getState) => {
  dispatch(getOrderDetailsStart());
  try {
    const {
      user: { userInfo },
      order: {orderOpened},
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/orders/${orderOpened}/`, config);

    dispatch(getOrderDetailsSuccess(data));
  } catch (err) {
    const errorMessage = err.response ? err.response.data.message : err.message;
    dispatch(getOrderDetailsFail(errorMessage));

    if (errorMessage === "Token has expired") {
      dispatch(logout());
    }
  }
};

