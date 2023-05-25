import axios from "axios";
import { base_url } from "../../utilities/base_url";
import { config } from '../../utilities/axios_config';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}product-cat/`, config);

  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}product-cat/`, category, config);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}product-cat/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}product-cat/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default pCategoryService;
