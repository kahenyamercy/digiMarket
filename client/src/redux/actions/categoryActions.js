import axios from "axios";
import {
  getCategoriesFail,
  getCategoriesStart,
  getCategoriesSuccess,
} from "../slices/categorySlices";
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";

export const listCategories = () => async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/categories/`, config);

    dispatch(getCategoriesSuccess(data));
  } catch (err) {
    const errorMessage = err.response ? err.response.data.message : err.message;
    dispatch(getCategoriesFail(errorMessage));

    if (errorMessage === "Token has expired") {
      dispatch(logout());
    }
  }
};
