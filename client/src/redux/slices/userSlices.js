import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  access_token: null,
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
      state.access_token = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFail,
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFail,
} = userSlice.actions;

export default userSlice.reducer;
