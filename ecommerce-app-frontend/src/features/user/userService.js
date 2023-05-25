import axios from "axios";
import { config } from "../../utilities/axios_config";
import { base_url } from "../../utilities/base_url";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);

  if (response.data) {
    return response.data;
  }
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);

  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);

  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);

  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async (cartDetails) => {
  const response = await axios.patch(`${base_url}user/update-product-cart/${cartDetails.cartItemId}/${cartDetails.quantity}`, {quantity: cartDetails.quantity} ,config);
  console.log(response.data);

  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(`${base_url}user/remove-product-cart/${cartItemId}`, config);

  if (response.data) {
    return response.data;
  }
};

const selectProductToCheckout = async (cartDetails) => {
  const response = await axios.patch(`${base_url}user/select-product-cart/${cartDetails.cartItemId}/${cartDetails.checked}`, {checked: cartDetails.checked}, config);

  if (response.data) {
    return response.data;
  }
}

const createOrder = async (data) => {
  const response = await axios.post(`${base_url}user/cart/create-order`, data, config);

  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/get-my-orders`, config);

  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}user/edit`, data, config);

  if (response.data) {
    return response.data; 
  }
};

const forgotPasswordToken = async (email) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, email);
  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data?.token}`, {password: data?.password});
  if (response.data) {
    return response.data;
  }
};

const getUser = async (id) => {
  const response = await axios.get(`${base_url}user/${id}`);
  if (response.data) {
    return response.data;
  }
};

const userService = {
  register,
  login,
  getUserWishlist, 
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  selectProductToCheckout,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPasswordToken,
  resetPassword,
  getUser,
};

export default userService;
