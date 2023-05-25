import axios from 'axios';
import { config } from '../../utilities/axios_config';
import { base_url } from '../../utilities/base_url';

const login = async (user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/all-orders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/get-order/${id}`,
    config
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order/${data.id}`, {status: data.status},
    config
  );

  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/get-month-wise-order-income`,
    config
  );

  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(
    `${base_url}user/get-year-total-order`,
    config
  );

  return response.data;
};

const authServices = {
    login,
    getOrders,
    getOrder,
    updateOrder,
    getMonthlyOrders,
    getYearlyStats,
};

export default authServices;