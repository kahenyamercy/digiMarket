import axios from "axios";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";
import { getCategoryProductsFail, getCategoryProductsStart, getCategoryProductsSuccess } from "../slices/productSlices";

export const listCategoryProducts = (category_id) => async (dispatch, getState) => {
  dispatch(getCategoryProductsStart());
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/products/category/${category_id}/`,
      config
    );

    dispatch(getCategoryProductsSuccess(data));
  } catch (err) {
    const errorMessage = err.response ? err.response.data.message : err.message;
    dispatch(getCategoryProductsFail(errorMessage));

    if (errorMessage === "Token has expired") {
      dispatch(logout());
    }
  }
};
