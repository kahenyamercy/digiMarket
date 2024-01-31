import {
  userLoginFail,
  userLoginStart,
  userLoginSuccess,
  userRegisterFail,
  userRegisterStart,
  userRegisterSuccess,
} from "../slices/userSlices";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const registerUser = (formDetails) => async (dispatch) => {
  try {
    dispatch(userRegisterStart());

    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/v1/users/create/",
      formDetails
    );

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
      "http://127.0.0.1:5000/api/v1/users/login/",
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
