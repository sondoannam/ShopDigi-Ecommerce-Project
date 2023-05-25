import axios from "axios";
import { base_url } from "../../utilities/base_url";
import { config } from '../../utilities/axios_config';

const getCategories = async () => {
  const response = await axios.get(`${base_url}blog-cat/`, config);

  return response.data;
};

const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blog-cat/`, bcat, config);

  return response.data;
};
const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blog-cat/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blog-cat/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blog-cat/${id}`, config);

  return response.data;
};

const bcategoryService = {
  getCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default bcategoryService;
