import axios from "axios";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";
import { createProductFail, createProductStart, createProductSuccess, getCategoryProductsFail, getCategoryProductsStart, getCategoryProductsSuccess, getProductInfoFail, getProductInfoStart, getProductInfoSuccess, getUserProductsFail, getUserProductsStart, getUserProductsSuccess } from "../slices/productSlices";

export const listCategoryProducts = (category_id) => async (dispatch) => {
  dispatch(getCategoryProductsStart());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
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
        user: {userInfo}
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`
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
  (product_id) => async (dispatch) => {
    dispatch(getProductInfoStart());
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
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

  export const createProduct = (productData) => async (dispatch, getState) => {
    dispatch(createProductStart());
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/products/create/`,
        productData,
        config
      );

      dispatch(createProductSuccess(data));
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      dispatch(createProductFail(errorMessage));

      if (errorMessage === "Token has expired") {
        dispatch(logout());
      }
    }
  };
