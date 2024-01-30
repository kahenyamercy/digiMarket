import {
  userRegisterFail,
  userRegisterStart,
  userRegisterSuccess,
} from "../slices/userSlices";
import axios from "axios";

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
