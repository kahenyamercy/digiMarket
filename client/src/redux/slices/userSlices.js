import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

function getUser() {
  const access_token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  if (access_token) {
    const decodedInfo = jwtDecode(access_token);
    return { ...decodedInfo, token: access_token};
  }
  return null;
}

const initialState = {
  loading: false,
  userInfo: getUser(),
  userAddress: null,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLoginStart: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
    getUserAddress: (state, action) => {
      state.userAddress = action.payload;
    }
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFail,
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFail,
  userLogout,
  getUserAddress,
} = userSlice.actions;

export default userSlice.reducer;
