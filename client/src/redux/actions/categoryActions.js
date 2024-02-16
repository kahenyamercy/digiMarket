import axios from "axios";
import { getCategoriesFail, getCategoriesStart, getCategoriesSuccess } from "../slices/categorySlices"
import { BASE_URL } from "../../URL";
import { logout } from "./userActions";

export const listCategories = () => async (dispatch,  getState) => {
    dispatch(getCategoriesStart())
    try{
    const {user: {userInfo}}  = getState();
    const config = {
      headers: {
        Authorization:
          `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/categories/`, config);

    dispatch(getCategoriesSuccess(data))

    }catch(err){
        const errorMessage = err.response ? err.response.data.message : err.message;
        dispatch(getCategoriesFail(errorMessage))
        
        if (errorMessage === 'Token has expired' ){
          dispatch(logout());
        }
      }
}