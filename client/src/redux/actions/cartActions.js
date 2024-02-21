import axios from "axios";
import { BASE_URL } from "../../URL";
import { addCartItem, decCartQty, removeCartItem, resetCart } from "../slices/cartSlices";

// ADD ITEM TO CART
export const addToCart = (productId) => async (dispatch, getState) => {
  const { data } = await axios.get(`${BASE_URL}/products/${productId}/`);
  dispatch(addCartItem({...data, quantity: 1}));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE PRODUCT FROM CART
export const removefromcart = (id) => (dispatch, getState) => {
  dispatch(removeCartItem(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//DECREASE CART QUANTITY
export const decreaseCartQty = (id) => async (dispatch, getState) => {
  dispatch(decCartQty(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE ALL CART ITEMS
export const clearCart = () => (dispatch, getState) => {
  dispatch(resetCart());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
