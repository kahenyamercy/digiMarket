import {
  userLoginFail,
  userLoginStart,
  userLoginSuccess,
  userLogout,
  userRegisterFail,
  userRegisterStart,
  userRegisterSuccess,
} from "../slices/userSlices";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../URL";

export const registerUser = (formDetails) => async (dispatch) => {
  try {
    dispatch(userRegisterStart());

    const { data } = await axios.post(`${BASE_URL}/users/create/`, formDetails);

    console.log(data);

    dispatch(userRegisterSuccess());
  } catch (err) {
    console.log(err);
    dispatch(
      userRegisterFail(err.response ? err.response.data.message : err.message)
    );
  }
};

export const login = (formDetails) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(
      `${BASE_URL}/users/login/`,
      formDetails
    );

    const decodedInfo = jwtDecode(data.access_token);
    localStorage.setItem("token", JSON.stringify(data.access_token));
    dispatch(userLoginSuccess(decodedInfo));
  } catch (err) {
    console.log(err);
    dispatch(
      userLoginFail(err.response ? err.response.data.message : err.message)
    );
  }
};

export const logout = () => (dispatch) => {
  dispatch(userLogout());
  localStorage.removeItem("token");
};
