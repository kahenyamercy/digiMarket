import axios from "axios";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";
import { getUserOrdersFail, getUserOrdersStart, getUserOrdersSuccess } from "../slices/orderSlices";

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

