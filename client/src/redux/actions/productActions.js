import axios from "axios";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";
import { getCategoryProductsFail, getCategoryProductsStart, getCategoryProductsSuccess, getProductInfoFail, getProductInfoStart, getProductInfoSuccess, getUserProductsFail, getUserProductsStart, getUserProductsSuccess } from "../slices/productSlices";

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

// USER PRODUCTS
export const listUserProducts =
  () => async (dispatch, getState) => {
    dispatch(getUserProductsStart());
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/users/${userInfo.id}/products/`, config);

      dispatch(getUserProductsSuccess(data));
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      dispatch(getUserProductsFail(errorMessage));

      if (errorMessage === "Token has expired") {
        dispatch(logout());
      }
    }
  };

// GET SINGLE PRODUCT
export const getProduct =
  (product_id) => async (dispatch, getState) => {
    dispatch(getProductInfoStart());
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/products/${product_id}/`, config);

      dispatch(getProductInfoSuccess(data));
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      dispatch(getProductInfoFail(errorMessage));

      if (errorMessage === "Token has expired") {
        dispatch(logout());
      }
    }
  };
