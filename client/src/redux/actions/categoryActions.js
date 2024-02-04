import axios from "axios";
import { getCategoriesFail, getCategoriesStart, getCategoriesSuccess } from "../slices/categorySlices"
import { BASE_URL } from "../../URL";

export const listCategories = () => async (dispatch) => {
    dispatch(getCategoriesStart())
    try{

    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiV2FtYWUgTmRpcml0dSIsImVtYWlsIjoid2FtYWVAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMDc0NjIxNTg3OSIsInVzZXJuYW1lIjoid2FtYWUiLCJhZGRyZXNzX2lkIjoxLCJleHAiOjE3MDcwODkwMjF9.UnJ8X8QV1bVjqyA3AEK_V06s7zxGM9d1CPdSt4PRu2I",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/categories/`, config);

    dispatch(getCategoriesSuccess(data))

    }catch(err){
        console.log(err);
        dispatch(getCategoriesFail(err.response ? err.response.data.message : err.message))
    }
}