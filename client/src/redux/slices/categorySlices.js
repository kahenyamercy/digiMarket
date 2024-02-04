import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categoryList: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
    },
    getCategoriesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
  },
});

export const {
    getCategoriesStart,
    getCategoriesSuccess,
    getCategoriesFail

} = categorySlice.actions;

export default categorySlice.reducer;
